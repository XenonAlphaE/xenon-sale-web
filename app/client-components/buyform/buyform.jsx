'use client'; // This component will run on the client side

import React, { useState, useEffect,useMemo } from "react";
import {ProgressBar} from './ProgressBar'
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import {useNativeNetwork, useSetNativeNetwork} from '../../../redux/utils/nativeNetworkUtils'
import { CURRENCIES,CURR_CODE, NETWORK_OTIONS, VALID_NETWORKS } from '../../../redux/ducks/nativeNetworkDuck';
import {useCountdown, formatViewNumber, formatIntNumber} from '../services/utils'
import {
  calculateUSDNeeded, calculateTokenOutput,
  calculateTokensForBNB, calculateBNBNeeded, isValidNumber, truncateMiddle
} from '../services/wallet-service';
import {CurrencyDropdown} from "../currency-dropdown/CurrencyDropdown";
import styles from  './buyform.module.css'
import SolanaLabel from "../solana-ui/SolanaLabel/SolanaLabel";
import { useGlobalConfig } from "../../globalConfig-provider";
import { useAppSolanaWallet, useWalletERC20 } from "@herocoinhunter2/common-service";
import { BuyformConnectButton } from "./BuyformConnectButton";
import { BuyformCurrList } from "./BuyformCurrList";
import { PurchaseAmounts } from "./BuyformPurchaseAmounts";
import { useSiteInfo } from "../../../redux/utils/siteInfoUtils";
export const BuyForm = () => {
    const sectionText = useI18nSection('buyForm')
    const siteInfo = useSiteInfo()
    const walletEth = useWalletERC20()
    const walletSol = useAppSolanaWallet()
    const [selectedCurr, setSelectedCurr] = useState();
    const isWalletConnected  = (walletEth && walletEth?.currentAddress) || (walletSol && walletSol?.connected )
  
    useEffect(()=>{
        setTokenInput('')
        setCurrencyInput('')
    }, [selectedCurr])
  
  
    
    const { days, hours, minutes, seconds } = useCountdown();
    const [tokenInput, setTokenInput] = useState('');
  
    const [isClicked, setIsClicked] = useState(false);
    const coolDownTime = 2000; // milliseconds
  


  
    useEffect(() => {
      if (isClicked) {
        const timeoutId = setTimeout(() => setIsClicked(false), coolDownTime);
        return () => clearTimeout(timeoutId);
      }
    }, [isClicked]);
  
    const handleTokenInputChange = (event) => {
      const { value } = event.target;
      if (value === "") {
        setTokenInput(value);
        setCurrencyInput("")
        return
      }
      if (!walletEth?.tokenPriceInUsdt) {
        return
      }
      // Regular expression to allow only numeric and float values
      if (/^\d*\.?\d*$/.test(value) && isValidNumber(value)) {
          setTokenInput(value);
          if (selectedCurr.curr === CURR_CODE.BNB || selectedCurr.curr === CURR_CODE.ETH) {
            setCurrencyInput(calculateBNBNeeded(value, selectedCurr.curr === CURR_CODE.BNB ? walletEth?.bnbPrice : walletEth?.ethPrice , walletEth?.tokenPriceInUsdt))
          }
          else if (selectedCurr.curr === CURR_CODE.SOL) {
            setCurrencyInput(calculateBNBNeeded(value, walletSol?.solanaPrice , walletSol?.tokenPriceInUsdt))
          }
          else {
            setCurrencyInput(calculateUSDNeeded(value, walletEth?.tokenPriceInUsdt))
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
      if (!walletEth?.tokenPriceInUsdt) {
        return
      }
      // Regular expression to allow only numeric and float values
      if (/^[0-9]*[.]?[0-9]*$/.test(value) && isValidNumber(value)) {
        setCurrencyInput(value);
        if (selectedCurr.curr === CURR_CODE.BNB || selectedCurr.curr === CURR_CODE.ETH) {
          setTokenInput(calculateTokensForBNB(value, selectedCurr.curr === CURR_CODE.BNB ? walletEth?.bnbPrice : walletEth?.ethPrice , walletEth?.tokenPriceInUsdt))
        }
        else  if (selectedCurr.curr === CURR_CODE.SOL) {
          setTokenInput(calculateTokensForBNB(value, walletSol?.solanaPrice , walletSol?.tokenPriceInUsdt))
        }
        else {
          setTokenInput(calculateTokenOutput(value, walletEth?.tokenPriceInUsdt))
        }
      }
    };
  
    const handleBuyTokenClick = async () => {
      
      if (!isClicked) {
        setIsClicked(true);
        // Your button click logic here
        if(walletEth && walletEth?.currentAddress){
            if (selectedCurr.curr === CURR_CODE.BNB || selectedCurr.curr === CURR_CODE.ETH) {
                await walletEth?.buyTokensWithRef(currencyInput, tokenInput, "")
            }
            else {
                await walletEth?.buyTokensUSDTWifRef(currencyInput, tokenInput,"");
            }
        }

        if(walletSol&&walletSol?.connected){
            if (selectedCurr.curr === CURR_CODE.SOL) {
                await walletSol?.sendBuyWithOracle(currencyInput)
            }
            else {
                await walletSol?.sendBuyWithUsdt(currencyInput);
            }
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
  
    return (
        <div className={styles.walletBoxContainer} id='walletBox'>
        <div className={styles.walletBox} id='walletBox'>
            <div className={styles.walletBoxInfo} >
                <div className={styles.walletBoxHeader} >
                  <img src="/img/subbd/widget-logo.svg"/>
                </div>
                <div className={styles.walletBoxHeader} >
                  <div>
                    <p className={styles.walletBoxHeading} >{sectionText?.intro} <span className={styles.symbol}> ${siteInfo?.tokenSymbol} </span> {sectionText?.intro1} </p>
                  </div>
                </div>

                <div className={styles.counterWrapper} >
                  <div className={styles.counterContainer}  >
                    <div className={styles.timeCard} >
                      <div id="hrs" className={styles.value}  >{days}</div>
                      <div className={styles.indicator}  >{sectionText?.day}</div>
                      {/* <img className="colon-item" src="./img/colon.svg" /> */}
                    </div>
                    <div className={styles.timeCard} >
                      <div id="hrs" className={styles.value}  >{hours}</div>
                      <div className={styles.indicator}  >{sectionText?.hrs}</div>
                      {/* <img className="colon-item" src="./img/colon.svg" /> */}
                    </div>
                    <div className={styles.timeCard} >
                      <div id="mins" className={styles.value}  >{minutes}</div>
                      <div className={styles.indicator}  >{sectionText?.mins}</div>
                      {/* <img className="colon-item" src="./img/colon.svg" /> */}
                    </div>
                    <div className={styles.timeCard} >
                      <div id="sec" className={styles.value}  >{seconds}</div>
                      <div className={styles.indicator}  >{sectionText?.sec}</div>
                      {/* <img className="colon-item" src="./img/colon.svg" /> */}
                    </div>
                 
                  </div>
                </div>


                
            </div>
            <div className={styles.walletBoxAction}>
                <p className={styles.totalRaised}>{sectionText?.funRaised}:  ${siteInfo?.formatedRaise} / ${siteInfo?.formatedNextRaise} </p>
                <ProgressBar percentage={siteInfo?.currentRaise *100/ siteInfo?.nextRaise }/>

                <PurchaseAmounts />
                <div className={styles.dashTitle}>1 ${siteInfo?.tokenSymbol} = ${siteInfo?.tokenPriceInUsdt} </div>

                

                {isWalletConnected && 
                <div className={styles.swapArea} >
                    <BuyformCurrList broadcastCurr={setSelectedCurr} selectedCurr={selectedCurr} />

                    <div className={styles.swapSection} >
                    
                            <div className={styles.inputContainer}  >
                            <div  className={styles.inputLable}>
                                <label > {sectionText?.pay} {selectedCurr?.text}  </label>
                            </div>
                            <div className={styles.inputAmount} >
                                <input
                                className={styles.inputControlCustom}
                                value={currencyInput}
                                onChange={handleCurrencyInputChange}
                                onKeyPress={handleKeyPressCurr}
                                type="text"
                                placeholder="0" />
                                <div className={styles.amountType} >
                                  <img src={selectedCurr?.icon} style={{ 'height': '30px', marginRight:5 }} />
                                </div>
                            </div>
                            </div>
                            <div className={styles.inputContainer}  >
                            <div className={styles.inputLable} >
                                <label > {sectionText?.get} ${siteInfo?.symbol}     </label>
                            </div>
                            <div className={styles.inputAmount} >
                                <input
                                className={styles.inputControlCustom}
                                value={tokenInput}
                                onChange={handleTokenInputChange}
                                onKeyPress={handleKeyPressToken}
                                type="text"
                                placeholder="0" />
                                <div className={styles.amountType} >
                                  <img src='/img/subbd/token.png' style={{ 'height': '30px', marginRight:5 }} />
                                </div>
                            </div>
                            </div>
                        
                    </div>

                </div>
                }

                <BuyformConnectButton/>
                {isWalletConnected && 
                
                <div className={styles.actionButtons}  >
                    <button className={styles.buyBtn}  
                        disabled={isClicked}
                        onClick={handleBuyTokenClick}
                    >
                    {sectionText?.buyStake}
                    </button>
                    <CurrencyDropdown />

                </div>
                }
                <div className={styles.externalInfo}  >
                  <a style={{textDecorationColor:"white", textDecoration:'underline', color: 'white'}} href="https://widget.wert.io/default/widget/?commodity=ETH%3AEthereum" target="_blank">Not enough ETH? Top up now</a>
                  {/* <p translate="" className="font-18 text-center m-0 mt-2"><img src="/img/solx/token.svg" style={{ 'height': '35px' }} /> Powered by <a target="_blank" href='/' className=" "><img src="/img/default/W3P_White.svg" alt="" style={{height:25}} /></a></p> */}
                  <a target="_blank" href='/' className=" "><img src="/img/default/W3P_White.svg" alt="" style={{height:18}} /> </a>
                </div>
            </div>

        </div>
        
        </div>
    )


}