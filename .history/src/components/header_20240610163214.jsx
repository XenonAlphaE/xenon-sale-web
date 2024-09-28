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
import HeaderIcon from './HeaderIcon'
import ProgressBar from './ProgressBar';
import './header.css'
import CurrencyDropdown from './currency-dropdown/CurrencyDropdown';
import { useWalletETH } from '../services/wallet-service1';
import { useNativeNetwork, useSetNativeNetwork } from '../utils/nativeNetworkUtils';
import { CURRENCIES,CURR_CODE, NETWORK_OTIONS, VALID_NETWORKS } from '../ducks/nativeNetworkDuck';

export const Header = () => {
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
   

    const loadPurchaseInfo = async () => {
      if (!walletEth.currentAddress) {
        return;
      }

      try {
        
        const info = await getUserPurchaseInfo(configs, walletEth.currentAddress)
        if (info) {
          setUseTotalBought(info)
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
          await walletEth.buyTokens(currencyInput)
      }
      else {
          await walletEth.buyTokensUSDT(currencyInput);
      }
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
                    <HeaderIcon/>
                  </div>
                </div>
            </Col>
            <Col md={5} sm={12} className='col-xs-12' style={{ display: 'flex',flexDirection: "column", alignContent: 'center' }} id='buyForm'>
              <div className="walletBox" id='walletBox'>
                <div className="w-100 d-flex flex-column align-items-center justify-content-start text-center  ">
                  <h4 className="text-black text-center font-18 fw-bold">{sectionText.intro} Stage 5</h4>
                  <div className="d-flex align-items-center justify-content-center w-100 gap-3 fw-regular font-20 counter mb-3  ">
                    <div className="rounded-3 time-card text-center  ">
                      <div className="indicator  ">{sectionText.day}</div>
                      <div id="days" className="value  ">{days}</div>
                      {/* <img className="colon-item" src="./img/colon.svg" /> */}
                    </div>
                    <div className="rounded-3 time-card text-center  ">
                      <div className="indicator  ">{sectionText.hrs}</div>
                      <div id="hours" className="value  ">{hours}</div>
                      {/* <img className="colon-item" src="./img/colon.svg" /> */}
                    </div>
                    <div className="rounded-3 time-card text-center  ">
                      <div className="indicator  ">{sectionText.mins}</div>
                      <div id="minutes" className="value  ">{minutes}</div>
                      {/* <img className="colon-item" src="./img/colon.svg" /> */}
                    </div>
                    <div className="rounded-3 time-card text-center  ">
                      <div className="indicator  ">{sectionText.sec}</div>
                      <div id="seconds" className="value  ">{seconds}</div>
                    </div>
                  </div>
                  <div className="title-wallet w-100">
                  <p className="fw-semibold text-black font-17">{sectionText.funRaised}: {tokenInfo?.totalFundRaise.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                    })} / $5,234,382</p>
                    {/* {truncateMiddle(walletEth.currentAddress)} */}
                    <ProgressBar percentage={5008244.96*100 / 5234382}  />
                    <div className="d-flex justify-content-center align-items-center text-center mb-2 text-secondary fw-semibold fs-7">
                    <p className="text-secondary">{sectionText.boughtAmount} ${configs.targetToken.symbol} = {useTotalBought}</p>
                    {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}
                    </div>
                    
                    <div className="d-flex justify-content-center align-items-center text-center mb-2 text-secondary fw-semibold fs-7">
                      <p className="text-secondary">{sectionText.stakeableAmount} ${configs.targetToken.symbol} = {useTotalBought}</p>
                      {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}
                    </div>

                    <p className="text-center mb-3 font-14 dashTitle">1 {configs.targetToken.symbol} = ${tokenInfo?.tokenPriceInUsdt}</p>
                  </div>
                </div>
                  <div className="swapArea">
                    <div className="tab-container gap-2  ">
                      {currList.map((curr, idx) => {
                          return(
                              <button key={idx} onClick={() => handleSwitchOption(idx)}

                                className={`btn btn-wallet  ${selectedCurr?.text === curr.text ? 'selected' : ''}`}>
                                <img height="24" alt="" src={curr.imageSrc} />
                                <span className="px-2 font-14">{curr.text}</span>
                              </button>
                          )
                      })}
                    </div>
                    {/* {
                        walletEth.currentAddress && 
                        <p className="text-center mb-3 font-14 dashTitle " style={{marginTop: 10, marginBottom: 10}}>Your BNB = 0</p>
                    } */}

                    <div className="swapSection mt-3  " style={{ paddingBottom: '8px' }}>
                      <div className="body-section mt-1 ng-star-inserted">
                        <div className="row" style={{ marginTop: '10px' }}>
                          <div className="col-md-6 ps-md-1 mt-3 mt-md-0 col-xs-12">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <label className="d-block family-title font-14 fw-bold text-truncate w-100"> {sectionText.pay} {selectedCurr?.text}</label>

                            </div>
                            <div className="amountField d-flex align-items-start">
                              <input
                                value={currencyInput}
                                onChange={handleCurrencyInputChange}
                                onKeyPress={handleKeyPressCurr}
                                type="text"
                                className="form-control form-control-custom text-truncate ng-valid ng-dirty ng-touched"
                                placeholder="0" />
                              <div className="amountType">
                                <img src={selectedCurr?.icon} style={{ 'height': '30px', marginRight:5 }} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 ps-md-1 mt-3 mt-md-0 col-xs-12">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <label className="d-block family-title font-14 fw-bold text-truncate"> {sectionText.get} ${configs.targetToken.symbol} </label>
                            </div>
                            <div className="amountField d-flex align-items-start">
                              <input
                                value={tokenInput}
                                onChange={handleTokenInputChange}
                                type="text"
                                onKeyPress={handleKeyPressToken}
                                className="form-control form-control-custom text-truncate ng-valid ng-dirty ng-touched"
                                placeholder="0"
                              />
                              <div className="amountType">
                                <img src="/img/wienerdog/token.svg" style={{ 'height': '30px' ,marginRight:5 }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

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
                                  <button
                                    type="button"
                                    onClick={toggleNativeNetwork}
                                    style={{background:'transparent', border:"solid 2px #fff"}}
                                    className="btn btn-primary w-100">  <img style={{marginRight: 5}} src={NETWORK_OTIONS[remainNetwork].img} width={26} height={26}/> {nextNetworkName} </button>
                             
                          </div>
                      )
                      
                      :

                      (
                        <div>
                              { nativeNetwork === 'eth' &&
                                    <div className="d-flex align-items-center justify-content-center gap-3 mt-2  ">

                                      <button
                                          disabled={isClicked}
                                          type="button"
                                          onClick={handleBuyTokenClick}
                                          translate="" className="btn btn-primary w-100">{sectionText?.buyStake}</button>
                                    </div>
                              }
                            <div className="d-flex align-items-center justify-content-center gap-3 mt-2  ">
                                          
                              <button
                                disabled={isClicked}
                                type="button"
                                onClick={handleBuyTokenClick}
                                translate="" className="btn btn-primary w-100">{sectionText.buyNow}</button>

                                
                                <div className="w-100">
                                  <CurrencyDropdown walletETH={walletEth} />
                                </div>
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
