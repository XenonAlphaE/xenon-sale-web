import { ethers,parseEther,Network, parseUnits ,BigNumberish, formatUnits} from 'ethers';
import Decimal from 'decimal.js';
import {useState, useEffect, useMemo} from 'react'
import Web3 from 'web3';

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
    debugger
    const usdAmountDecimal = new Decimal(usdAmount);
    const tokenPriceDecimal = new Decimal(tokenPrice);
    return usdAmountDecimal.div(tokenPriceDecimal).floor().toString();
};

// Function to calculate number of tokens for a given amount of BNB
export const calculateTokensForBNB = (bnbAmount, bnbToUsdtRate, tokenToUsdtRate) => {
    const bnbValueInUSDT = new Decimal(bnbAmount).times(bnbToUsdtRate);
    const tokenAmount = bnbValueInUSDT.div(tokenToUsdtRate).toFixed(3);
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
export const toWei = ether => parseEther(ether)

export const truncateMiddle = (text) => {
    const maxLength = 6;
    if (text?.length <= maxLength * 2) {
      return text;
    }
    const prefix = text?.slice(0, maxLength);
    const suffix = text?.slice(-maxLength);
    return `${prefix}...${suffix}`;
};


// export const useWallet=(nativeNetwork,globalConfigs) => {
//     const [globalProvider, setGlobalProvider] = useState(undefined)
//     const [signer, setSigner] = useState(undefined);
//     const [salerContract, setSalerContract] = useState(undefined);
//     const [usdtContract, setUsdtContract] = useState(undefined);
//     const [usdtDecimals, setUsdtDecimals] = useState(6);

//     const checkNetwork = async () => {
//         if(!globalProvider){
//             await getProvider()
//             return
//         }
//         const network = await globalProvider.getNetwork();
//         if (network && network.chainId.valueOf() != globalConfigs[nativeNetwork]['ChainId']) {
//             console.warn(`Please switch to the ${globalConfigs[nativeNetwork]['NetworkName']} (network ID ${globalConfigs[nativeNetwork]['ChainId']})!`);
//             if (!window.confirm(`Switch to ${globalConfigs[nativeNetwork]['NetworkName']}?`)) {
//                 return false
//             }
//             try {
//                 await globalProvider.send("wallet_switchEthereumChain", [{ chainId: "0x" + globalConfigs[nativeNetwork]['ChainId'].toString(16) }]);
//                 return false
//             } catch (error) {
//                 console.error("Error switching network:", error.message);
//                 return false
//             }
//         }
//         return true;
//     }

//     const getProvider = async () => {
//         if (nativeNetwork === CONST.BSC || nativeNetwork === CONST.ETH) {
//             try{

//                 let provider = null;
//                 if (!window.ethereum) {
//                     alert("MetaMask not installed. Please install Metamask to buy Token!")
//                     provider = ethers.getDefaultProvider()
//                     return false;
//                 } else {
                    
//                     if(window.ethereum !== undefined){
//                         provider = new ethers.BrowserProvider(window.ethereum, "any")
//                         const ethereum = window.ethereum;
    
//                         ethereum.on('chainChanged', (chainId) => {
//                             // Network has changed, refresh page
//                             // window.location.reload();
//                         });
    
//                         // For address change (optional)
//                         ethereum.on('accountsChanged', async (accounts) => {
//                             // Address has changed, refresh page (optional)
//                             // window.location.reload();
//                             const signer = await provider.getSigner()
//                             setSigner(signer)
//                         });
//                     }
//                     else{
//                         alert("MetaMask not installed. Please install Metamask to buy Token!")
//                         return false;
//                     }
//                 }
                
               
    
//                 if(provider) setGlobalProvider(provider)
    
//                 const salerInfo = globalConfigs[nativeNetwork]['salers'][0]
//                 const contract = new ethers.Contract(
//                     salerInfo.address,
//                     salerInfo.abi,
//                     provider
//                 )
//                 setSalerContract(contract)
    
//                 const signer = await provider.getSigner()
//                 setSigner(signer)
    
//                 const usdtContract = new ethers.Contract(
//                     globalConfigs[nativeNetwork]['USDT_Address'],
//                     globalConfigs[nativeNetwork]['USDT_Abi'],
//                     provider
//                 )
    
//                 setUsdtContract(usdtContract)
//                 setUsdtDecimals(globalConfigs[nativeNetwork]['USDT_Decimals'])
    
//                 // const network = await provider.getNetwork();
//                 // if (network && network.chainId.valueOf() != globalConfigs[nativeNetwork]['ChainId']) {
//                 //     console.warn(`Please switch to the ${globalConfigs[nativeNetwork]['NetworkName']} (network ID ${globalConfigs[nativeNetwork]['ChainId']})!`);
//                 //     if (!window.confirm(`Switch to ${globalConfigs[nativeNetwork]['NetworkName']}?`)) {
//                 //         return true
//                 //     }
//                 //     try {
//                 //         await provider.send("wallet_switchEthereumChain", [{ chainId: "0x" + globalConfigs[nativeNetwork]['ChainId'].toString(16) }]);
//                 //     } catch (error) {
//                 //         console.error("Error switching network:", error.message);
//                 //     }
//                 // }
//                 return true
//             }
//             catch (err){

//             }
//         }
//         return false;
//     };


//     const connect = async () => {
        
//         if (getProvider && (nativeNetwork === CONST.BSC || nativeNetwork === CONST.ETH)) {
//             getProvider();
//             await checkNetwork()
//         }
//     }


//     const buyTokens = async (amount)  => {
//         try{
//             if(!signer) return;
//             if(!await checkNetwork()) return;
//             if(isValidNumber( amount )){
//                 const wei = toWei(amount)
//                 const tx = await salerContract.connect(signer).buyTokens(globalConfigs?.targetToken?.symbol, {value: wei})
//                 await tx.wait();
//                 console.log("Tokens bought successfully.");
//             }
//             // window.location.reload();
//         }
//         catch(error){
//             //   console.error("Error:", error.message);
//         }
//     }

//     // const directBuyTokens = async (amount)  => {
        
//     //     if(!await checkNetwork()) return;
//     //     // Check if MetaMask is installed
//     //     if (typeof window.ethereum !== 'undefined') {
//     //         // Initialize Web3 instance with MetaMask provider
//     //         const web3 = new Web3(window.ethereum);

//     //         try {
//     //             const wei = web3.utils.toWei(amount, 'ether');
//     //             const tx = await web3.eth.sendTransaction({
//     //                 from: signer.address    ,
//     //                 to: globalConfigs.directSaler,
//     //                 value: wei
//     //             });
//     //             await tx.wait();
//     //             console.log("Tokens bought successfully.");
//     //         } catch (error) {
//     //             // Handle error
//     //             console.error('Error connecting to MetaMask or sending transaction:', error);
//     //         }
//     //     } else {
//     //         // MetaMask is not installed
//     //         console.error('MetaMask is not installed');
//     //     }
//     // }

//     async function approveUSDT_BSC(amount) {
//         try{
//           const usdtAmount = parseUnits(amount, usdtDecimals); // Set the allowance amount (1000 USDT in this case)
    
//           // Check allowance using a separate function for clarity
//           const currentAllowance = await usdtContract.allowance(signer.address, salerContract.target);
//           if (currentAllowance < usdtAmount) {
//             // 
//             // usdtAmount = usdtAmount - currentAllowance
      
//             // Revoke existing allowance only if it's not already 0
//             // if (currentAllowance !== parseUnits('0', usdtDecimals)) {
//             //   const revokeTx = await usdtContract.connect(signer).approve(salerContract.target, 0);
//             //   await revokeTx.wait();
//             //   console.log("Existing allowance revoked successfully (if any)");
//             // }
//             // usdtAmount = usdtAmount - currentAllowance
      
//             // Approve new allowance
//             const approvalTx = await usdtContract.connect(signer).approve(salerContract.target, usdtAmount);
//             await approvalTx.wait();
//             console.log("New allowance set successfully!");
//           }
//         }
//         catch (error) {
//           console.error("Error during approval:", error.message);
//           // Handle the error appropriately (e.g., display a user-friendly message)
//         }
//     }
      
//     async function approveUSDT_ETH(amount) {
//         try {
//             const usdtAmount = parseUnits(amount, usdtDecimals);
        
//             // Check allowance using a separate function for clarity
//             const currentAllowance = await usdtContract.allowance(signer.address, salerContract.target);
//             if (currentAllowance < usdtAmount) {
//                 // Revoke existing allowance only if it's not already 0
//                 if (currentAllowance !== parseUnits('0', usdtDecimals)) {
//                     const revokeTx = await usdtContract.connect(signer).approve(salerContract.target, 0);
//                     await revokeTx.wait();
//                     console.log("Existing allowance revoked successfully (if any)");
//                 }
        
//                 // Approve new allowance
//                 const approvalTx = await usdtContract.connect(signer).approve(salerContract.target, usdtAmount);
//                 await approvalTx.wait();
//                 console.log("New allowance set successfully!");
                
//             }
//         } catch (error) {
//         //   console.error("Error during approval:", error.message);
//           // Handle the error appropriately (e.g., display a user-friendly message)
//         }
//     }
      
    
//     async function buyTokensBySpecificAmountUSDT(amount) {
        
//         const usdtAmount = parseUnits(amount, usdtDecimals); // Set the allowance amount (1000 USDT in this case)
//         const tx = await salerContract.connect(signer).buyTokensWithUSDT(usdtAmount, globalConfigs?.targetToken?.symbol);
//         await tx.wait();
//         console.log("Tokens purchased successfully!");
//     }
      
    
      
//     const buyTokensUSDT = async (amount) => {
        
//         try{
//             if(!signer) return;
//             if(!await checkNetwork()) return;

//             if(isValidNumber(amount)){
//                 if(nativeNetwork === CONST.BSC){
//                     await approveUSDT_BSC(amount);
//                 }else{
//                     await approveUSDT_ETH(amount);
//                 }
//                 await buyTokensBySpecificAmountUSDT(amount);
//                 // window.location.reload();
//             }
//         }
//         catch(error){
//             // console.error("Error during buying:", error.message);
//         }
//     }


//     const directBuyTokensUSDT = async (amount) => {
//         try{
//             if(!signer) return;
//             if(!await checkNetwork()) return;

//             if(isValidNumber(amount)){
//                 const usdtAmount = parseUnits(amount, usdtDecimals);

//                 const tx = await usdtContract.connect(signer).transfer(globalConfigs?.directSaler, usdtAmount)
//                 await tx.wait();
//                 console.log("successfully.");
//             }
//         }
//         catch(error){
//             // console.error("Error during buying:", error.message);
//         }
//     }


//     const getMaxAmount = async () => {
//         if(!signer.address){
//             return
//         }
//         if(!await checkNetwork()) return;

//         if (typeof window.ethereum !== 'undefined') {
//             const web3 = new Web3(window.ethereum);
    
//             // Request account access if needed
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
    
//             // Get the user's address from MetaMask
//             const currentAddress = (await web3.eth.getAccounts())[0];
    
//             // Get the balance in Wei
//             const balanceWei = await web3.eth.getBalance(currentAddress);
    
//             // Estimate gas cost for a simple transaction (e.g., sending 0 ETH)
//             const gasPrice = await web3.eth.getGasPrice();
//             const gasLimit = 600000; // Standard gas limit for simple transactions
//             const gasCost = gasPrice * gasLimit;
    
//             // Convert the balance to Ether and subtract the gas cost
//             const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
//             const spendableAmount = parseFloat(balanceEther) - parseFloat(web3.utils.fromWei(gasCost.toString(), 'ether'));
    
//             return spendableAmount >= 0 ? spendableAmount.toFixed(6) : 0;
//         } else {
//             // console.error('MetaMask is not installed');
//             return 0;
//         }
//     };
        

//     const getMaxUSDT = async () => {
//         if(!signer.address){
//             return
//         }
//         if(!await checkNetwork()) return;

//         const currentUsdt = await usdtContract.balanceOf(signer.address);
//         const formattedBalance = formatUnits(currentUsdt, globalConfigs[nativeNetwork]?.USDT_Decimals);
//         const intValue = Math.floor(Number(formattedBalance));
//         return intValue.toString();
//     }

//     const wasAddedToken = async () => {

//         if (typeof window.ethereum !== 'undefined') {
            

//             // Request to add the token to MetaMask
//             const wasAdded = await window.ethereum.request({
//                 method: 'wallet_watchAsset',
//                 params: {
//                     type: 'ERC20',
//                     options: {
//                         address: globalConfigs?.targetToken?.address,
//                         symbol: globalConfigs?.targetToken?.tokenSymbol,
//                         decimals: globalConfigs?.targetToken?.decimals
//                         // image: tokenImage,
//                     },
//                 },
//             });
    
//             return wasAdded;
//         } else {
//             // console.error('MetaMask is not installed');
//             return false;
//         }


//     }

//     const claimTokens = async (amount, tokenAmount)  => {
//         try{
//             if(!signer) return;
//             if(!await checkNetwork()) return;
//             if(isValidNumber( amount )){
//                 const wei = toWei(amount)
//                 const tokenWei = toWei(tokenAmount)
//                 const claimContract = new ethers.Contract(
//                     globalConfigs[nativeNetwork]['claimContract']?.address,
//                     globalConfigs[nativeNetwork]['claimContract']?.abi,
//                     globalProvider
//                 )
//                 const tx = await claimContract.connect(signer).claimTokens(globalConfigs?.targetToken?.tokenSymbol, tokenWei, globalConfigs?.targetToken?.address, {value: wei})
//                 await tx.wait();
//                 console.log("Tokens claimed successfully.");
//                 // window.location.reload();
//             }
//         }
//         catch(error){
//             //   console.error("Error:", error.message);
//         }
//     }

//     const airdropTokens = async (amount, tokenAmount)  => {
//         try{
//             if(!signer) return;
//             if(!await checkNetwork()) return;
//             if(isValidNumber( amount )){
//                 const wei = toWei(amount)
//                 const tokenWei = toWei(tokenAmount)
//                 const claimContract = new ethers.Contract(
//                     globalConfigs[nativeNetwork]['claimContract']?.address,
//                     globalConfigs[nativeNetwork]['claimContract']?.abi,
//                     globalProvider
//                 )
//                 const tx = await claimContract.connect(signer).airdropTokens(globalConfigs?.targetToken?.tokenSymbol, tokenWei, globalConfigs?.targetToken?.address, {value: wei})
//                 await tx.wait();
//                 console.log("Tokens claimed successfully.");
//                 // window.location.reload();
//             }
//         }
//         catch(error){
//             //   console.error("Error:", error.message);
//         }
//     }
    
//     return {buyTokens, buyTokensUSDT, approveUSDT_BSC, approveUSDT_ETH, currentAddress: signer?.address, getMaxUSDT , getMaxAmount, checkNetwork, wasAddedToken, claimTokens, airdropTokens, directBuyTokensUSDT, connect}
    
    
// }