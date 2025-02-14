'use client'; // This component will run on the client side

import React, { useState, useEffect,useMemo } from "react";
import {ProgressBar} from './ProgressBar'
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
import './buyform.css'
import './buyform.mobile.css'
export const BuyForm = () => {
    const sectionText = useI18nSection('buyForm')
    const nativeNetwork = useNativeNetwork()

    const walletEth = useWalletERC20()
    const currList = CURRENCIES[nativeNetwork]
    const [selectedCurr, setSelectedCurr] = useState();
  
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
  
    return (
        <div className="walletBox-container">
        <div className="walletBox" id='walletBox'>
            <div className="walletBox-info">
                <p className="walletBox-heading">{sectionText?.intro}</p>

                <div className="counter-wrapper">
                  <div className="counter-container  ">
                    <div className="time-card  ">
                      <div className="indicator  ">{sectionText?.day}</div>
                      <div id="days" className="value  ">{days}</div>
                      {/* <img className="colon-item" src="./img/colon.svg" /> */}
                    </div>
                    <div className="time-card"  >
                      <div className="indicator  ">{sectionText?.hrs}</div>
                      <div id="hours" className="value  ">{hours}</div>
                      {/* <img className="colon-item" src="./img/colon.svg" /> */}
                    </div>
                    <div className="time-card" >
                      <div className="indicator  ">{sectionText?.mins}</div>
                      <div id="minutes" className="value  ">{minutes}</div>
                      {/* <img className="colon-item" src="./img/colon.svg" /> */}
                    </div>
                    <div className="time-card"  >
                      <div className="indicator  ">{sectionText?.sec}</div>
                      <div id="seconds" className="value  ">{seconds}</div>
                    </div>
                  </div>
                </div>


                <p className="total-raised">{sectionText?.funRaised}:  $$1,583,016.72 / $2,000,000</p>

                <ProgressBar percentage={14820003 *100/ 2000000 }/>
                {walletEth.currentAddress && 
                <div>
                {/* {truncateMiddle(walletEth.currentAddress)} */}
                <p className="user-purchased-info">{sectionText.boughtAmount} ${configs?.targetToken?.symbol} = { walletEth?.formatedBought}</p>
                {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}
                <p className="user-purchased-info">{sectionText.stakeableAmount} ${configs?.targetToken?.symbol} = {walletEth?.formatedBought}</p>
                {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}
                </div>
                }
                
                <div className="dashTitle">1 ${configs?.targetToken?.symbol} = ${configs?.targetToken?.tokenPrice} </div>
            </div>
            {walletEth.currentAddress && 

            <div className="swapArea">
            <div className="currencies-list">
                {currList.map((curr, idx) => {
                    return(
                        <button key={idx} onClick={() => handleSwitchOption(idx)}

                        className={`btn btn-wallet  ${selectedCurr?.text === curr?.text ? 'selected' : ''}`}>
                        <img height="24" alt="" src={curr.imageSrc} />
                        <span className="px-2 font-18">{curr.text}</span>
                        </button>
                    )
                })}
            </div>
            <div className=" swapSection">
            
                    <div className="input-container" >
                    <div className="input-lable">
                        <label className=""> {sectionText?.pay} {selectedCurr?.text}  </label>
                    </div>
                    <div className="input-amount">
                        <input
                        value={currencyInput}
                        onChange={handleCurrencyInputChange}
                        onKeyPress={handleKeyPressCurr}
                        type="text"
                        className="input-control-custom"
                        placeholder="0" />
                        <div className="amountType">
                        <img src={selectedCurr?.icon} style={{ 'height': '30px', marginRight:5 }} />
                        </div>
                    </div>
                    </div>
                    <div className="input-container" >
                    <div className="input-lable">
                        <label className=""> {sectionText?.get} ${configs?.targetToken?.symbol}     </label>
                    </div>
                    <div className="input-amount">
                        <input
                        value={tokenInput}
                        onChange={handleTokenInputChange}
                        onKeyPress={handleKeyPressToken}
                        type="text"
                        className="input-control-custom"
                        placeholder="0" />
                        <div className="amountType">
                          <img src='/img/btcbull/logo.png' style={{ 'height': '30px', marginRight:5 }} />
                        </div>
                    </div>
                    </div>
                
            </div>

            </div>
}
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
                    onClick={handleBuyTokenClick}
                >
                {sectionText?.buyStake}
                </button>
                <CurrencyDropdown walletETH={walletEth} />

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