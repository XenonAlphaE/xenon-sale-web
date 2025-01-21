'use client'; // This component will run on the client side

import React, { useState, useEffect,useMemo } from "react";
import {ProgressBar} from './ProgressBar'
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import {useNativeNetwork, useSetNativeNetwork} from '../../../redux/utils/nativeNetworkUtils'
import { CURRENCIES,CURR_CODE, NETWORK_OTIONS, VALID_NETWORKS } from '../../../redux/ducks/nativeNetworkDuck';
import { useWalletERC20 } from "../../erc20wallet-provider"; 
import {useCountdown} from '../services/utils'
import {
  calculateUSDNeeded, calculateTokenOutput,
  calculateTokensForBNB, calculateBNBNeeded, isValidNumber, truncateMiddle
} from '../services/wallet-service';
import { useTokenInfo, getUserPurchaseInfo } from '../services/token-service';
import {CurrencyDropdown} from "../currency-dropdown/CurrencyDropdown";
import configs from '../config.main.json'
import './claimform.css'
import './claimform.mobile.css'
export const ClaimForm = () => {
    const sectionText = useI18nSection('buyForm')
    const nativeNetwork = useNativeNetwork()

    const walletEth = useWalletERC20()
    const currList = CURRENCIES[nativeNetwork]
    const [selectedCurr, setSelectedCurr] = useState();
  
  

    const tokenInfo = useTokenInfo(configs)
    
  
    useEffect(()=>{
        setSelectedCurr(currList[0])
        setTokenInput('')
        setCurrencyInput('')
    }, [currList])
  
  
    
  
    // const [network, setNetwork] = useState("")
    // const [networkPrice, setNetworkPrice] = useState(0);
    const [totalBought, setTotalBought] = useState(0);
  
  
    const { days, hours, minutes, seconds } = useCountdown();
    // const wallet = useWallet(network, configs);
    const [tokenInput, setTokenInput] = useState('');
  
    const [isClicked, setIsClicked] = useState(false);
    const coolDownTime = 2000; // milliseconds
  
  
    useEffect(() => {
      if (isClicked) {
        const timeoutId = setTimeout(() => setIsClicked(false), coolDownTime);
        return () => clearTimeout(timeoutId);
      }
    }, [isClicked]);
  
    useEffect(() => {
     
  
      const loadPurchaseInfo = async () => {
        if (!walletEth.currentAddress) {
          return;
        }
  
        try {
          
          const info = await getUserPurchaseInfo(configs, walletEth.currentAddress)
          if (info) {
            setTotalBought(info)
          }
        }
        catch (err) {
  
        }
      }
      loadPurchaseInfo()
    }, [walletEth.currentAddress, configs]); // Empty dependency array ensures this effect runs only once
  
  
    const handleTokenInputChange = (event) => {
      const { value } = event.target;
      if (value === "") {
        setTokenInput(value);
        setCurrencyInput("")
        return
      }
      if (!tokenInfo?.tokenPriceInUsdt) {
        return
      }
      // Regular expression to allow only numeric and float values
      if (/^\d*\.?\d*$/.test(value) && isValidNumber(value)) {
          setTokenInput(value);
          if (selectedCurr.curr === CURR_CODE.BNB || selectedCurr.curr === CURR_CODE.ETH) {
            setCurrencyInput(calculateBNBNeeded(value, selectedCurr.curr === CURR_CODE.BNB ? walletEth?.bnbPrice : walletEth?.ethPrice , tokenInfo?.tokenPriceInUsdt))
          }
          else {
            setCurrencyInput(calculateUSDNeeded(value, tokenInfo?.tokenPriceInUsdt))
          }
      }
    };
  
    const [currencyInput, setCurrencyInput] = useState('');
  
    const handleCurrencyInputChange = (event) => {
      
      const { value } = event.target;
      if (value === "") {
        setTokenInput("");
        setCurrencyInput(value)
        return
      }
      if (!tokenInfo?.tokenPriceInUsdt) {
        return
      }
      // Regular expression to allow only numeric and float values
      if (/^[0-9]*[.]?[0-9]*$/.test(value) && isValidNumber(value)) {
        setCurrencyInput(value);
        if (selectedCurr.curr === CURR_CODE.BNB || selectedCurr.curr === CURR_CODE.ETH) {
          setTokenInput(calculateTokensForBNB(value, selectedCurr.curr === CURR_CODE.BNB ? walletEth?.bnbPrice : walletEth?.ethPrice , tokenInfo?.tokenPriceInUsdt))
        }
        else {
          setTokenInput(calculateTokenOutput(value, tokenInfo?.tokenPriceInUsdt))
        }
      }
    };
  
    const handleBuyTokenClick = async () => {
      
      if (!isClicked) {
        setIsClicked(true);
        // Your button click logic here
        if (selectedCurr.curr === CURR_CODE.BNB || selectedCurr.curr === CURR_CODE.ETH) {
            await walletEth?.buyTokensWithRef(currencyInput, "")
        }
        else {
            await walletEth?.buyTokensUSDTWifRef(currencyInput, "");
        }
      }
  
    }
  
    const handleKeyPressCurr = (event) => {
      // Allow the dot character (.) only if it doesn't already exist in the input value
      if (event.key === '.' && currencyInput.includes('.')) {
        event.preventDefault();
      }
    };
  
    const handleKeyPressToken = (event) => {
      // Allow the dot character (.) only if it doesn't already exist in the input value
      if (event.key === '.' && tokenInput.includes('.')) {
        event.preventDefault();
      }
    };
  
  
    const handleSwitchOption = (idx) => {
      
      const curr = currList[idx]
      setSelectedCurr(curr)
  
      setTokenInput('')
      setCurrencyInput('')
  
    };

    const handleClaimToken = async() => {
      if (!isClicked) {
        setIsClicked(true);
        walletEth.claimTokens(walletEth.maxAmount, totalBought)
      }
    }
  
    const addTokenToWallet  = () => {
      walletEth.wasAddedToken()
    }
  
    return (
        <div className="walletBox" id='walletBox'>
            <div className="walletBox-info">
            <p className="walletBox-heading">PRESALE HAS ENDED</p>
            <div className="dashTitle">1 ${configs?.targetToken?.symbol} = ${configs?.targetToken?.tokenPrice} </div>
           
            {/* <ProgressBar percentage={11457475.67*100 / 11540268}  /> */}

            <p className="total-raised">{sectionText?.funRaised}:  $58,795,908.72 / $70,000,000</p>
            {walletEth.currentAddress && 
              <div>
                <p className="user-purchased-info">{sectionText.boughtAmount} ${configs?.targetToken?.symbol} = {totalBought}</p>
                <p className="user-purchased-info">{sectionText.stakeableAmount} ${configs?.targetToken?.symbol} = {totalBought}</p>
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
                <button className="buy-btn"
                    disabled={isClicked}
                    onClick={handleClaimToken}
                >
                    CLAIM MY $WEPE TOKEN
                </button>
                {/* <CurrencyDropdown walletETH={walletEth} /> */}

                <p
                className="addtoken-btn"
                    disabled={isClicked}
                    onClick={addTokenToWallet}
                >
                    ADD TOKEN TO WALLET
                </p>

            </div>
            }
            <div className="external-info">
            <a style={{textDecorationColor:"#000" ,color:"#000", textDecoration:'underline'}} href="https://widget.wert.io/default/widget/?commodity=ETH%3AEthereum" target="_blank">Not enough ETH? Top up now</a>

            <p translate="" className="font-18 text-center m-0 mt-2"><img src="/img/wepe/token.svg" style={{ 'height': '35px' }} /> Powered by <a target="_blank" href='https://web3paymentsolutions.io/' className=" "><img src="/img/flockers/W3P_Black.svg" alt="" style={{height:25}} /></a></p>
            </div>
        </div>
            
    )


}