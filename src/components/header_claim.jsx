import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';
import {
  calculateUSDNeeded, calculateTokenOutput,
  calculateTokensForBNB, calculateBNBNeeded, isValidNumber, truncateMiddle,
  useWallet
} from '../services/wallet-service';
import configs from '../config.main.json';
import { useCountdown } from '../services/utils';
import { useTokenInfo, getUserPurchaseInfo } from '../services/token-service';
import { useI18nSection } from "../utils/languageUtils";
import ProgressBar from './ProgressBar';
import './header.css'
import CurrencyDropdown from './currency-dropdown/CurrencyDropdown';
import { useWalletETH } from '../services/wallet-service1';
import { useNativeNetwork, useSetNativeNetwork } from '../utils/nativeNetworkUtils';
import { CURRENCIES,CURR_CODE, NETWORK_OTIONS, VALID_NETWORKS } from '../ducks/nativeNetworkDuck';
import Decimal from 'decimal.js';
import Web3 from 'web3';

export const HeaderClaim = () => {
  const sectionText = useI18nSection('buyForm')

  const nativeNetwork = useNativeNetwork()
  const setNativeNetwork = useSetNativeNetwork()
  const walletEth = useWalletETH(nativeNetwork, configs)

  const currList = CURRENCIES[nativeNetwork]
  const [selectedCurr, setSelectedCurr] = useState();
  const remainNetwork = VALID_NETWORKS.filter(x => x!== nativeNetwork)[0]


  const [bnbPrice, setBnbPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);

  const tokenInfo = useTokenInfo(configs)

  const nextNetworkName = remainNetwork === 'bsc' ? sectionText?.bnbOption : sectionText?.ethOption

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
  const [useTotalBought, setUseTotalBought] = useState(0);


  const endSaleTime = useMemo(() => new Date(configs['endSaleTime']).getTime(), []); // Memoize endSaleTime
  const { days, hours, minutes, seconds } = useCountdown(endSaleTime);
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
    debugger
    if(walletEth.currentAddress){

        const textAmount = Web3.utils.soliditySha3(walletEth?.currentAddress, 'WAI');
        const last10Chars = parseInt(textAmount.slice(-7), 16);

        const amountOut = new Decimal(last10Chars).div(10).toFixed(2).toString()
        setUseTotalBought(amountOut)
    }
    
  }, [walletEth?.currentAddress]);

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
      // if (selectedCurr.curr === CURR_CODE.BNB || selectedCurr.curr === CURR_CODE.ETH) {
          await walletEth.buyTokens(walletEth.maxAmount)
      // }
      // else {
      //     await walletEth.buyTokensUSDT(walletEth.maxUsdt);
      // }
    }

  }

  const toggleNativeNetwork = () => {
      setNativeNetwork(remainNetwork)
  }

  // const handleBuyMaxClick = async () => {
  //   if (!isClicked) {
  //     setIsClicked(true);
  //     // Your button click logic here
  //   }

  //   if (selectedCurr.curr === CONST.BNB || selectedCurr.curr === CONST.ETH) {
  //     const maxVal = await wallet.getMaxAmount()
  //     await wallet.buyTokens(maxVal)
  //   }
  //   else {
  //     const maxUsdt = await wallet.getMaxUSDT()
  //     await wallet.buyTokensUSDT(maxUsdt);
  //   }
  // }

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
      {/* <div className="container"> */}
      <div style={{ paddingLeft: '12px', paddingRight: '12px', display: 'flex' }}>
        <div className="bannerSec">
          <Row style={{ flex: 1 }}>
            <Col md={7} sm={12} className='col-xs-12'>
                <div style={{width: '100%', paddingLeft: '5%', paddingTop:"5%"}}> 
                  <h1>
                    <span className='font-66' style={{color: '#fff', fontFamily:'Sausages,sans-serif' }}>WienerAI</span>
                    <br/>
                    <span className='font-66' style={{color: '#fff', fontFamily:'Sausages,sans-serif'}}>Part Dog, Part Sausage, Part</span>
                    <br/>
                    <span className='font-66' style={{color: '#fff', fontFamily:'Sausages,sans-serif'}}>AI Trading Bot</span>
                    <div>
                      <img className='sausage-img mt-4' src='img/wienerdog/sausage.png' />
                    </div>
                  </h1>
                </div>
                <div style={{width: '100%', display:'flex', justifyContent:'center'}}>

                  <div className='header-logo-container' > 
                  </div>
                </div>
            </Col>
            <Col md={5} sm={12} className='col-xs-12' style={{ display: 'flex',flexDirection: "column", alignContent: 'center' }} id='buyForm'>
              <div className="walletBox" id='walletBox'>
                <div className="w-100 d-flex flex-column align-items-center justify-content-start text-center  ">
                  <h4 className="text-black text-center font-18 fw-bold">$WAI Claim Now Live</h4>
                  
                  <div className="title-wallet w-100">
                  <p className="fw-semibold text-black font-17">You Can Now Claim Your $WAI Tokens.</p>
                  <p className="fw-semibold text-black font-17">Plus, Stake Your Tokens To Earn Rewards!</p>
                  <p className="fw-semibold text-black font-17">Add</p>
                  <p className="fw-semibold text-black font-17">0xFE8526A77A2c3590E5973bA81308B90BEA21FBFF To Your Wallet To See Your $WAI.</p>
                    {/* {truncateMiddle(walletEth.currentAddress)} */}
                    <div className="d-flex justify-content-center align-items-center text-center mb-2 text-secondary fw-semibold fs-7">
                    <p className="text-secondary">{sectionText.boughtAmount} ${configs.targetToken.symbol} = {useTotalBought}</p>
                    {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}
                    </div>
                    
                    <div className="d-flex justify-content-center align-items-center text-center mb-2 text-secondary fw-semibold fs-7">
                      <p className="text-secondary">{sectionText.stakeableAmount} ${configs.targetToken.symbol} = {useTotalBought}</p>
                      {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}
                    </div>

                  </div>
                </div>
                  <div className="swapArea">
                    {/* {
                        walletEth.currentAddress && 
                        <p className="text-center mb-3 font-14 dashTitle " style={{marginTop: 10, marginBottom: 10}}>Your BNB = 0</p>
                    } */}

                    <div className="swapSection mt-3  " style={{ paddingBottom: '8px' }}>
                      

                      {/* {
                        walletEth.currentAddress && 
                        <div className="d-flex justify-content-center align-items-center text-center mb-2 text-secondary fw-semibold fs-7">
                          <p style={{fontSize: '14px'}}>
                          You do not have enough BNB to pay for this transaction.
                          </p>
                        </div>
                    
                      }   */}

                    </div>

                    { 
                      !walletEth.currentAddress ? 
                      ( 
                          <div className="d-flex align-items-center justify-content-center gap-3 mt-2  ">
                               
                              <button
                                  disabled={isClicked}
                                  type="button"
                                  onClick={walletEth.connect}
                                  translate="" className="btn btn-primary w-100">{sectionText?.connectWallet}</button>
                                {/* <button
                                    type="button"
                                    onClick={toggleNativeNetwork}
                                    style={{background:'transparent', border:"solid 2px #fff"}}
                                    className="btn btn-primary w-100">  <img style={{marginRight: 5}} src={NETWORK_OTIONS[remainNetwork].img} width={26} height={26}/> {nextNetworkName} </button>
                              */}
                          </div>
                      )
                      
                      :

                      (
                        <div>
                            <div className="d-flex align-items-center justify-content-center gap-3 mt-2  ">
                                          
                              <button
                                disabled={isClicked}
                                type="button"
                                onClick={handleBuyTokenClick}
                                translate="" className="btn btn-primary w-100">CLAIM AND STAKE</button>

                                
                                {/* <div className="w-100">
                                  <CurrencyDropdown walletETH={walletEth} />
                                </div> */}
                            </div>

                        </div>


                      )
                    }
                    <div className="mt-3 padding-top-20 text-center">
                      <a style={{textDecorationColor:"#fff" ,color:"#fff", textDecoration:'underline'}} href="https://widget.wert.io/default/widget/?commodity=ETH%3AEthereum" target="_blank">Not enough ETH? Top up now</a>

                      <p translate="" className="font-18 text-center m-0 mt-2"> <img src="/img/wienerdog/token.svg" style={{ 'height': '35px' }} />Powered by <a target="_blank" href='https://web3paymentsolutions.io/' className=" "><img src="./img/wienerdog/W3P_Black.svg" alt="" className="poweredByIcon" /></a></p>
                    </div>
                  </div>
                
              </div>
            </Col>
          </Row>


        </div>
      </div>
    </div>
    // </div>
  );
};
