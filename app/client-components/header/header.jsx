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
import { getUserPurchaseInfo } from '../services/token-service';
import {CurrencyDropdown} from "../currency-dropdown/CurrencyDropdown";
import configs from '../config.main.json'
import './header.css'
import './header.mobile.css'
import { useWalletERC20 } from "../../erc20wallet-provider";
import { BuyForm } from "../buyform/buyform";

export const Header = () => {
  const sectionText = useI18nSection('header')
  const currentLanguage = useLanguage()

  const nativeNetwork = useNativeNetwork()

  const walletEth = useWalletERC20()
  const currList = CURRENCIES[nativeNetwork]
  const [selectedCurr, setSelectedCurr] = useState();


  const [bnbPrice, setBnbPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);

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
          setCurrencyInput(calculateBNBNeeded(value, selectedCurr.curr === CURR_CODE.BNB ? bnbPrice : ethPrice , walletEth?.tokenPriceInUsdt))
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
        setTokenInput(calculateTokensForBNB(value, selectedCurr.curr === CURR_CODE.BNB ? bnbPrice : ethPrice , walletEth?.tokenPriceInUsdt))
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
    <div id="intro" className='intro'>
      <div className="intro-content">
          
          <div className="intro-content-left">
              <div className="intro-text-container">
                <h1 className="intro-heading1"><span _ngcontent-ng-c406187462="">{sectionText?.heading1}:</span> {sectionText?.heading2}</h1>
                <h2 className="intro-heading2">{sectionText?.desc}</h2>
              </div>
              <img className="intro-banner" src="/img/btcbull/banner-img.webp" />
          </div>
          <div className="intro-content-right">
              <BuyForm/>
            
          </div>

      </div>
    </div>
    // </div>
  );
};
