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
import { useWalletERC20 } from "@herocoinhunter2/common-service";
export const BuyForm = () => {
    const sectionText = useI18nSection('buyForm')
    const configs = useGlobalConfig()

    const walletEth = useWalletERC20()
    const currList = CURRENCIES[walletEth?.chainSymbol]
    const [selectedCurr, setSelectedCurr] = useState();
    const solanaCurr = CURRENCIES['solana'][0];
  
    useEffect(()=>{
        setSelectedCurr(currList[0])
        setTokenInput('')
        setCurrencyInput('')
    }, [currList])
  
  
    
  
    // const [network, setNetwork] = useState("")
    // const [networkPrice, setNetworkPrice] = useState(0);
  
  
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
        else {
          setTokenInput(calculateTokenOutput(value, walletEth?.tokenPriceInUsdt))
        }
      }
    };
  
    const handleBuyTokenClick = async () => {
      
      if (!isClicked) {
        setIsClicked(true);
        // Your button click logic here
        if (selectedCurr.curr === CURR_CODE.BNB || selectedCurr.curr === CURR_CODE.ETH) {
            await walletEth?.buyTokensWithRef(currencyInput, tokenInput, "")
        }
        else {
            await walletEth?.buyTokensUSDTWifRef(currencyInput, tokenInput,"");
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
  
    return (
        <div className={styles.walletBoxContainer} id='walletBox'>
        <div className={styles.walletBox} id='walletBox'>
            <div className={styles.walletBoxInfo} >
                <div className={styles.walletBoxHeader} >
                  <img src="/img/subbd/widget-logo.svg"/>
                </div>
                <div className={styles.walletBoxHeader} >
                  <div>
                    <p className={styles.walletBoxHeading} >{sectionText?.intro} <span className={styles.symbol}> ${walletEth?.tokenSymbol} </span> {sectionText?.intro1} </p>
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
                <p className={styles.totalRaised}>{sectionText?.funRaised}:  ${walletEth?.formatedRaise} / ${walletEth?.formatedNextRaise} </p>
                <ProgressBar percentage={walletEth?.currentRaise *100/ walletEth?.nextRaise }/>

                {walletEth.currentAddress && 
                <div>
                {/* {truncateMiddle(walletEth.currentAddress)} */}
                <p className={styles.userPurchasedInfo}>{sectionText.boughtAmount} ${configs?.targetToken?.symbol} = { walletEth?.formatedBought}</p>
                {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}
                <p className={styles.userPurchasedInfo}>{sectionText.stakeableAmount} ${configs?.targetToken?.symbol} = {walletEth?.formatedStakeable}</p>
                {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}
                </div>
                }

                <div className={styles.dashTitle}>1 ${configs?.targetToken?.symbol} = ${configs?.targetToken?.tokenPrice} </div>

                
                <div className={styles.currenciesList}  >
                      <SolanaLabel/>
                </div>


                {walletEth.currentAddress && 

                <div className={styles.swapArea} >
                
                <div className={styles.currenciesList}  >
                    {currList.map((curr, idx) => {
                        return(
                            <button key={idx} onClick={() => handleSwitchOption(idx)}

                              className={`${styles.btn}  ${selectedCurr?.text === curr?.text ? styles.selected : ''}`}>
                              <img height="24" alt="" src={curr.imageSrc} />
                              <span className="px-2 font-18">{curr.text}</span>
                            </button>
                        )
                    })}
                  
                </div>
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
                            <label > {sectionText?.get} ${configs?.targetToken?.symbol}     </label>
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
                {!walletEth.currentAddress && 
                <div className={styles.actionButtons} >
                    <button className={styles.connectBtn}   onClick={walletEth.connect}>
                        {sectionText?.connectWallet}
                    </button>
                </div>
                }
                {walletEth.currentAddress && 
                
                <div className={styles.actionButtons}  >
                    <button className={styles.buyBtn}  
                        disabled={isClicked}
                        onClick={handleBuyTokenClick}
                    >
                    {sectionText?.buyStake}
                    </button>
                    <CurrencyDropdown walletETH={walletEth} />

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