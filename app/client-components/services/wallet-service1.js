/* global BigInt */

import { ethers,parseEther,Network, parseUnits,formatUnits } from 'ethers';
import Decimal from 'decimal.js';
import {useState, useEffect, useMemo} from 'react'
import Web3 from 'web3';
import { useNativeNetwork, useSetCurrentAddress, useSetNativeNetwork } from '../../../redux/utils/nativeNetworkUtils';
import { NETWORK_OTIONS, VALID_NETWORKS } from '../../../redux/ducks/nativeNetworkDuck';

export const CONST = {
    BNB: "BNB",
    BSC:"BSC",
    ETH:"ETH",
    FIAT:"FIAT",
    USDT:"USDT",
    ERC20: "ERC20",
    SOL: "SOL"
}
export function isValidNumber( amount) {
    // Check for empty string
    if (!amount) {
      return false;
    }
  
    // Attempt to convert the value to a number using parseFloat
    const numberValue = parseFloat(amount);
  
    // Check if the conversion was successful (not NaN) and the value is finite (not Infinity or -Infinity)
    return !isNaN(numberValue) && isFinite(numberValue);
  }
  
  // Function to calculate USD needed given a token amount and token price
export const calculateUSDNeeded = (tokenAmount, tokenPrice) => {
    const tokenAmountDecimal = new Decimal(tokenAmount);
    const tokenPriceDecimal = new Decimal(tokenPrice);
    return tokenAmountDecimal.times(tokenPriceDecimal).toString();
};

// Function to calculate token output given a USD amount and token price
export const calculateTokenOutput = (usdAmount, tokenPrice) => {
    const usdAmountDecimal = new Decimal(usdAmount);
    const tokenPriceDecimal = new Decimal(tokenPrice);
    return usdAmountDecimal.div(tokenPriceDecimal).floor().toString();
};

// Function to calculate number of tokens for a given amount of BNB
export const calculateTokensForBNB = (bnbAmount, bnbToUsdtRate, tokenToUsdtRate) => {
    const bnbValueInUSDT = new Decimal(bnbAmount).times(bnbToUsdtRate);
    const tokenAmount = bnbValueInUSDT.div(tokenToUsdtRate).floor();
    return tokenAmount;
};

// Function to calculate amount of BNB needed for a given number of tokens
export const calculateBNBNeeded = (tokenAmount, bnbToUsdtRate, tokenToUsdtRate) => {
    const tokenValueInUSDT = new Decimal(tokenAmount).times(tokenToUsdtRate);
    const bnbAmount = tokenValueInUSDT.div(bnbToUsdtRate).toFixed(3).toString();
    // Check if rounded value is 0, return 0
    if (parseFloat(bnbAmount) === 0) {
        return '0';
    }
    return bnbAmount;
};
const toWei = ether => parseEther(ether)

export const truncateMiddle = (text) => {
    const maxLength = 6;
    if (text?.length <= maxLength * 2) {
      return text;
    }
    const prefix = text?.slice(0, maxLength);
    const suffix = text?.slice(-maxLength);
    return `${prefix}...${suffix}`;
};

export const useWalletETH=(nativeNetwork, globalConfigs) => {
    const setNativeNetwork =  useSetNativeNetwork()
    const setCurrentAddress = useSetCurrentAddress()
    const [signer, setSigner] = useState(undefined);
    const [currentProvider, setCurrentProvider] = useState(undefined)

    const [maxAmount, setMaxAmount] = useState(0)
    const [spenableAmount, setSpenableAmount] = useState(0)

    const [maxUsdt, setMaxUsdt] = useState(0)
    const [bnbPrice, setBnbPrice] = useState(0);
    const [ethPrice, setEthPrice] = useState(0);
  
    
    useEffect(() => {
        if(signer?.address &&  currentProvider){
            getAvailableBalances()
        }
    }, [signer?.address, currentProvider])

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

    const getProvider = () => {
        if (VALID_NETWORKS.includes(nativeNetwork)) {
            try{

                let provider = null;
                if (!window.ethereum) {
                    alert("MetaMask not installed. Please install Metamask to buy Token!")
                    provider = ethers.getDefaultProvider()
                    return false;
                } else {
                    
                    if(window.ethereum !== undefined){
                        try{
                            provider = new ethers.BrowserProvider(window.ethereum, 'any')
                        }
                        catch(err){
                            console.error(err.message)
                        }
                    }
                    else{
                        alert("MetaMask not installed. Please install Metamask to buy Token!")
                        return false;
                    }
                }
                return provider
            }
            catch (err){

            }
        }
        return false;
    };


    const connectWallet = async () => {
        
        if(window.ethereum !== undefined){
            const ethereum = window.ethereum;

            ethereum.on('chainChanged',async (chainId) => {
                // Network has changed, refresh page
                // window.location.reload();
                
                const chainVal = parseInt(chainId, 16)
                if(chainVal === 56){
                    setNativeNetwork('bsc')
                }
                if (chainVal === 1){    
                    setNativeNetwork('eth')
                }
                const walletProvider = getProvider();

         
                if(walletProvider){
                    setCurrentProvider(walletProvider)
                    const signer = await walletProvider.getSigner()
                    setCurrentAddress(signer.address)
                    setSigner(signer)
                }

            });

            // For address change (optional)
            ethereum.on('accountsChanged', async (accounts) => {
                const walletProvider = getProvider();

         
                if(walletProvider){
                    setCurrentProvider(walletProvider)
                    const signer = await walletProvider.getSigner()
                    setCurrentAddress(signer.address)
                    console.log(signer)
                    setSigner(signer)
                }
            });
        }


        if (getProvider && VALID_NETWORKS.includes(nativeNetwork)) {
            const walletProvider = getProvider();
         
            if(walletProvider){
                setCurrentProvider(walletProvider)

                const cureentNetwork = await walletProvider.getNetwork();
                const chainId = cureentNetwork.chainId.valueOf() 


                const signer = await walletProvider.getSigner()
                setCurrentAddress(signer.address)
                setSigner(signer)

                if(chainId !== 1n){
                    try{
                        await walletProvider.send("wallet_switchEthereumChain", [{ chainId: "0x1" }]);
                    }
                    catch(err){
                        
                        const cureentNetwork = await walletProvider.getNetwork();
                        const chainId = cureentNetwork.chainId.valueOf() 
                        if(chainId === 56n){
                            setNativeNetwork('bsc')
                        }
                        if (chainId === 1n){    
                            setNativeNetwork('eth')
                        }
                    }
                }
                else{
                    setNativeNetwork('eth')
                }
                

                
                
            }


        }
    }

    const swicthNativeNetwork = async (key) => {
        try{
            if(currentProvider){
                await currentProvider.send("wallet_switchEthereumChain", [{ chainId: "0x" + NETWORK_OTIONS[key].chainId.toString(16) }]);
            }

        }
        catch (err){
            console.error(err.message)
        }
    }

    const getMaxUSDT = async () => {
        
        if(!currentProvider || !signer?.address){
            return 0
        }
        try{
            if(currentProvider && signer.address){
                
                const currentNetwork = await currentProvider.getNetwork();
                const chainId = currentNetwork.chainId.valueOf() 

                const {usdtContract,usdtDecimals} = getContracts(chainId)
                const currentUsdt = await usdtContract.balanceOf(signer.address);
                if(currentUsdt === 0 ){
                    return 0
                }
                const formattedBalance = formatUnits(currentUsdt, usdtDecimals);
                const intValue = Math.floor(Number(formattedBalance));
                return intValue.toString();
            }
            return 0
        }
        catch (err){
            console.error(err.message)
            return 0
        }
    }




    const getAllAmount = async () => {
        if(!signer?.address){
            return 0
        }
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum);
    
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
    
            // Get the user's address from MetaMask
            const currentAddress = (await web3.eth.getAccounts())[0];
    
            // Get the balance in Wei
            const balanceWei = await web3.eth.getBalance(currentAddress);
    
             
            // Estimate gas cost for a simple transaction (e.g., sending 0 ETH)
            const gasPrice = await web3.eth.getGasPrice();
            const gasLimit = 900000n; // Standard gas limit for simple transactions
            const gasCost = gasPrice * gasLimit;
            
            if(balanceWei>0){

                // Convert the balance to Ether and subtract the gas cost
                const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
                const spendableAmount = parseFloat(balanceEther) - parseFloat(web3.utils.fromWei(gasCost.toString(), 'ether'));

                return{
                    max: parseFloat(balanceEther).toFixed(3),
                    spenable: parseFloat(spendableAmount).toFixed(3)
                }

            }
            else{
                return{
                    max: 0,
                    spenable: 0
                }
            }

        } else {
            // console.error('MetaMask is not installed');
            return{
                max: 0,
                spenable: 0
            }
        }
    };

    
    const getContracts = (chainId) => {
        
        let salerContract = null;
        let usdtContract = null;
        let usdtDecimals = 0;
        if(chainId === 1n ||chainId === 11155111n ){
            const salerInfo = globalConfigs.ETH['salers'][0]
            salerContract = new ethers.Contract(
                salerInfo.address,
                salerInfo.abi,
                currentProvider
            )
            usdtContract = new ethers.Contract(
                globalConfigs['ETH']['USDT_Address'],
                globalConfigs['ETH']['USDT_Abi'],
                currentProvider
            )

            usdtDecimals = globalConfigs['ETH']['USDT_Decimals']
        }

        if(chainId === 56n || chainId === 97n){
            const salerInfo = globalConfigs.BSC['salers'][0]
            salerContract = new ethers.Contract(
                salerInfo.address,
                salerInfo.abi,
                currentProvider
            )
            usdtContract = new ethers.Contract(
                globalConfigs['BSC']['USDT_Address'],
                globalConfigs['BSC']['USDT_Abi'],
                currentProvider
            )

            usdtDecimals = globalConfigs['BSC']['USDT_Decimals']
        }


        return{salerContract, usdtContract, usdtDecimals}


    }


    const buyTokens= async (amount)  => {
        try{
            if(!signer) return;

            if(isValidNumber( amount )){
                const currentNetwork = await currentProvider.getNetwork();
                const chainId = currentNetwork.chainId.valueOf() 
                const {salerContract} = getContracts(chainId)

                if(!salerContract){
                    return
                }
                const wei = toWei(amount)
                const tx = await salerContract.connect(signer).buyTokens(globalConfigs?.targetToken?.symbol, {value: wei})
                await tx.wait();
                // console.log("Tokens bought successfully.");
            }
            // window.location.reload();
        }
        catch(error){
            //   console.error("Error:", error.message);
        }
    }


    const buyTokensWithRef = async (amount, ref)  => {
        try{
            if(!signer) return;

            if(isValidNumber( amount )){
                const currentNetwork = await currentProvider.getNetwork();
                const chainId = currentNetwork.chainId.valueOf() 
                const {salerContract} = getContracts(chainId)

                if(!salerContract){
                    return
                }
                const wei = toWei(amount)
                const tx = await salerContract.connect(signer).buyTokensWifRef(globalConfigs?.targetToken?.symbol,ref ? ref : "", {value: wei})
                await tx.wait();
                // console.log("Tokens bought successfully.");
            }
            // window.location.reload();
        }
        catch(error){
            //   console.error("Error:", error.message);
        }
    }


    async function approveUSDT_BSC(amount, chainId) {
        try{
            const{usdtDecimals, usdtContract , salerContract} = getContracts(chainId)
            const usdtAmount = parseUnits(amount, usdtDecimals); // Set the allowance amount (1000 USDT in this case)

            // Check allowance using a separate function for clarity
            const currentAllowance = await usdtContract.allowance(signer.address, salerContract.target);
            if (currentAllowance < usdtAmount) {
            // 
            // usdtAmount = usdtAmount - currentAllowance
        
            // Revoke existing allowance only if it's not already 0
            // if (currentAllowance !== parseUnits('0', usdtDecimals)) {
            //   const revokeTx = await usdtContract.connect(signer).approve(salerContract.target, 0);
            //   await revokeTx.wait();
            //   console.log("Existing allowance revoked successfully (if any)");
            // }
            // usdtAmount = usdtAmount - currentAllowance
        
            // Approve new allowance
            const approvalTx = await usdtContract.connect(signer).approve(salerContract.target, usdtAmount);
            await approvalTx.wait();
            console.log("New allowance set successfully!");
            }
        }
        catch (error) {
            console.error("Error during approval:", error.message);
            // Handle the error appropriately (e.g., display a user-friendly message)
        }
    }
        
    async function approveUSDT_ETH(amount, chainId) {
        try {
            const{usdtDecimals, usdtContract , salerContract} = getContracts(chainId)

            const usdtAmount = parseUnits(amount, usdtDecimals);
        
            // Check allowance using a separate function for clarity
            const currentAllowance = await usdtContract.allowance(signer.address, salerContract.target);
            if (currentAllowance < usdtAmount) {
                // Revoke existing allowance only if it's not already 0
                // if (currentAllowance !== parseUnits('0', usdtDecimals)) {
                //     const revokeTx = await usdtContract.connect(signer).approve(salerContract.target, 0);
                //     await revokeTx.wait();
                //     console.log("Existing allowance revoked successfully (if any)");
                // }
        
                // Approve new allowance
                const approvalTx = await usdtContract.connect(signer).approve(salerContract.target, usdtAmount);
                await approvalTx.wait();
                console.log("New allowance set successfully!");
                
            }
        } catch (error) {
        //   console.error("Error during approval:", error.message);
            // Handle the error appropriately (e.g., display a user-friendly message)
        }
    }
        
    const getAvailableBalances = async () => {
        const {max, spenable} = await getAllAmount();
        setMaxAmount(max);
        setSpenableAmount(spenable)
        
        const allUsdt = await getMaxUSDT();
        setMaxUsdt(allUsdt)
    }
        
    const buyTokensUSDT = async (amount) => {
        try{
            if(!signer) return;
            if(isValidNumber(amount)){
                
                const currentNetwork = await currentProvider.getNetwork();
                const chainId = currentNetwork.chainId.valueOf() 
                const {salerContract,usdtDecimals} = getContracts(chainId)
                
                if(!salerContract){
                    return
                }
                
                if(chainId === 1n){
                    
                    await approveUSDT_ETH(amount,chainId);

                }
                if(chainId === 56n){
                    
                    await approveUSDT_BSC(amount, chainId);

                }
                

                const usdtAmount = parseUnits(amount, usdtDecimals); // Set the allowance amount (1000 USDT in this case)
                const tx = await salerContract.connect(signer).buyTokensWithUSDT(usdtAmount, globalConfigs?.targetToken?.symbol);
                await tx.wait();
                console.log("Buy Tokens successfully!");

                // await buyTokensBySpecificAmountUSDT(amount);
                // window.location.reload();
            }
        }
        catch(error){
            // console.error("Error during buying:", error.message);
        }
    }
   

    const buyTokensUSDTWifRef = async (amount, ref) => {
        try{
            if(!signer) return;
            if(isValidNumber(amount)){
                
                const currentNetwork = await currentProvider.getNetwork();
                const chainId = currentNetwork.chainId.valueOf() 
                const {salerContract,usdtDecimals} = getContracts(chainId)
                
                if(!salerContract){
                    return
                }
                
                if(chainId === 1n){
                    
                    await approveUSDT_ETH(amount,chainId);

                }
                if(chainId === 56n){
                    
                    await approveUSDT_BSC(amount, chainId);

                }
                

                const usdtAmount = parseUnits(amount, usdtDecimals); // Set the allowance amount (1000 USDT in this case)
                const tx = await salerContract.connect(signer).buyTokensByUsdtWifRef(usdtAmount, globalConfigs?.targetToken?.symbol, ref ? ref:"");
                await tx.wait();
                console.log("Buy Tokens successfully!");

                // await buyTokensBySpecificAmountUSDT(amount);
                // window.location.reload();
            }
        }
        catch(error){
            // console.error("Error during buying:", error.message);
        }
    }
   
    
    const addNewRef = async (targetChain, amount, address, refString) => {
        try{
            
            const currentNetwork = await currentProvider.getNetwork();
            const chainId = currentNetwork.chainId.valueOf() 
            const wei = toWei(amount)
            
            if(targetChain != Number(chainId)){
                await currentProvider.send("wallet_switchEthereumChain", [{ chainId: "0x" + targetChain.toString(16) }]);

                // await currentProvider.send("wallet_switchEthereumChain", [{ chainId: `0x${targetChain}` }]);
            }
            const {salerContract} = getContracts(BigInt(targetChain))
    
            const tx = await salerContract.connect(signer).addRefAddress(address, refString, {value: wei});
            await tx.wait();
            console.log("Add new ref succeeded.")
        }
        catch{

        }

    }
    return {
        // buyTokens, buyTokensUSDT, approveUSDT_BSC, approveUSDT_ETH,
        currentAddress: signer?.address, 
        provider: currentProvider,
        tokenPriceInUsdt: globalConfigs?.targetToken?.tokenPrice,
        maxAmount,
        spenableAmount,
        maxUsdt,
        bnbPrice,
        ethPrice,
        //  getMaxUSDT , 
        getAvailableBalances, 
        buyTokens,
        buyTokensWithRef,
        swicthNativeNetwork,
        connect: connectWallet,
        buyTokensUSDT,
        buyTokensUSDTWifRef,
        addNewRef
        //  wasAddedToken, claimTokens, airdropTokens, directBuyTokensUSDT, 
        }
}
