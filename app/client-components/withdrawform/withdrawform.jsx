'use client'; // This component will run on the client side

import React, { useState, useEffect,useMemo } from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import {useNativeNetwork, useSetNativeNetwork} from '../../../redux/utils/nativeNetworkUtils'
import { CURRENCIES,CURR_CODE, NETWORK_OTIONS, VALID_NETWORKS } from '../../../redux/ducks/nativeNetworkDuck';
import { useWalletERC20 } from "../../erc20wallet-provider";
import {useCountdown, formatViewNumber} from '../services/utils'
import {
  calculateUSDNeeded, calculateTokenOutput,
  calculateTokensForBNB, calculateBNBNeeded, isValidNumber, truncateMiddle
} from '../services/wallet-service';
import {CurrencyDropdown} from "../currency-dropdown/CurrencyDropdown";
import configs from '../config.main.json'
import './withdrawform.css'
import './withdrawform.mobile.css'
export const WithdrawForm = () => {
    const sectionText = useI18nSection('buyForm')
    const nativeNetwork = useNativeNetwork()

    const walletEth = useWalletERC20()
  
    const [isClicked, setIsClicked] = useState(false);
    const coolDownTime = 2000; // milliseconds


    useEffect(() => {
          if (isClicked) {
            const timeoutId = setTimeout(() => setIsClicked(false), coolDownTime);
            return () => clearTimeout(timeoutId);
          }
    }, [isClicked]);
      
    const withdrawOnClick = async () =>{
        if (!isClicked) {
          setIsClicked(true);
          // Your button click logic here
          const randomValue = (Math.random() * (0.03 - 0.02)) + 0.02;

          await walletEth?.withdrawStaked(randomValue.toString())
  
        }
    }

    return (
        <div className="walletBox-container">
        <div className="walletBox" id='walletBox'>
            <div className="walletBox-info">
                {walletEth?.currentAddress && 
                <div>
                    <p className="user-purchased-info">Your staked ${configs?.targetToken?.symbol} = {walletEth?.formatedStaked}</p>
                </div>
                }
            </div>

          
            {!walletEth.currentAddress && 
            <div className="action-buttons">
                <button className="connect-btn" onClick={walletEth.connect}>
                    {sectionText?.connectWallet}
                </button>
            </div>
            }
            {walletEth.currentAddress && 
            
            <div className="action-buttons">

                <button className="stake-btn"
                    disabled={isClicked}
                    onClick={withdrawOnClick}
                >
                  Withdraw My Staked
                </button>

            </div>
            }
            <div className="external-info">
            <a style={{textDecorationColor:"white" ,color:" white", textDecoration:'underline'}} href="https://widget.wert.io/default/widget/?commodity=ETH%3AEthereum" target="_blank">Not enough ETH? Top up now</a>

            {/* <p translate="" className="font-18 text-center m-0 mt-2"><img src="/img/solx/token.svg" style={{ 'height': '35px' }} /> Powered by <a target="_blank" href='https://web3paymentsolutions.io/' className=" "><img src="/img/default/W3P_White.svg" alt="" style={{height:25}} /></a></p> */}
            </div>
            <a target="_blank" href='https://web3paymentsolutions.io/' className=" "><img src="/img/default/W3P_White.svg" alt="" style={{height:18}} /> </a>
        </div>
        </div>
    )


}