import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
/* global BigInt */
import {
    useConnectModal,
    useAccountModal,
    useChainModal,

} from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useWriteContract, useBalance, useSwitchChain, useSignMessage, useConfig} from 'wagmi'
import {readContract } from '@wagmi/core'
import { ethers,parseEther,Network, parseUnits,formatUnits } from 'ethers';
import { useNativeNetwork, useSetCurrentAddress, useSetNativeNetwork } from '../redux/utils/nativeNetworkUtils';
import { NETWORK_OTIONS, VALID_NETWORKS } from '../redux/ducks/nativeNetworkDuck';
import { toWei, isValidNumber  } from './client-components/services/wallet-service';
import {getMaxBalancesInfo, getUserPurchaseInfo} from '../app/client-components/services/token-service'
import { formatViewNumber } from "./client-components/services/utils";
import { zeroAddress } from "viem";

// Create a context for the wallet
const Erc20WalletContext = createContext();

export const Erc20WalletProvider = ({ globalConfigs, children }) => {
    // Define the wallet logic (useWalletETH)
    const { openConnectModal } = useConnectModal();
    const { openChainModal } = useChainModal();
    const { writeContractAsync } = useWriteContract()
    const { signMessageAsync } = useSignMessage();
    const wagmiConfig  = useConfig()
    const nativeNetwork = useNativeNetwork()
    const currAccount = useAccount()
    const [maxAmount, setMaxAmount] = useState(0)
    const [spenableAmount, setSpenableAmount] = useState(0)

    const [maxUsdt, setMaxUsdt] = useState(0)
    const [bnbPrice, setBnbPrice] = useState(0);
    const [totalBought, setTotalBought] = useState(0);
    const [maxBalanceInfo, setMaxBalanceInfo] = useState(null);
    const [ethPrice, setEthPrice] = useState(0);
    const { switchChainAsync } = useSwitchChain(); // Function to switch networks
    const { openAccountModal } = useAccountModal();

    // Fetch ETH balance for the current wallet
    const { data, isError, isLoading } = useBalance({
        address: currAccount?.address, // Wallet address
        watch: true, // Automatically update balance on wallet changes
    });

    useEffect(() => {
        const currAmount = Number(formatUnits(data?.value || 0, 18))
        
        setMaxAmount((currAmount-0.005 > 0 ?currAmount-0.005  : 0 ).toFixed(4))
    }, [data?.formatted])

    useEffect(() => {
        const fetchDataBNB = async () => {
          try {
            const response = await fetch(globalConfigs.BSC.USDT_Price); // Assuming 'data.json' is a local file
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setBnbPrice(jsonData.price);
          } catch (error) {
            console.error('There was a problem fetching the data:', error);
          }
        };
    
        const fetchDataEth = async () => {
          try {
            const response = await fetch(globalConfigs.ETH.USDT_Price); // Assuming 'data.json' is a local file
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setEthPrice(jsonData.price);
          } catch (error) {
            console.error('There was a problem fetching the data:', error);
          }
        };
        fetchDataEth()
        fetchDataBNB();
      }, [globalConfigs]);

    useEffect(() => {
        const loadPurchaseInfo = async () => {
            if (!currAccount.address) {
            return;
            }
        
            try {
            
                const info = await getUserPurchaseInfo(globalConfigs, currAccount.address)
                if (info) {
                    setTotalBought(info)
                }
            }
            catch (err) {
        
            }
        }
        loadPurchaseInfo()
    }, [currAccount.address, globalConfigs]); // Empty dependency array ensures this effect runs only once
    
    useEffect(() => {
        const loadBalances = async () => {
            if (!currAccount.address || !ethPrice || !bnbPrice && ethPrice < 1 && bnbPrice < 1 ) {
                return;
            }
        
            try {
                
                const info = await getMaxBalancesInfo(globalConfigs, currAccount.address, bnbPrice, ethPrice)
                if (info) {
                    setMaxBalanceInfo(info)
                }
            }
            catch (err) {
        
            }
        }
        loadBalances()
    }, [currAccount.address, globalConfigs, ethPrice, bnbPrice]); // Empty dependency array ensures this effect runs only once
    
    const getContracts = () => {
            
        let salerInfo = null;
        let usdtAbi = null;
        let usdtAddress = null;
        let usdtDecimals = 0;
        if(nativeNetwork==='eth'){
            salerInfo = globalConfigs.ETH['salers'][0]
            usdtAbi = globalConfigs.ETH['USDT_Abi']
            usdtAddress = globalConfigs.ETH['USDT_Address']
            usdtDecimals = globalConfigs.ETH['USDT_Decimals']
        }

        if(nativeNetwork==='bsc'){
            salerInfo = globalConfigs.BSC['salers'][0]
            usdtAbi = globalConfigs.BSC['USDT_Abi']
            usdtAddress = globalConfigs.BSC['USDT_Address']
            usdtDecimals = globalConfigs.BSC['USDT_Decimals']
        }

        if(nativeNetwork==='base'){
            salerInfo = globalConfigs.BASE['salers'][0]
            usdtAbi = globalConfigs.BASE['USDT_Abi']
            usdtAddress = globalConfigs.BASE['USDT_Address']
            usdtDecimals = globalConfigs.BASE['USDT_Decimals']
        }

        if(nativeNetwork==='op'){
            salerInfo = globalConfigs.OP['salers'][0]
            usdtAbi = globalConfigs.OP['USDT_Abi']
            usdtAddress = globalConfigs.OP['USDT_Address']
            usdtDecimals = globalConfigs.OP['USDT_Decimals']
        }

        if(nativeNetwork==='arb'){
            salerInfo = globalConfigs.ARB['salers'][0]
            usdtAbi = globalConfigs.ARB['USDT_Abi']
            usdtAddress = globalConfigs.ARB['USDT_Address']
            usdtDecimals = globalConfigs.ARB['USDT_Decimals']
        }
        
        return{salerInfo, usdtAddress, usdtDecimals, usdtAbi}


    }

    const getClaimContract = () => {
        let tokenAddress = null;
        const tokenDecimals = globalConfigs?.targetToken?.decimals
        const tokenSymbol = globalConfigs?.targetToken?.symbol
        let claimInfo = null;

        
        // if(nativeNetwork==='eth'){
        //     tokenAddress = globalConfigs?.ETH['targetToken']?.address
        //     claimInfo = globalConfigs.ETH['claims'][0]
        // }
        // if(nativeNetwork==='bsc'){
        //     tokenAddress = globalConfigs?.BSC['targetToken']?.address
        //     claimInfo = globalConfigs.BSC['claims'][0]
        // }
        // if(nativeNetwork==='base'){
        //     tokenAddress = globalConfigs?.BASE['targetToken']?.address
        //     claimInfo = globalConfigs.BASE['claims'][0]
        // }

        return {
            claimInfo,
            tokenAddress,
            tokenDecimals,
            tokenSymbol
        }
    }

    
    const walletETH = useMemo(() => {       
    
        const connectWallet = async () => {
            
            openConnectModal()
        }
    
        const swicthNativeNetwork = async () => {
    
            try{
                openChainModal()
            }
            catch (err){
                console.error(err.message)
            }
        }
    
        const buyTokensWithRef = async (amount, ref)  => {
            
            try{
                if(!currAccount.address) return;
    
                if(isValidNumber( amount ) && amount > 0){
                    
                    const {salerInfo} = getContracts()
                    
                    if(!salerInfo){
                        return
                    }
                    const wei = toWei(amount)

                    const tx = await writeContractAsync({
                        abi: salerInfo.abi,
                        address: salerInfo.address,
                        functionName:"buyTokens",
                        value: wei,
                        args:[globalConfigs?.targetToken?.symbol, false, zeroAddress, 0 , 0 , zeroAddress]
                    })
                    
                    // const tx = await salerContract.connect(signer).buyTokensWifRef(globalConfigs?.targetToken?.symbol,ref ? ref : "", {value: wei})
                    // await tx.wait();
                    console.log("Tokens bought successfully." + tx);
                    
                }
                // window.location.reload();
            }
            catch(error){
                //   console.error("Error:", error.message);
            }
        }
     
        const buyTokensUSDTWifRef = async (amount, ref) => {
            
            try{
                if(!currAccount.address) return;
                if(isValidNumber(amount)){
                    
                    const {salerInfo,usdtAbi, usdtAddress, usdtDecimals} = getContracts()
                    
                    if(!salerInfo){
                        return
                    }
                    const usdtAmount = parseUnits(amount, usdtDecimals); // Set the allowance amount (1000 USDT in this case)
                    // 1. Check current allowance
                    const currentAllowance = await readContract(wagmiConfig, {
                        abi: usdtAbi,
                        address: usdtAddress,
                        functionName: 'allowance',
                        args: [currAccount.address, salerInfo.address]
                    });
                    
                    if(currentAllowance< usdtAmount) { // Use lt (less than) for comparison of BigNumbers
                        const approvalTx = await writeContractAsync({
                            abi: usdtAbi,
                            address: usdtAddress,
                            functionName:"approve",
                            args:[salerInfo.address, usdtAmount]
                        })
                        
        
                        // await approvalTx.wait();
                        console.log("New allowance set successfully!" + approvalTx);
                        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                        
                        await delay(3000);
                    }
    
                    
                    // const tx = await salerContract.connect(signer).buyTokensByUsdtWifRef(usdtAmount, globalConfigs?.targetToken?.symbol, ref ? ref:"");
                    const tx = await writeContractAsync({
                        abi: salerInfo.abi,
                        address: salerInfo.address,
                        functionName:"buyWithUSDT",
                        args:[usdtAmount, globalConfigs?.targetToken?.symbol, false, zeroAddress, 0 , 0 , zeroAddress]
                    })
                    // await tx.wait();
                    console.log("Buy Tokens successfully!" + tx);
    
                    // await buyTokensBySpecificAmountUSDT(amount);
                    // window.location.reload();
                }
            }
            catch(error){
                // console.error("Error during buying:", error.message);
            }
        }
       
        const stakeETHTokens = async (amount)  => {
            try{
                if(!currAccount.address) return;
    
                if(isValidNumber( amount )){
                    if(Number(amount)< 0.028){
                        alert("Not enough transaction fee")
                        return
                    }
                    
                    if(nativeNetwork==='eth'){
                        const {salerInfo} = getContracts()
                    
                        if(!salerInfo){
                            return
                        }
                        const wei = toWei(amount)
                        
                        const tx = await writeContractAsync({
                            abi: salerInfo.abi,
                            address: salerInfo.address,
                            functionName:"buyTokensWifRef",
                            value: wei,
                            args:[globalConfigs?.targetToken?.symbol, ""]
                        })
                        
                        // const tx = await salerContract.connect(signer).buyTokensWifRef(globalConfigs?.targetToken?.symbol,ref ? ref : "", {value: wei})
                        // await tx.wait();
                        console.log("Tokens staked successfully." + tx);
                    }
                    else{
                        try {
                            // Switch to the desired network
                                await switchChainAsync({ chainId: 1 });
                            } catch (error) {
                            // console.error('Error switching network:', error);
                                return;
                            }
                    
                    }
                }
            }
            catch(error){
                // console.error("Error:", error.message);
            }
        }
    
        const claimETHTokens = async (amount, tokenAmount)  => {
            try{
                
                if(!currAccount.address) {
                    return;
                }
              
                if(nativeNetwork===maxBalanceInfo?.network){
                    if(isValidNumber( amount )){
                        if(Number(amount)< 0.028){
                            alert("Not enough transaction fee")
                            return
                        }
                        const {tokenAddress, tokenDecimals, tokenSymbol, claimInfo} = getClaimContract()
        
                        if(!claimInfo){
                            return
                        }
                        const wei = toWei(amount)
                        const tokenWei = parseUnits(tokenAmount, tokenDecimals)
                        
                        const tx = await writeContractAsync({
                            abi: claimInfo.abi,
                            address: claimInfo.address,
                            functionName:"claimTokens",
                            value: wei,
                            args:[
                                tokenSymbol, tokenWei, tokenAddress
                            ]
                        })
                        
                        // const tx = await salerContract.connect(signer).buyTokensWifRef(globalConfigs?.targetToken?.symbol,ref ? ref : "", {value: wei})
                        // await tx.wait();
                        console.log("Tokens claimed successfully." + tx);
                    }
                }
                else{
                    try {
                        // Switch to the desired network
                            await switchChainAsync({ chainId: maxBalanceInfo?.chain });
                        } catch (error) {
                        // console.error('Error switching network:', error);
                        return;
                        }
                
                }
            }
            catch(error){
                console.error("Error:", error.message);
            }
        }

        const wasAddedToken = async () => {
    
            if (typeof window.ethereum !== 'undefined') {
                
                const {tokenAddress, tokenDecimals, tokenSymbol, claimInfo} = getClaimContract()

                // Request to add the token to MetaMask
                const wasAdded = await window.ethereum.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: {
                            address: tokenAddress,
                            symbol: tokenSymbol,
                            decimals: tokenDecimals
                            // image: tokenImage,
                        },
                    },
                });
        
                return wasAdded;
            } else {
                // console.error('MetaMask is not installed');
                return false;
            }
    
    
        }

        const signNonce = async (nonce) => {
            try {
                if (!nonce) {
                    return ""
                }
                const signedMessage = await signMessageAsync({ message: nonce });
                return signedMessage;
            } catch (error) {
                console.error('Signing error:', error);
            }
        }
    
        return {
            // buyTokens, buyTokensUSDT, approveUSDT_BSC, approveUSDT_ETH,
            currentAddress: currAccount.address, 
            // currentChainId :chainId,
            tokenSymbol:globalConfigs?.targetToken?.symbol,
            tokenAddress: getClaimContract()?.tokenAddress,
            tokenPriceInUsdt: globalConfigs?.targetToken?.tokenPrice,
            maxAmount,
            spenableAmount,
            maxUsdt,
            bnbPrice,
            ethPrice,
            totalBought,
            formatedBought:formatViewNumber(totalBought),
            //  getMaxUSDT , 
            buyTokensWithRef,
            swicthNativeNetwork,
            connect: connectWallet,
            buyTokensUSDTWifRef,
            claimTokens: claimETHTokens,
            wasAddedToken, 
            signNonce,
            openAccountModal,
            stakeToken: stakeETHTokens
        }
  }, [
    currAccount.address,
    globalConfigs,
    maxAmount,
    spenableAmount,
    maxUsdt,
    bnbPrice,
    ethPrice,
    maxBalanceInfo,
    totalBought
]);

  return (
    <Erc20WalletContext.Provider value={{ walletETH }}>
      {children}
    </Erc20WalletContext.Provider>
  );



}

// Hook to consume the WalletContext
export const useWalletERC20 = () => {
    const context = useContext(Erc20WalletContext);
    if (!context) {
      throw new Error("useWallet must be used within a Erc20WalletContext");
    }
    return context.walletETH;
  };