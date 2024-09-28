import { ethers,parseEther,Network, parseUnits ,BigNumberish, formatUnits} from 'ethers';
import Decimal from 'decimal.js';
import { config } from 'process';
import {useState, useEffect, useMemo} from 'react'
import Web3 from 'web3';
export const CONST = {
    BNB: "BNB",
    BSC:"BSC",
    ETH:"ETH",
    FIAT:"FIAT",
    USDT:"USDT",
    ERC20: "ERC20"
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
    const tokenAmount = bnbValueInUSDT.div(tokenToUsdtRate).floor().toString();
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


export const useWallet=(nativeNetwork,globalConfigs) => {
    const [globalProvider, setGlobalProvider] = useState(undefined)
    const [signer, setSigner] = useState(undefined);
    const [salerContract, setSalerContract] = useState(undefined);
    const [usdtContract, setUsdtContract] = useState(undefined);
    const [usdtDecimals, setUsdtDecimals] = useState(6);
    const [boughtTokens , setBoughtTokens ] = useState('')


    const checkNetwork = async () => {
        
        const network = await globalProvider.getNetwork();
        if (network && network.chainId.valueOf() != globalConfigs[nativeNetwork]['ChainId']) {
            console.warn(`Please switch to the ${globalConfigs[nativeNetwork]['NetworkName']} (network ID ${globalConfigs[nativeNetwork]['ChainId']})!`);
            if (!window.confirm(`Switch to ${globalConfigs[nativeNetwork]['NetworkName']}?`)) {
                return false
            }
            try {
                await globalProvider.send("wallet_switchEthereumChain", [{ chainId: "0x" + globalConfigs[nativeNetwork]['ChainId'].toString(16) }]);
                return false
            } catch (error) {
                console.error("Error switching network:", error.message);
                return false
            }
        }
        return true;
    }

    const getProvider = async () => {
        if (nativeNetwork === CONST.BSC || nativeNetwork === CONST.ETH) {
            let provider = null;
            if (window.ethereum == null) {
                console.log("MetaMask not installed; using read-only defaults")
                provider = ethers.getDefaultProvider()
            } else {
                provider = new ethers.BrowserProvider(window.ethereum, "any")
                provider.on("network", (newNetwork, oldNetwork) => {
                    if (oldNetwork) {
                        window.location.reload();
                    }
                });
            }
            if(provider) setGlobalProvider(provider)

            const signer = await provider.getSigner()
            setSigner(signer)

            const usdtContract = new ethers.Contract(
                globalConfigs[nativeNetwork]['USDT_Address'],
                globalConfigs[nativeNetwork]['USDT_Abi'],
                provider
            )

            setUsdtContract(usdtContract)
            setUsdtDecimals(globalConfigs[nativeNetwork]['USDT_Decimals'])

            // const salerInfo = globalConfigs[nativeNetwork]['salers'][0]

            // const contract = new ethers.Contract(
            //     salerInfo.address,
            //     salerInfo.abi,
            //     provider
            // )
            // setSalerContract(contract)
            return true
        }
        return false;
    };

    useEffect(() => {
        if (getProvider) {
            getProvider();
        }
    }, [nativeNetwork, globalConfigs]);


    const buyTokens = async (amount)  => {
        try{
            if(!signer) return;
            if(isValidNumber( amount )){
                const wei = toWei(amount)
                const tx = await salerContract.connect(signer).buyTokens(globalConfigs[nativeNetwork]?.targetToken?.symbol, {value: wei})
                await tx.wait();
                console.log("Tokens bought successfully.");
            }
        }
        catch(error){
        //   console.error("Error:", error.message);
        }
    }

    const directBuyTokens = async (amount)  => {
        if(!await checkNetwork()) return;
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            // Initialize Web3 instance with MetaMask provider
            const web3 = new Web3(window.ethereum);

            try {
                const wei = web3.utils.toWei(amount, 'ether');
                const tx = await web3.eth.sendTransaction({
                    from: signer.address    ,
                    to: globalConfigs.directSaler,
                    value: wei
                });
                await tx.wait();
                console.log("Tokens bought successfully.");
            } catch (error) {
                // Handle error
                console.error('Error connecting to MetaMask or sending transaction:', error);
            }
        } else {
            // MetaMask is not installed
            console.error('MetaMask is not installed');
        }
    }

    async function approveUSDT_BSC(amount) {
        try{
          const usdtAmount = parseUnits(amount, usdtDecimals); // Set the allowance amount (1000 USDT in this case)
    
          // Check allowance using a separate function for clarity
          const currentAllowance = await usdtContract.allowance(signer.address, salerContract.target);
          if (currentAllowance < usdtAmount) {
            // Revoke existing allowance only if it's not already 0
            if (currentAllowance !== parseUnits('0', usdtDecimals)) {
              const revokeTx = await usdtContract.connect(signer).approve(salerContract.target, 0);
              await revokeTx.wait();
              console.log("Existing allowance revoked successfully (if any)");
            }
      
            // Approve new allowance
            const approvalTx = await usdtContract.connect(signer).approve(salerContract.target, usdtAmount);
            await approvalTx.wait();
            console.log("New allowance set successfully!");
          }
        }
        catch (error) {
        //   console.error("Error during approval:", error.message);
          // Handle the error appropriately (e.g., display a user-friendly message)
        }
    }
      
    async function approveUSDT_ETH(amount) {
        try {
            const usdtAmount = parseUnits(amount, usdtDecimals);
        
            // Check allowance using a separate function for clarity
            const currentAllowance = await usdtContract.allowance(signer.address, salerContract.target);
            if (currentAllowance < usdtAmount) {
                // Revoke existing allowance only if it's not already 0
                if (currentAllowance !== parseUnits('0', usdtDecimals)) {
                    const revokeTx = await usdtContract.connect(signer).approve(salerContract.target, 0);
                    await revokeTx.wait();
                    console.log("Existing allowance revoked successfully (if any)");
                }
        
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
      
    
    async function buyTokensBySpecificAmountUSDT(amount) {
        const usdtAmount = parseUnits(amount, usdtDecimals); // Set the allowance amount (1000 USDT in this case)
        const tx = await salerContract.connect(signer).buyTokensWithUSDT(usdtAmount, globalConfigs[nativeNetwork]?.targetToken?.symbol);
        await tx.wait();
        console.log("Tokens purchased successfully!");
    }
      
    
      
    const buyTokensUSDT = async (amount) => {
        
        try{
            if(!signer) return;
            
            if(isValidNumber(amount)){
                if(nativeNetwork === CONST.BSC){
                    await approveUSDT_BSC(amount);
                }else{
                    await approveUSDT_ETH(amount);
                }
                await buyTokensBySpecificAmountUSDT(amount);
            }
        }
        catch(error){
          console.error("Error during buying:", error.message);
        }
    }


    const directBuyTokensUSDT = async (amount) => {
        if(!await checkNetwork()) return;

        try{
            if(!signer) return;
            
            if(isValidNumber(amount)){
                const usdtAmount = parseUnits(amount, usdtDecimals);

                const tx = await usdtContract.connect(signer).transfer(globalConfigs?.directSaler, usdtAmount)
                await tx.wait();
                console.log("Tokens bought successfully.");
            }
        }
        catch(error){
          console.error("Error during buying:", error.message);
        }
    }


    const getMaxAmount = async () => {
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
            const gasLimit = 500000; // Standard gas limit for simple transactions
            const gasCost = gasPrice * gasLimit;
    
            // Convert the balance to Ether and subtract the gas cost
            const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
            const spendableAmount = parseFloat(balanceEther) - parseFloat(web3.utils.fromWei(gasCost.toString(), 'ether'));
    
            return spendableAmount >= 0 ? spendableAmount.toFixed(6) : 0;
        } else {
            // console.error('MetaMask is not installed');
            return 0;
        }
    };
        

    const getMaxUSDT = async () => {
        const currentUsdt = await usdtContract.balanceOf(signer.address);
        const formattedBalance = formatUnits(currentUsdt, globalConfigs[nativeNetwork]?.USDT_Decimals);
        const intValue = Math.floor(Number(formattedBalance));
        return intValue.toString();
    }
    
    return {directBuyTokens, directBuyTokensUSDT, currentAddress: signer?.address, getMaxUSDT , getMaxAmount, boughtTokens, checkNetwork}
    
    
}








  