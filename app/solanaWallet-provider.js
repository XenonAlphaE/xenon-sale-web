"use client";
import React, { createContext, useContext, useState,useCallback ,useEffect} from "react";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider } from "@project-serum/anchor";

import { LAMPORTS_PER_SOL, PublicKey, SYSVAR_INSTRUCTIONS_PUBKEY,SYSVAR_CLOCK_PUBKEY,
  Transaction,
  Ed25519Program,
 } from "@solana/web3.js";

import mainConfigs from './client-components/config.main'
import { toPaddedSymbol } from "./client-components/services/utils";
import { getSolanaPriceSignature } from "./client-components/services/token-service";

const AppSolanaContext = createContext(null);




export const AppSolanaProvider = ({ children }) => {
    const { publicKey, connected, disconnect, select, wallets } = useWallet();
    const anchorWallet =  useAnchorWallet();
    const { connection } = useConnection();

    const [walletDialogVisible, setWalletDialogVisible] = useState(false);
    const [connectedDialogVisible, setConnectedDialogVisible] = useState(false);

    const [program, setProgram] = useState(null);
    const [predefinedAccounts ,setPredefinedAccounts] = useState({})

    useEffect(() => {
        if(mainConfigs.solana.salers.length > 0){

            let prog;
    
            if (connected ) {
                const provider = new AnchorProvider(connection, anchorWallet, { preflightCommitment: "processed" });
                prog = new Program(mainConfigs.solana.salers[0].idl, mainConfigs.solana.salers[0].programId, provider);
            } else {
                // Read-only program
                prog = new Program(mainConfigs.solana.salers[0].idl, mainConfigs.solana.salers[0].programId, { connection });
            }
    
            setProgram(prog);
        }
    }, [connected, connection]);



    useEffect(() => {
        if(mainConfigs.solana.salers.length > 0){

            let prog;
    
            if (connected ) {
                const provider = new AnchorProvider(connection, anchorWallet, { preflightCommitment: "processed" });
                prog = new Program(mainConfigs.solana.salers[0].idl, mainConfigs.solana.salers[0].programId, provider);
            } else {
                // Read-only program
                prog = new Program(mainConfigs.solana.salers[0].idl, mainConfigs.solana.salers[0].programId, { connection });
            }
    
            setProgram(prog);
        }
    }, [connected, connection]);


    const sendBuyWithOracle = useCallback(
        async ({
            amountLamports,
        }) => {
        if (!program) throw new Error("Program not initialized");
        
        try {
            const signatureData = await getSolanaPriceSignature();
            if(!signatureData) {
                throw new Error("Oracle Price Signature not initialized");
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
                toPaddedSymbol(mainConfigs.targetToken.symbol),
                amountLamports,
                true,
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


  return (
    <AppSolanaContext.Provider
      value={{
        publicKey,
        connected,
        disconnect,
        select,
        wallets,
        walletDialogVisible,
        setWalletDialogVisible,
        connectedDialogVisible,
        setConnectedDialogVisible,
        sendBuyWithOracle
      }}
    >
      {children}
    </AppSolanaContext.Provider>
  );
};

// custom hook
export const useAppSolanaWallet = () => useContext(AppSolanaContext);
