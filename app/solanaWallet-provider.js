"use client";
import React, { createContext, useContext, useState,useCallback ,useEffect} from "react";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider } from "@project-serum/anchor";
import bs58 from "bs58";
import BN from "bn.js";


import { 
    LAMPORTS_PER_SOL, 
    PublicKey, 
    SYSVAR_INSTRUCTIONS_PUBKEY,
    SYSVAR_CLOCK_PUBKEY,
    SystemProgram,
    Transaction,
    Ed25519Program,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  getAccount,
  getAssociatedTokenAddress,
  mintTo,
  getMint,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";



import { calculateRaise, formatIntNumber, formatTokenNumber, lamportsToSol, parseAmountToBN, parseSolToLamportsBN, roundUpToNextMillion, toPaddedSymbol } from "./client-components/services/utils";
import { getSolanaPriceSignature } from "./client-components/services/token-service";
import { isValidNumber } from "./client-components/services/wallet-service";

const AppSolanaContext = createContext(null);

const PDA_RECIPES = {
  state: () => [Buffer.from("state")],
  tokenInfo: ({ tokenSymbol }) => [toPaddedSymbol(tokenSymbol)],
  buyerInfoPda: ({ tokenSymbol, buyerPubkey }) => [
    Buffer.from("buyer___"),
    toPaddedSymbol(tokenSymbol),
    buyerPubkey.toBuffer(),
  ],
  buyerAta: ({ mint , buyerPubkey }) => [
    buyerPubkey.toBuffer(),
    TOKEN_PROGRAM_ID.toBuffer(),
    new PublicKey(mint).toBuffer(),
  ],
  vaultAta: ({ mint , vaultPubkey }) => [
    vaultPubkey.toBuffer(),
    TOKEN_PROGRAM_ID.toBuffer(),
    new PublicKey(mint).toBuffer(),
  ],
};


export const AppSolanaProvider = ({ globalConfigs, children }) => {
    const lastestUpdated = globalConfigs.lastestUpdated
    const lastestRaise  = globalConfigs.lastestRaise
    const dailyRaise = globalConfigs.dailyRaise


    const [currentRaise, setCurrentRaise] = useState(0);
    const [nextRaise, setNextRaise] = useState(0);


    const { publicKey, connected, disconnect, select, wallets } = useWallet();
    const anchorWallet =  useAnchorWallet();
    const { connection } = useConnection();

    const [walletDialogVisible, setWalletDialogVisible] = useState(false);
    const [connectedDialogVisible, setConnectedDialogVisible] = useState(false);

    const [program, setProgram] = useState(null);
    const [predefinedAccounts ,setPredefinedAccounts] = useState({})
    const [solanaPrice, setSolanaPrice] = useState(0)
    const [purchaseInfo, setPurchaseInfo] = useState( 
        {   totalBought: 0,
            stakedAmount: 0,
            stakeableAmount: 0
        });




    useEffect(() => {
        const { currentRaise, nextRaise } = calculateRaise(
            lastestUpdated,
            lastestRaise,
            dailyRaise
        );

        setCurrentRaise(currentRaise);
        setNextRaise(nextRaise);
    }, []);   

    useEffect(() => {
        if(globalConfigs.solana.salers.length > 0){

            let prog;
    
            if (connected ) {
                const provider = new AnchorProvider(connection, anchorWallet, { preflightCommitment: "processed" });
                prog = new Program(globalConfigs.solana.salers[0].idl, globalConfigs.solana.salers[0].programId, provider);
            } else {
                // Read-only program
                prog = new Program(globalConfigs.solana.salers[0].idl, globalConfigs.solana.salers[0].programId, { connection });
            }
    
            setProgram(prog);
        }
    }, [connected, connection]);


    useEffect(() => {
        const fetchDataSolana = async () => {
            try {
            const response = await fetch(globalConfigs.solana.USDT_Price); // Assuming 'data.json' is a local file
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
                setSolanaPrice(jsonData.price);
            } catch (error) {
            console.error('There was a problem fetching the data:', error);
            }
        };

        fetchDataSolana()
    }, []);

    useEffect(() => {
        const loadUserBalance = async (buyerInfoPda) => {
            const buyerBalance = await program.account.buyerInfo.fetch(buyerInfoPda);
            if(buyerBalance){
                setPurchaseInfo( {   
                    totalBought: lamportsToSol(buyerBalance.amount.toNumber()),
                    stakedAmount: lamportsToSol(buyerBalance.staked.toNumber()),
                    stakeableAmount: lamportsToSol(buyerBalance.amount.toNumber() - buyerBalance.staked.toNumber())
                })
            }
        }

        if(program?.programId && anchorWallet?.publicKey){
            const newResults = {}

            let seeds = PDA_RECIPES.tokenInfo({tokenSymbol: globalConfigs?.targetToken?.symbol});
            const [tokenInfoPda] = PublicKey.findProgramAddressSync(seeds, program?.programId);
            newResults.tokenInfo = tokenInfoPda

            seeds = PDA_RECIPES.state();
            const [statePda] = PublicKey.findProgramAddressSync(seeds, program?.programId);
            newResults.statePda = statePda

            seeds = PDA_RECIPES.buyerInfoPda({tokenSymbol: globalConfigs?.targetToken?.symbol, buyerPubkey: anchorWallet?.publicKey});
            const [buyerInfoPda] = PublicKey.findProgramAddressSync(seeds, program?.programId);
            newResults.buyerInfo = buyerInfoPda

            seeds = PDA_RECIPES.buyerAta({mint: globalConfigs?.solana?.USDT_Address, buyerPubkey: anchorWallet?.publicKey});
            const [buyerAta] = PublicKey.findProgramAddressSync(seeds, ASSOCIATED_TOKEN_PROGRAM_ID);
            newResults.buyerAta = buyerAta

            seeds = PDA_RECIPES.vaultAta({mint: globalConfigs?.solana?.USDT_Address, vaultPubkey: new PublicKey(globalConfigs?.solana?.vaultAddress)});
            const [vaultAta] = PublicKey.findProgramAddressSync(seeds, ASSOCIATED_TOKEN_PROGRAM_ID);
            newResults.vaultAta = vaultAta
            loadUserBalance(buyerInfoPda);
            // const newResults = Object.keys(PDA_RECIPES).map((type) => {
            //     const seeds = PDA_RECIPES[type](inputs);
            //     if (type.toLowerCase().includes("ata")) {
            //     const [pda, bump] = PublicKey.findProgramAddressSync(
            //         seeds,
            //         ASSOCIATED_TOKEN_PROGRAM_ID
            //     );
            //     return { type, pda: pda.toBase58(), bump };
            //     }
            //     const [pda, bump] = PublicKey.findProgramAddressSync(seeds, programKey);
            //     return { type, pda: pda.toBase58(), bump };
            // });

            setPredefinedAccounts(newResults);
        }
    }, [program?.programId, anchorWallet?.publicKey]);


    const sendBuyWithOracle = useCallback(
        async (
            amount
        ) => {
        if(!isValidNumber(amount))return;
        const amountLamports = parseSolToLamportsBN(amount);

        if (!program) throw new Error("Program not initialized");
        
        try {
            const signatureData = await getSolanaPriceSignature();
            if(!signatureData) {
                throw new Error("Oracle Price Signature not initialized");
            }

            const accounts = {
                state: predefinedAccounts.statePda,
                user: anchorWallet?.publicKey,
                tokenInfo: predefinedAccounts?.tokenInfo,
                buyerInfo: predefinedAccounts?.buyerInfo,
                vault:new PublicKey(globalConfigs?.solana?.vaultAddress),
                clock: SYSVAR_CLOCK_PUBKEY,
                systemProgram: SystemProgram.programId,
                instructions: SYSVAR_INSTRUCTIONS_PUBKEY
            }

            // 1. ed25519 verify ix
            const ed25519Ix = Ed25519Program.createInstructionWithPublicKey({
                publicKey: bs58.decode(signatureData?.pubkeyBase58),
                message: new Uint8Array(signatureData?.msg),
                signature:new Uint8Array(signatureData?.signature)
            });

            // 2. program ix
            const programIx = await program.methods
                .buyWithSolOracle(
                    toPaddedSymbol(globalConfigs.targetToken.symbol),
                    amountLamports,
                    false,
                    new BN(signatureData?.scaledPrice),
                    new BN(signatureData?.timestamp),
                    new Uint8Array(signatureData?.signature)
                )
                .accounts(accounts)
                .instruction();

            // 3. tx build
            const tx = new Transaction().add(ed25519Ix, programIx);
            tx.feePayer = anchorWallet.publicKey;
            tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

            // 4. let wallet sign
            const signedTx = await anchorWallet.signTransaction(tx);

            // 5. send
            const txid = await connection.sendRawTransaction(signedTx.serialize(), {
                skipPreflight: false,
            });

            return txid;
        } catch (err) {
            console.error("sendBuyWithOracle error", err);
            throw err;
        }
        },
        [program, connection, anchorWallet]
    );


    const sendBuyWithUsdt = useCallback(
        async (
            usdtAmount,
        ) => {
            if(!isValidNumber(usdtAmount))return;
        const usdtAmountDecimals = parseAmountToBN(usdtAmount, globalConfigs?.solana?.USDT_Decimals);

        if (!program) throw new Error("Program not initialized");
        
        try {
            const accounts = {
                state: predefinedAccounts.statePda,
                payer: anchorWallet?.publicKey,
                tokenInfo: predefinedAccounts?.tokenInfo,
                buyerInfo: predefinedAccounts?.buyerInfo,
                vault:new PublicKey(globalConfigs?.solana?.vaultAddress),
                usdtMint:new PublicKey(globalConfigs?.solana?.USDT_Address),
                userUsdtAta: predefinedAccounts?.buyerAta,
                vaultUsdtAta:predefinedAccounts?.vaultAta,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
            }

            await program.methods['buyWithUsdt'](
                toPaddedSymbol(globalConfigs.targetToken.symbol),
                usdtAmountDecimals,
                false
            ).accounts(accounts).rpc();
        } catch (err) {
            console.error("sendBuyWithOracle error", err);
            throw err;
        }
        },
        [program, connection, anchorWallet]
    );



  return (
    <AppSolanaContext.Provider
        value={{
            publicKey,
            currentAddress: publicKey?.toBase58(), 
            // currentChainId :chainId,
            tokenSymbol: globalConfigs?.targetToken?.symbol,
            tokenPriceInUsdt: globalConfigs?.targetToken?.tokenPrice,


            totalBought:purchaseInfo?.totalBought,
            formatedBought:formatTokenNumber(purchaseInfo?.totalBought),

            stakedAmount:purchaseInfo?.stakedAmount,
            formatedStaked:formatTokenNumber(purchaseInfo?.stakedAmount),

            stakeableAmount:purchaseInfo?.stakeableAmount,
            formatedStakeable:formatTokenNumber(purchaseInfo?.stakeableAmount),
            
            
            connected,
            disconnect,
            select,
            wallets,
            walletDialogVisible,
            setWalletDialogVisible,
            connectedDialogVisible,
            setConnectedDialogVisible,
            predefinedAccounts,

            sendBuyWithOracle,
            sendBuyWithUsdt,

            currentRaise,
            nextRaise,
            formatedRaise:formatTokenNumber(currentRaise),
            formatedNextRaise:formatIntNumber(nextRaise),
            
            solanaPrice
        }}
    >
      {children}
    </AppSolanaContext.Provider>
  );
};

// custom hook
export const useAppSolanaWallet = () => useContext(AppSolanaContext);
