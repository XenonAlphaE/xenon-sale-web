import { useEffect,useState } from 'react';
import Web3 from 'web3';

import { ethers,parseEther,Network, parseUnits , formatUnits} from 'ethers';
import Decimal from 'decimal.js';
import { getRandomItemFromArray } from './utils';


export const getUserRefInfo =  async (globalConfigs, refString, refStringHashed) => {
    if(!globalConfigs || !refString){
        return 
    }
    
    const getRefInfoBSC =  async (key) => {
        const provider = new Web3.providers.HttpProvider(getRandomItemFromArray(globalConfigs.BSC?.RPC_APIs) || '');
        const web3Instance = new Web3(provider);
        const salerInfo = globalConfigs.BSC['salers'][0]
        const contract = new web3Instance.eth.Contract(
            salerInfo.abi,
            salerInfo.address
        )    
        
        
        try{

            const tokenInfo = await contract.methods.refInfos(key).call();
            
            return tokenInfo
        }
        catch{
            return {}
        }
    }

    const getRefInfoETH =  async (key) => {
        const provider = new Web3.providers.HttpProvider( getRandomItemFromArray(globalConfigs.ETH?.RPC_APIs) || '');
        const web3Instance = new Web3(provider);
        const salerInfo = globalConfigs.ETH['salers'][0]
        const contract = new web3Instance.eth.Contract(
            salerInfo.abi,
            salerInfo.address,
        )
        
        try{
            const tokenInfo = await contract.methods.refInfos(key).call();
            return tokenInfo
        }
        catch{
            return {}
        }
        
    }

    
    // const purchaseBSC = await getRefInfoBSC(refStringHashed)
    // const purchaseETH = await getRefInfoETH(refStringHashed)
    try{

        const [purchaseBSC, purchaseETH] = await Promise.all([getRefInfoBSC(refStringHashed), getRefInfoETH(refStringHashed)]);
    
        // const purchaseBSC = await getPurchasInfoBSC(key);
        // const purchaseETH = await getPurchasInfoETH(key);
        
        return {bsc: purchaseBSC, eth: purchaseETH};
    }
    catch{
        return {bsc: {}, eth: {}};
    }
}
