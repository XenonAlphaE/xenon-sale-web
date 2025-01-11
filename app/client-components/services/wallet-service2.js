/* global BigInt */
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useWriteContract, useReadContract, UseReadContractParameters } from 'wagmi'

import { ethers,parseEther,Network, parseUnits,formatUnits } from 'ethers';
import Decimal from 'decimal.js';
import {useState, useEffect, useMemo} from 'react'
import Web3 from 'web3';
import { useNativeNetwork, useSetCurrentAddress, useSetNativeNetwork } from '../../../redux/utils/nativeNetworkUtils';
import { NETWORK_OTIONS, VALID_NETWORKS } from '../../../redux/ducks/nativeNetworkDuck';
import { toWei, isValidNumber  } from './wallet-service';



export const useWalletETH=( inputNetwork , globalConfigs) => {
    const { data: hash, writeContract, writeContractAsync } = useWriteContract()
    const nativeNetwork = useNativeNetwork()
    const { openConnectModal } = useConnectModal();
    const { openChainModal } = useChainModal();
    const currAccount = useAccount()



    const [maxAmount, setMaxAmount] = useState(0)
    const [spenableAmount, setSpenableAmount] = useState(0)

    const [maxUsdt, setMaxUsdt] = useState(0)
    const [bnbPrice, setBnbPrice] = useState(0);
    const [ethPrice, setEthPrice] = useState(0);
  
    
  
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


    const buyTokensWithRef = async (amount, ref)  => {
        
        try{
            if(!currAccount.address) return;

            if(isValidNumber( amount )){
                
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
                    args:[globalConfigs?.targetToken?.symbol, ref ? ref : ""]
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


    // async function approveUSDT_BSC(amount, chainId) {
    //     try{
    //         const{usdtDecimals, usdtContract , salerContract} = getContracts(chainId)
    //         const usdtAmount = parseUnits(amount, usdtDecimals); // Set the allowance amount (1000 USDT in this case)

    //         // Check allowance using a separate function for clarity
    //         const currentAllowance = await usdtContract.allowance(signer.address, salerContract.target);
    //         if (currentAllowance < usdtAmount) {
    //         // 
    //         // usdtAmount = usdtAmount - currentAllowance
        
    //         // Revoke existing allowance only if it's not already 0
    //         // if (currentAllowance !== parseUnits('0', usdtDecimals)) {
    //         //   const revokeTx = await usdtContract.connect(signer).approve(salerContract.target, 0);
    //         //   await revokeTx.wait();
    //         //   console.log("Existing allowance revoked successfully (if any)");
    //         // }
    //         // usdtAmount = usdtAmount - currentAllowance
        
    //         // Approve new allowance
    //         const approvalTx = await usdtContract.connect(signer).approve(salerContract.target, usdtAmount);
    //         await approvalTx.wait();
    //         console.log("New allowance set successfully!");
    //         }
    //     }
    //     catch (error) {
    //         console.error("Error during approval:", error.message);
    //         // Handle the error appropriately (e.g., display a user-friendly message)
    //     }
    // }
        
    // async function approveUSDT_ETH(amount) {
    //     
    //     try {
    //         const{salerInfo, usdtDecimals,usdtAbi,usdtAddress} = getContracts()

    //         const usdtAmount = parseUnits(amount, usdtDecimals);
    //         
    //         // Check allowance using a separate function for clarity
    //         const currentAllowance = useReadContract({
    //             abi: usdtAbi,
    //             address: usdtAddress,
    //             functionName: 'allowance',
    //             args: [currAccount.address, salerInfo.address]
    //           })
    //         
    //         // const currentAllowance = await usdtContract.allowance(signer.address, salerContract.target);
    //         if (currentAllowance < usdtAmount) {
    //             // Revoke existing allowance only if it's not already 0
    //             // if (currentAllowance !== parseUnits('0', usdtDecimals)) {
    //             //     const revokeTx = await usdtContract.connect(signer).approve(salerContract.target, 0);
    //             //     await revokeTx.wait();
    //             //     console.log("Existing allowance revoked successfully (if any)");
    //             // }
        
    //             // Approve new allowance
    //             // const approvalTx = await usdtContract.connect(signer).approve(salerContract.target, usdtAmount);
    //             const approvalTx = await writeContractAsync({
    //                 abi: usdtAbi,
    //                 address: usdtAddress,
    //                 functionName:"approve",
    //                 args:[salerContract.target, usdtAmount]
    //             })

    //             // await approvalTx.wait();
    //             console.log("New allowance set successfully!" + approvalTx);
                
    //         }
    //     } catch (error) {
    //         console.error("Error during approval:", error.message);
    //         // Handle the error appropriately (e.g., display a user-friendly message)
    //     }
    // }
 
    const buyTokensUSDTWifRef = async (amount, ref) => {
        
        try{
            if(!currAccount.address) return;
            if(isValidNumber(amount)){
                
                const {salerInfo,usdtAbi, usdtAddress, usdtDecimals} = getContracts()
                
                if(!salerInfo){
                    return
                }
                
                const usdtAmount = parseUnits(amount, usdtDecimals); // Set the allowance amount (1000 USDT in this case)
                
                const approvalTx = await writeContractAsync({
                    abi: usdtAbi,
                    address: usdtAddress,
                    functionName:"approve",
                    args:[salerInfo.address, usdtAmount]
                })

                // await approvalTx.wait();
                // await approvalTx.wait();
                console.log("New allowance set successfully!" + approvalTx);
                const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

                await delay(3000);

                
                // const tx = await salerContract.connect(signer).buyTokensByUsdtWifRef(usdtAmount, globalConfigs?.targetToken?.symbol, ref ? ref:"");
                const tx = await writeContractAsync({
                    abi: salerInfo.abi,
                    address: salerInfo.address,
                    functionName:"buyTokensByUsdtWifRef",
                    args:[usdtAmount, globalConfigs?.targetToken?.symbol, ref ? ref:""]
                })
                // await tx.wait();
                console.log("Buy Tokens successfully!" + tx);

                // await buyTokensBySpecificAmountUSDT(amount);
                // window.location.reload();
            }
        }
        catch(error){
            console.error("Error during buying:", error.message);
        }
    }
   
    
    
    return {
        // buyTokens, buyTokensUSDT, approveUSDT_BSC, approveUSDT_ETH,
        currentAddress: currAccount.address, 
        // currentChainId :chainId,
        tokenPriceInUsdt: globalConfigs?.targetToken?.tokenPrice,
        maxAmount,
        spenableAmount,
        maxUsdt,
        bnbPrice,
        ethPrice,
        //  getMaxUSDT , 
        buyTokensWithRef,
        swicthNativeNetwork,
        connect: connectWallet,
        buyTokensUSDTWifRef,
        //  wasAddedToken, claimTokens, airdropTokens, directBuyTokensUSDT, 
        }
}
