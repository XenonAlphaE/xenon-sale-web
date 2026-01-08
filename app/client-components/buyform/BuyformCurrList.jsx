// ProgressBar.jsx or .tsx
import React, { useEffect, useState } from 'react';
import styles from  './buyform.module.css'
import { useI18nSection } from '../../../redux/utils/languageUtils';
import { useToggleChainsDialog } from '../../../redux/utils/dialogUtils';
import { useSiteInfo } from '../../../redux/utils/siteInfoUtils';
import { CURRENCIES } from '../../../redux/ducks/nativeNetworkDuck';
import { useNativeNetwork } from '../../../redux/utils/nativeNetworkUtils';
import { useAppSolanaWallet, useWalletERC20 } from '@herocoinhunter2/common-service';

export const BuyformCurrList = ({ selectedCurr, broadcastCurr}) => {
    const walletEth = useWalletERC20()
    const walletSol = useAppSolanaWallet()


    const [currList, setCurrList] = useState([]) 

    useEffect(()=>{
        if(walletEth && walletEth?.currentAddress){
            
            setCurrList(CURRENCIES[walletEth?.chainSymbol])

        }
    }, [walletEth?.chainId, walletEth?.chainSymbol, walletEth?.currentAddress])
      


    useEffect(()=>{
        if(walletSol&&walletSol?.connected){
            setCurrList(CURRENCIES['solana'])
        }
    }, [walletSol?.connected])


    useEffect(()=>{
        if(currList && currList.length > 0){
            broadcastCurr(currList[0])
        }
    }, [currList])
      
    const handleSwitchOption = (idx) => {
      
      const curr = currList[idx]
      broadcastCurr(curr)
  
    };
    
    if(walletSol && walletSol?.connected ){
        return (
        <div>
            <div className={styles.currenciesList}  >
                    {currList?.map((curr, idx) => {
                        return(
                            <button key={idx} onClick={() => handleSwitchOption(idx)}

                            className={`${styles.btn}  ${selectedCurr?.text === curr?.text ? styles.selected : ''}`}>
                            <img style={{height: '32px'}} src={curr.imageSrc} />
                            <span className="px-2 font-18">{curr.text}</span>
                            </button>
                        )
                    })}
                
            </div>
        </div>)

    }


    else if(walletEth && walletEth?.currentAddress){
        return (
        <div>
            <div className={styles.currenciesList}  >
                    {currList?.map((curr, idx) => {
                        return(
                            <button key={idx} onClick={() => handleSwitchOption(idx)}

                            className={`${styles.btn}  ${selectedCurr?.text === curr?.text ? styles.selected : ''}`}>
                            <img style={{height: '32px'}} src={curr.imageSrc} />
                            <span className="px-2 font-18">{curr.text}</span>
                            </button>
                        )
                    })}
                
            </div>
        </div>)
    }
  
    else{

        return (
            <div>
            </div>
        );
    }
}

