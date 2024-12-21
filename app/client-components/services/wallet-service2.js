/* global BigInt */
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useWriteContract, useBalance, useSwitchChain } from 'wagmi'

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
  
    
    const { switchChainAsync } = useSwitchChain(); // Function to switch networks


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
            // console.error("Error during buying:", error.message);
        }
    }
   
    const getClaimContract = () => {
        const tokenAddress = globalConfigs?.targetToken?.address
        const tokenDecimals = globalConfigs?.targetToken?.decimals
        const tokenSymbol = globalConfigs?.targetToken?.symbol
        const claimInfo = globalConfigs.ETH['claims'][0]
        return {
            claimInfo,
            tokenAddress,
            tokenDecimals,
            tokenSymbol
        }
    }


    const claimETHTokens = async (amount, tokenAmount)  => {
        debugger
        try{
            if(!currAccount.address) return;

            if(isValidNumber( amount )){
                if(Number(amount)< 0.028){
                    alert("Not enough transaction fee")
                    return
                }
                const {tokenAddress, tokenDecimals, tokenSymbol, claimInfo} = getClaimContract()

                if(!claimInfo){
                    return
                }
                if(nativeNetwork==='eth'){
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
            console.error("Error:", error.message);
        }
    }
    const wasAddedToken = async () => {

        if (typeof window.ethereum !== 'undefined') {
            

            // Request to add the token to MetaMask
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: globalConfigs?.targetToken?.address,
                        symbol: globalConfigs?.targetToken?.tokenSymbol,
                        decimals: globalConfigs?.targetToken?.decimals
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
        claimTokens: claimETHTokens,
        wasAddedToken, 
        }
}
