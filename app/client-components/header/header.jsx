'use client'; // This component will run on the client side

import React, { useState, useEffect,useMemo } from "react";
import {ProgressBar} from './ProgressBar'
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import {useNativeNetwork, useSetNativeNetwork} from '../../../redux/utils/nativeNetworkUtils'
import { CURRENCIES,CURR_CODE, NETWORK_OTIONS, VALID_NETWORKS } from '../../../redux/ducks/nativeNetworkDuck';
import {useWalletETH} from '../services/wallet-service2'
import {useCountdown} from '../services/utils'
import {
  calculateUSDNeeded, calculateTokenOutput,
  calculateTokensForBNB, calculateBNBNeeded, isValidNumber, truncateMiddle
} from '../services/wallet-service';
import { useTokenInfo, getUserPurchaseInfo } from '../services/token-service';
import {CurrencyDropdown} from "../currency-dropdown/CurrencyDropdown";
import configs from '../config.main.json'
import './header.css'
import './header.mobile.css'

export const Header = () => {
  const sectionText = useI18nSection('buyForm')
  const currentLanguage = useLanguage()

  const nativeNetwork = useNativeNetwork()

  const walletEth = useWalletETH(nativeNetwork, configs)
  const currList = CURRENCIES[nativeNetwork]
  const [selectedCurr, setSelectedCurr] = useState();


  const [bnbPrice, setBnbPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);

  const tokenInfo = useTokenInfo(configs)
  const scrollToBuySection = () => {
    // Find the target section to scroll to
    let section = null;
   
      section = document.getElementById('intro');
    
    if (!section) {
      window.location = `/${currentLanguage}`
      return
    }
    // Scroll to the section
    section.scrollIntoView({ behavior: 'smooth' });
  };




  useEffect(() => {
    const fetchDataBNB = async () => {
      try {
        const response = await fetch(configs.BSC.USDT_Price); // Assuming 'data.json' is a local file
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setBnbPrice(jsonData.price);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    const fetchDataEth = async () => {
      try {
        const response = await fetch(configs.ETH.USDT_Price); // Assuming 'data.json' is a local file
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setEthPrice(jsonData.price);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };
    fetchDataEth()
    fetchDataBNB();
  }, []);

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
          setCurrencyInput(calculateBNBNeeded(value, selectedCurr.curr === CURR_CODE.BNB ? bnbPrice : ethPrice , tokenInfo?.tokenPriceInUsdt))
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
        setTokenInput(calculateTokensForBNB(value, selectedCurr.curr === CURR_CODE.BNB ? bnbPrice : ethPrice , tokenInfo?.tokenPriceInUsdt))
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


  return (
    <div id="intro" className='intro'>
      <div className="intro-content">
          
          <div className="intro-content-left">
            <div className="intro-heading1">
                    $WEPE Token

            </div>

            <div className="intro-heading2">
                    WALL STREET
            </div>
            <div className="intro-heading3">
                    PEPE
            </div>

            <img className="btm-img" src="/img/wepe/wepe-mascot.gif"/>
            <img className="arrow1"  src="/img/wepe/left-arrow-1.svg"/>
            <img className = "arrow2" src="/img/wepe/left-arrow-2.svg"/>

           

          </div>
          <div className="intro-content-mid">
              <h2 className="heading1">
                  Trade Like Pepe. Buy $WEPE!
              </h2>

              <p className="heading2">
                  Wall Street Pepe hates that whales are hiding in insider groups. So he decided to make his own. Join the WEPE Token Army - frogs strong together!

              </p>
              <div className="tag-list">
                  <div className="tag-item">
                    <img  src="/img/wepe/wobs-icon.svg"  className="tag-icon"/>
                    WEPE Community: Choose rich together!
                  </div>
                  <div className="tag-item">
                    <img  src="/img/wepe/wobs-icon.svg"  className="tag-icon"/>
                    WEPE Token Insights: Trade like a pro!
                  </div>
                  <div className="tag-item">
                    <img  src="/img/wepe/wobs-icon.svg"  className="tag-icon"/>
                    WEPE Picks: Mad degen plays!
                  </div>


              </div >    
              <div className="next-nav">
                  <h2>JOIN WEPE ARMY </h2>
                  <img src="/img/wepe/arrow-banner.svg" />
                  <img src="/img/wepe/home_arrow.svg" />

              </div>
          </div>

          <div className="intro-content-right">
              <div className="walletBox" id='walletBox'>
                  <div className="walletBox-info">
                    <p className="walletBox-heading">{sectionText?.intro}</p>
                    <div className="dashTitle">1 ${configs?.targetToken?.symbol} = ${configs?.targetToken?.tokenPrice} </div>
                    <div className="counter-container  ">
                      <div className="time-card  ">
                        <div className="indicator  ">{sectionText?.day}</div>
                        <div id="days" className="value  ">{days}</div>
                        {/* <img className="colon-item" src="./img/colon.svg" /> */}
                      </div>
                      <div className="time-card" >
                        <div className="indicator  ">{sectionText?.hrs}</div>
                        <div id="hours" className="value  " style={{color: 'red'}} >{hours}</div>
                        {/* <img className="colon-item" src="./img/colon.svg" /> */}
                      </div>
                      <div className="time-card" >
                        <div className="indicator  ">{sectionText?.mins}</div>
                        <div id="minutes" className="value  " style={{color: 'blue'}} >{minutes}</div>
                        {/* <img className="colon-item" src="./img/colon.svg" /> */}
                      </div>
                      <div className="time-card"  >
                        <div className="indicator  ">{sectionText?.sec}</div>
                        <div id="seconds" className="value  " style={{color: 'green'}} >{seconds}</div>
                      </div>
                    </div>
                    <ProgressBar percentage={11457475.67*100 / 11540268}  />

                    <p className="total-raised">{sectionText?.funRaised}:  $11,457,475.7 / $11,540,268</p>
                      {/* {truncateMiddle(walletEth.currentAddress)} */}
                      <p className="user-purchased-info">{sectionText.boughtAmount} ${configs?.targetToken?.symbol} = {totalBought}</p>
                      {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}
                      <p className="user-purchased-info">{sectionText.stakeableAmount} ${configs?.targetToken?.symbol} = {totalBought}</p>
                        {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}

                  </div>
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
                              <label className=""> {sectionText?.get} $FLOCK     </label>
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
                                <img src='/img/wepe/token.svg' style={{ 'height': '30px', marginRight:5 }} />
                              </div>
                            </div>
                          </div>
                        
                    </div>

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
                      <button className="connect-btn"
                          disabled={isClicked}
                          onClick={handleBuyTokenClick}
                      >
                         {sectionText?.buyStake}
                      </button>
                      <CurrencyDropdown walletETH={walletEth} />

                  </div>
                  }
                  <div className="external-info">
                    <a style={{textDecorationColor:"#000" ,color:"#000", textDecoration:'underline'}} href="https://widget.wert.io/default/widget/?commodity=ETH%3AEthereum" target="_blank">Not enough ETH? Top up now</a>

                    <p translate="" className="font-18 text-center m-0 mt-2"><img src="/img/wepe/token.svg" style={{ 'height': '35px' }} /> Powered by <a target="_blank" href='https://web3paymentsolutions.io/' className=" "><img src="/img/flockers/W3P_Black.svg" alt="" style={{height:25}} /></a></p>
                  </div>
              </div>
                  
          </div>

      </div>
    </div>
    // </div>
  );
};
