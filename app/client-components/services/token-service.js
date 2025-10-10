import { useEffect,useState } from 'react';
import Web3 from 'web3';
const {
  createMint,
  getOrCreateAssociatedTokenAccount,
  getAccount,
  getAssociatedTokenAddress,
  mintTo,
  getMint,
  TOKEN_PROGRAM_ID
} = require("@solana/spl-token");

import { ethers,parseEther,Network, parseUnits , formatUnits} from 'ethers';
import Decimal from 'decimal.js';
import { getRandomItemFromArray } from './utils';
import axios from 'axios';
import mainConfig from '../config.main'

  
export const getUserPurchaseInfo =  async (globalConfigs, address) => {
    if(!globalConfigs || !address || !globalConfigs?.ETH['purchaseInfo']){
        return
    }
    const tokenKey = Web3.utils.soliditySha3("Token", globalConfigs?.targetToken?.symbol);
    console.log("tokenKey" , tokenKey)


    const key = Web3.utils.soliditySha3(address, globalConfigs?.targetToken?.symbol);
    console.log("userKey", key)


    const getPurchasInfo =  async (key, rpc, salerInfo) => {
        const provider = new Web3.providers.HttpProvider(rpc || '');
        const web3Instance = new Web3(provider);
        const contract = new web3Instance.eth.Contract(
            salerInfo.abi,
            salerInfo.address
        )    
        const tokenInfo = await contract.methods.buyerPurchases(key).call();
        return tokenInfo
    }

    const decimal0 = new Decimal(parseInt(key.slice(-5), 16))

    const [purchaseBSC, purchaseETH, purchaseBASE, purchaseOP,purchaseARB] = await Promise.all([
            getPurchasInfo(key,getRandomItemFromArray(globalConfigs.BSC?.RPC_APIs), globalConfigs.BSC['purchaseInfo'][0]), 
            getPurchasInfo(key,getRandomItemFromArray(globalConfigs.ETH?.RPC_APIs), globalConfigs.ETH['purchaseInfo'][0]), 
            getPurchasInfo(key,getRandomItemFromArray(globalConfigs.BASE?.RPC_APIs), globalConfigs.BASE['purchaseInfo'][0]), 
            getPurchasInfo(key,getRandomItemFromArray(globalConfigs.OP?.RPC_APIs), globalConfigs.OP['purchaseInfo'][0]), 
            getPurchasInfo(key,getRandomItemFromArray(globalConfigs.ARB?.RPC_APIs), globalConfigs.ARB['purchaseInfo'][0]), 
        ]);

    // const purchaseBSC = await getPurchasInfoBSC(key);
    // const purchaseETH = await getPurchasInfoETH(key);
    
    if(!purchaseBSC || !purchaseETH || !purchaseBASE || !purchaseOP ||!purchaseARB){
        return;
    }   
    
    const decimal1 = new Decimal(formatUnits(purchaseBSC[0], globalConfigs?.targetToken?.decimals));
    const decimal2 = new Decimal(formatUnits(purchaseETH[0], globalConfigs?.targetToken?.decimals));
    const decimal3 = new Decimal(formatUnits(purchaseBASE[0], globalConfigs?.targetToken?.decimals));
    const decimal4 = new Decimal(formatUnits(purchaseOP[0], globalConfigs?.targetToken?.decimals));
    const decimal5 = new Decimal(formatUnits(purchaseARB[0], globalConfigs?.targetToken?.decimals));

    // const bigNumber1 = BigNumberish.from(purchaseBSC['amount']); // String representation
    // const bigNumber2 = BigNumberish.from(purchaseETH['amount']);
    const stakedAmount = new Decimal(formatUnits(purchaseETH[1], globalConfigs?.targetToken?.decimals));


    const totalBought = decimal1.add(decimal2).add(decimal3).add(decimal4).add(decimal5);

    const stakeableAmount = Decimal.max(0, totalBought.sub(stakedAmount));
    
    return  {   totalBought: totalBought.toString(),
                stakedAmount: stakedAmount.toString(),
                stakeableAmount: stakeableAmount.toString()
            };
}

export const getUserClaimInfo =  async (globalConfigs, address) => {
    if(!globalConfigs || !address){
        return
    }
    const key = Web3.utils.soliditySha3(address, globalConfigs?.targetToken?.tokenSymbol);
    console.log("userKey", key)
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



export const getSolanaPriceSignature = async () => {
    // API for oracle price server
    const OraclePriceAPI = axios.create({
        baseURL: mainConfig.solana.priceSignatureEndpoint
    });

    const signatureData = await OraclePriceAPI.post(
        "/api/solana/price",   // <-- must be string (relative path)
        {
            "symbol": mainConfig.targetToken.symbol,
            "decimals": mainConfig.solana.USDT_Decimals
        }
    )

    return signatureData?.data ?? null
}


export const signPurchaseInfo = async ({purchaseSignatureEndpoint, key, tokenPrice, buyAmount, deltaStake}) => {
    
    const OraclePriceAPI = axios.create({
        baseURL: purchaseSignatureEndpoint
    });

    const signatureData = await OraclePriceAPI.post(
        "/api/eth/sign",   // <-- must be string (relative path)
        {
            key,
            tokenPrice: tokenPrice.toString(),
            buyAmount: buyAmount.toString(),
            deltaStake: deltaStake.toString()
        }
    )
    console.log("Type:", signatureData.constructor.name);

    
    console.log("Status:", signatureData.status);
    console.log("Headers:", signatureData.headers);
    console.log("Response data:", signatureData.data);


    return signatureData?.data ?? null




}