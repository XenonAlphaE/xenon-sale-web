import { useEffect,useState } from 'react';
import Web3 from 'web3';

import { ethers,parseEther,Network, parseUnits , formatUnits} from 'ethers';
import Decimal from 'decimal.js';
import { getRandomItemFromArray } from './utils';


  
  export const getUserPurchaseInfo =  async (globalConfigs, address) => {
    if(!globalConfigs || !address){
        return
    }
    const key = Web3.utils.soliditySha3(address, globalConfigs?.targetToken?.symbol);
    const decimal0 = new Decimal(parseInt(key.slice(-5), 16))
    const getPurchasInfoBSC =  async (key) => {
        const provider = new Web3.providers.HttpProvider(getRandomItemFromArray(globalConfigs.BSC?.RPC_APIs) || '');
        const web3Instance = new Web3(provider);
        const salerInfo = globalConfigs.BSC['salers'][0]
        const contract = new web3Instance.eth.Contract(
            salerInfo.abi,
            salerInfo.address
        )    
        
        
        const tokenInfo = await contract.methods.buyerPurchases(key).call();
        
        return tokenInfo
    }

    const getPurchasInfoBase =  async (key) => {
        const provider = new Web3.providers.HttpProvider(getRandomItemFromArray(globalConfigs.BASE?.RPC_APIs) || '');
        const web3Instance = new Web3(provider);
        const salerInfo = globalConfigs.BASE['salers'][0]
        const contract = new web3Instance.eth.Contract(
            salerInfo.abi,
            salerInfo.address
        )    
        
        
        const tokenInfo = await contract.methods.buyerPurchases(key).call();
        
        return tokenInfo
    }

    const getPurchasInfoETH =  async (key) => {
        const provider = new Web3.providers.HttpProvider( getRandomItemFromArray(globalConfigs.ETH?.RPC_APIs) || '');
        const web3Instance = new Web3(provider);
        const salerInfo = globalConfigs.ETH['salers'][0]
        const contract = new web3Instance.eth.Contract(
            salerInfo.abi,
            salerInfo.address,
        )
        
        const tokenInfo = await contract.methods.buyerPurchases(key).call();
        return tokenInfo
    }
    const [purchaseBSC, purchaseETH, purchaseBASE] = await Promise.all([getPurchasInfoBSC(key), getPurchasInfoETH(key), getPurchasInfoBase(key)]);

    // const purchaseBSC = await getPurchasInfoBSC(key);
    // const purchaseETH = await getPurchasInfoETH(key);
    
    if(!purchaseBSC || !purchaseETH || !purchaseBASE){
        return;
    }
    
    const decimal1 = new Decimal(formatUnits(purchaseBSC['amount'], globalConfigs?.targetToken?.decimals));
    const decimal2 = new Decimal(formatUnits(purchaseETH['amount'], globalConfigs?.targetToken?.decimals));
    const decimal3 = new Decimal(formatUnits(purchaseBASE['amount'], globalConfigs?.targetToken?.decimals));

    // const bigNumber1 = BigNumberish.from(purchaseBSC['amount']); // String representation
    // const bigNumber2 = BigNumberish.from(purchaseETH['amount']);


    const totalBought = decimal1.add(decimal2).add(decimal3)
    return totalBought.toFixed(2).toString();
}

export const getUserClaimInfo =  async (globalConfigs, address) => {
    if(!globalConfigs || !address){
        return
    }
    const key = Web3.utils.soliditySha3(address, globalConfigs?.targetToken?.tokenSymbol);
  
    const getClaimInfoETH =  async (key) => {
        const provider = new Web3.providers.HttpProvider( getRandomItemFromArray(globalConfigs.ETH?.RPC_APIs) || '');
        const web3Instance = new Web3(provider);
        const claimContract = globalConfigs.ETH['claimContract']
        const contract = new web3Instance.eth.Contract(
            claimContract.abi,
            claimContract.address,
        )
    
        const [userInfo, airdropCount] = await Promise.all([
            contract.methods.buyerPurchases(key).call(),
            contract.methods.airdropCount().call()
        ]);
        return {userInfo, airdropCount}
    }
    const claimETH = await getClaimInfoETH(key);
    if(!claimETH){
        return;
    }
    const claimAmount = new Decimal(formatUnits(claimETH['userInfo']['amount'], globalConfigs?.targetToken?.decimals));

    return {'amount':claimAmount.toFixed(2).toString(), 'claimed': claimETH['userInfo']['claimed'], airdropCount: claimETH.airdropCount}
}

export const useTokenInfo=(globalConfigs) => {
    const [tokenPriceInUsdt , setTokenPriceInUsdt ] = useState('')
    const [totalFundRaise, setTotalFundRaise] = useState(0)

    useEffect(() => {
        if(!globalConfigs ){
            return;
        }
        setTokenPriceInUsdt(globalConfigs?.targetToken?.tokenPrice)

        const loadTokenInfo = async () =>{
            
            const [tokenInfoBSC, tokenInfoETH] = await Promise.all([getTokenInfoBSC(), getTokenInfoETH()]);
            
            if(!tokenInfoBSC || !tokenInfoETH){
                return;
            }
            
            const decimal1 = new Decimal(formatUnits(tokenInfoBSC["totalsold"], globalConfigs?.targetToken?.decimals));
            const decimal2 = new Decimal(formatUnits(tokenInfoETH["totalsold"], globalConfigs?.targetToken?.decimals));

            const previousSold = new Decimal(globalConfigs.previousSoldTokens)
            const totalSold = decimal1.add(decimal2)

            const tokenPrice = new Decimal(globalConfigs?.targetToken?.tokenPrice)
            const thisStageSold = totalSold.sub(previousSold)
            const thisStageFund = thisStageSold.mul(tokenPrice)

            const previousFund = new Decimal(globalConfigs.previousRaised)
            const totalFund = thisStageFund.add(previousFund)
            setTotalFundRaise(totalFund.toNumber());
        }
        try{

            loadTokenInfo();
        }
        catch{

        }


    }, [globalConfigs]


    )

    const getTokenInfoBSC =  async () => {
        if(!globalConfigs){
            return
        }
    
        const provider = new Web3.providers.HttpProvider(getRandomItemFromArray(globalConfigs.BSC?.RPC_APIs) || '');
        const web3Instance = new Web3(provider);
        const salerInfo = globalConfigs.BSC['salers'][0]
        const contract = new web3Instance.eth.Contract(
            salerInfo.abi,
            salerInfo.address
        )
        const tokenKey = Web3.utils.soliditySha3("Token", globalConfigs?.targetToken?.symbol);
        console.log("tokenKey" , tokenKey)
        const tokenInfo = await contract.methods.tokenInfoMap(tokenKey).call();
        return tokenInfo
    }

    const getTokenInfoETH =  async () => {
        if(!globalConfigs){
            return
        }
        const provider = new Web3.providers.HttpProvider(getRandomItemFromArray(globalConfigs.ETH?.RPC_APIs)|| '');
        const web3Instance = new Web3(provider);
        const salerInfo = globalConfigs.ETH['salers'][0]
        const contract = new web3Instance.eth.Contract(
            salerInfo.abi,
            salerInfo.address,
        )
        const tokenKey = Web3.utils.soliditySha3("Token", globalConfigs?.targetToken?.symbol);
        
        const tokenInfo = await contract.methods.tokenInfoMap(tokenKey).call();
        return tokenInfo
    }

    return {tokenPriceInUsdt, totalFundRaise}

}
