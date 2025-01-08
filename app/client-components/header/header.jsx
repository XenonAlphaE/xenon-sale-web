'use client'; // This component will run on the client side

import React, { useState, useEffect,useMemo } from "react";
import {ProgressBar} from './ProgressBar'
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import {useNativeNetwork, useSetNativeNetwork} from '../../../redux/utils/nativeNetworkUtils'
import { CURRENCIES,CURR_CODE, NETWORK_OTIONS, VALID_NETWORKS } from '../../../redux/ducks/nativeNetworkDuck';
import {useWalletETH} from '../services/wallet-service2'
import {useCountdown, formatTokenNumber} from '../services/utils'
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
            <div className="intro-section-container">
              <img className='image-character-left'  src="/img/memeindex/character-1.svg" /> 
              <img className='image-character-right'  src="/img/memeindex/character-2.svg" />
              <div className="banner-content align-self-end">
                <h1 className="banner-title">World’s First Decentralized Meme Coin Index</h1>
                <h5 className="banner-title">
                    <span className="desc_1">Buy NOW </span>
                    <span className="desc_2">In Presale To Unlock </span>
                    <span className="desc_3">Supercharged </span>
                    <span className="desc_4">Rewards!</span>
                </h5>
              <div className="mini-grap-wrap">
                <div className="mini-grap">
                  <div className="mini-grap-head">
                      <p>Meme Titan Index</p>
                    </div>
                  <div className="mini-grap-dataAread">
                      <span className="text-orange">MCAP</span>
                      <img src="/img/memeindex/up-green.png" alt="graph 1" className="mini-grap-icon"/>
                      <span className="text-success">4.2%</span>
                    </div>
                    <img src="/img/memeindex/graph_1.png" alt="graph 1" className="mini-grap-graphImg"/>
                </div>
                <div className="mini-grap">
                <div className="mini-grap-head">
                      <p>Meme Moonshot Index</p>
                    </div>
                  <div className="mini-grap-dataAread">
                      <span className="text-orange">MCAP</span>
                      <img src="/img/memeindex/up-green.png" alt="graph 2" className="mini-grap-icon"/>
                      <span className="text-success">23.5%</span>
                    </div>
                    <img src="/img/memeindex/graph_2.png" alt="graph 2" className="mini-grap-graphImg"/>
                </div>
                <div className="mini-grap">
                <div className="mini-grap-head">
                      <p>Meme Titan Index</p>
                    </div>
                  <div className="mini-grap-dataAread">
                      <span className="text-orange">MCAP</span>
                      <img src="/img/memeindex/up-green.png" alt="graph 3" className="mini-grap-icon"/>
                      <span className="text-success">8.9%</span>
                    </div>
                    <img src="/img/memeindex/graph_3.png" alt="graph 3" className="mini-grap-graphImg"/>
                </div>
                <div className="mini-grap">
                  <div className="mini-grap-head">
                      <p>Meme MidCap Index</p>
                    </div>
                  <div className="mini-grap-dataAread">
                      <span className="text-orange">MCAP</span>
                      <img src="/img/memeindex/up-green.png" alt="graph 4" className="mini-grap-icon"/>
                      <span className="text-success">4.8%</span>
                    </div>
                    <img src="/img/memeindex/graph_4.png" alt="graph 4" className="mini-grap-graphImg"/>
                </div>
              </div>
              </div>
              <div className="staking-wrap">
                  <p className="desc_5">1304%</p>
                  <p className="desc_6">Staking Rewards</p>
                </div>
            </div>
        
            {/* <div className='intro-img'> */}
            {/* <img className='intro-img'  src="/img/flockers/hero.gif" /> ? */}
            {/* </div> */}

          </div>
          <div className="intro-content-right">
            <div className="wapper-header">
               <a href="https://coinsult.net/projects/memeindex/">
                 <img src="/img/memeindex/coinsult.svg" alt="coinsult" className="img-fluid"  />
               </a>
               <a href="https://app.solidproof.io/projects/memeindex-token">
                 <img src="/img/memeindex/solid.svg" alt="solid" className="img-fluid" />
               </a>
            </div>
            <div className="widget-wrapper">
              <div className="walletBox" id='walletBox'>
                    <div className="walletBox-info">
                      <p className="walletBox-buy-title">{sectionText?.intro}</p>
                      <div className="counter-container  ">
                          <div className="walletBox-counter-title"> UNTIL PRICE INCREASE</div>
                          <div className="walletBox-counter-data">                        
                            <div className="time-card">
                              <div className="indicator  ">{sectionText?.day}</div>
                              <div id="days" className="value  ">{days}</div>
                              {/* <img className="colon-item" src="./img/colon.svg" /> */}
                            </div>
                            <div className="time-card" style={{color: 'orange'}} >
                              <div className="indicator  ">{sectionText?.hrs}</div>
                              <div id="hours" className="value  ">{hours}</div>
                              {/* <img className="colon-item" src="./img/colon.svg" /> */}
                            </div>
                            <div className="time-card" style={{color: 'green'}}>
                              <div className="indicator  ">{sectionText?.mins}</div>
                              <div id="minutes" className="value  ">{minutes}</div>
                              {/* <img className="colon-item" src="./img/colon.svg" /> */}
                            </div>
                            <div className="time-card" style={{color: 'lightblue'}} >
                              <div className="indicator  ">{sectionText?.sec}</div>
                              <div id="seconds" className="value  ">{seconds}</div>
                            </div>
                          </div>
                      </div>

                      <p className="total-raised">{sectionText?.funRaised}: $16,112,074.72 / $18,000,000</p>
                        {/* {truncateMiddle(walletEth.currentAddress)} */}
                        <div className="walletBox-progress">
                            <ProgressBar percentage={1481523.67*100 / 1630831}  />
                        </div>
                     
                        <p className="user-purchased-info">{sectionText.boughtAmount} ${configs?.targetToken?.symbol} = {formatTokenNumber(totalBought)}</p>
                        {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}
                        <p className="user-purchased-info">{sectionText.stakeableAmount} ${configs?.targetToken?.symbol} = {formatTokenNumber(totalBought)}</p>
                          {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}

                        <div className="dashTitle">1 {configs?.targetToken?.symbol} = ${configs?.targetToken?.tokenPrice} </div>
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
                                  <img src={selectedCurr?.icon} style={{ 'height': '30px', marginRight:10 }} />
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
                                  <img src='/img/memeindex/token.svg' style={{ 'height': '30px', marginRight:10 }} />
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
                      <a style={{textDecorationColor:"#000" ,color:"#fff", textDecoration:'underline'}} href="https://widget.wert.io/default/widget/?commodity=ETH%3AEthereum" target="_blank">Not enough ETH? Top up now</a>

                      <p translate="" className="font-18 text-center m-0 mt-2"><img src="/img/memeindex/token.svg" style={{ 'height': '35px' }} /> Powered by <a target="_blank" href='https://web3paymentsolutions.io/' className=" "><img src="/img/default/W3P_White.svg" alt="" style={{height:25}} /></a></p>
                    </div>
                </div>
            </div>

                  
          </div>

      </div>
    </div>
    // </div>
  );
};
