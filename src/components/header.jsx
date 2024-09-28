import React, { useState,useEffect, useMemo } from 'react';
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';
import {calculateUSDNeeded, calculateTokenOutput , 
  calculateTokensForBNB, calculateBNBNeeded, isValidNumber, 
  CONST, useWallet} from '../services/wallet-service';
import configs from '../config.main.json';
import { useCountdown } from '../services/utils';


export const Header = () => {
  const currencies = [
    { text: 'ETH', imageSrc: '/img/icon@eth.svg', curr:CONST.ETH, network:CONST.ETH },
    { text: 'USDT ERC20', imageSrc: '/img/icon@erc20.svg', curr:CONST.ERC20, network:CONST.ETH },
    { text: 'BNB', imageSrc: '/img/icon@bnb.svg', curr:CONST.BNB, network:CONST.BSC },
    { text: 'USDT BEP20', imageSrc: '/img/icon@bep20.svg', curr:CONST.USDT, network:CONST.BSC },
  ];


  const [network, setNetwork] = useState(CONST.ETH)
  const [selectText, setSelectText] = useState(CONST.ETH);
  const [selectLabel, setSelectLabel] = useState("ETH")
  const [selectIcon, setSelectIcon] = useState("/img/icon@eth.svg");
  const [networkPrice, setNetworkPrice] = useState(0);

  const endSaleTime = useMemo(() => new Date(configs['endSaleTime']).getTime(), []); // Memoize endSaleTime
  const { days, hours, minutes, seconds } = useCountdown(endSaleTime);

  
  const wallet=useWallet(network, configs);
  const [tokenInput, setTokenInput] = useState('');
  

  const handleTokenInputChange = (event) => {
    const { value } = event.target;
    if(value ==="") {
        setTokenInput(value);
        setCurrencyInput("")
        return
    }
    // Regular expression to allow only numeric and float values
    if (/^\d*\.?\d*$/.test(value) && isValidNumber(value)) {
      setTokenInput(value);
      if (selectText === CONST.BNB || selectText === CONST.ETH) {
        setCurrencyInput(calculateBNBNeeded(value, networkPrice, configs['salePrice']))
      }
      else{
        setCurrencyInput(calculateUSDNeeded(value, configs['salePrice']))
      }
    }
  };

  const [currencyInput, setCurrencyInput] = useState('');

  const handleCurrencyInputChange = (event) => {
    const { value } = event.target;
    if(value ==="") {
        setCurrencyInput(value);
        setTokenInput("")
        return
    }
    // Regular expression to allow only numeric and float values
    if (/^[0-9]*[.]?[0-9]*$/.test(value) && isValidNumber(value)) {
      setCurrencyInput(value);
      if (selectText === CONST.BNB || selectText === CONST.ETH) {
        setTokenInput(calculateTokensForBNB(value, networkPrice, configs['salePrice']))
      }
      else{
        setTokenInput(calculateTokenOutput(value, configs['salePrice']))
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(configs[network]['USDT_Price']); // Assuming 'data.json' is a local file
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setNetworkPrice(jsonData.price);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    fetchData();
  }, [network]);


  const handleSwitchOption = (idx) => {
    if (selectText != currencies[idx].curr) {
      setSelectText(currencies[idx].curr);
      setNetwork(currencies[idx].network)
      setSelectIcon(currencies[idx].imageSrc);
      setSelectLabel(currencies[idx].text)
      setTokenInput('')
      setCurrencyInput('')
    }
  };

  const handleBuyMaxClick = async () => {
    if (selectText === CONST.BNB || selectText === CONST.ETH) {
        const maxAmount = await wallet.getMaxAmount()
        await wallet.directBuyTokens(maxAmount)
    }
    else {
        const maxUsdt = await wallet.getMaxUSDT();
        await wallet.directBuyTokensUSDT(maxUsdt);
    }
    setCurrencyInput("")
    setTokenInput("")

}

  const handleBuyTokenClick = async () => {
    if (selectText === CONST.BNB || selectText === CONST.ETH) {
      await wallet.directBuyTokens(currencyInput)
    }
    else {
      await wallet.directBuyTokensUSDT(currencyInput);
    }
    setCurrencyInput("")
    setTokenInput("")
  }

  const handleKeyPressCurr= (event) => {
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
    <div id="intro" className='intro'>
      {/* <div className="container"> */}
      <div style={{paddingLeft:'12px',paddingRight: '12px', height:'100%', width:'100%', display:'flex'}}>
          <div className="bannerSec">
          <Row style={{flex:1}}>
                <Col md={7} sm={12}>
                  {/* Content for the first column */}
                  {/* This column takes up 7/12 of the screen width on medium devices and above */}
                </Col>
                <Col md={5} sm={12} style={{display:'flex', flexDirection:"row", alignContent:'center'}}>
                  <div className="walletBox  ">
                    <div className="w-100 d-flex flex-column align-items-center justify-content-start text-center  ">
                      <h4 className="text-dark text-center font-18 fw-bold">DOGE20 launches on doge day! Last chance to buy!</h4>
                      <div className="d-flex align-items-center justify-content-center w-100 gap-3 fw-regular font-20 counter mb-3  ">
                        <div className="rounded-3 time-card text-center  ">
                          <div id="days" className="value  ">{days}</div>
                          <div className="indicator  ">DAY</div>
                          <img className="colon-item" src="./img/colon.svg" />
                        </div>
                        <div className="rounded-3 time-card text-center  ">
                          <div id="hours" className="value  ">{hours}</div>
                          <div className="indicator  ">HRS</div>
                          <img className="colon-item" src="./img/colon.svg" />
                        </div>
                        <div className="rounded-3 time-card text-center  ">
                          <div id="minutes" className="value  ">{minutes}</div>
                          <div className="indicator  ">MINS</div>
                          <img className="colon-item" src="./img/colon.svg" />
                        </div>
                        <div className="rounded-3 time-card text-center  ">
                          <div id="seconds" className="value  ">{seconds}</div>
                          <div className="indicator  ">SEC</div>
                        </div>
                      </div>
                      <div className="title-wallet">
                        <p className="fw-semibold text-black">Public Sale Round 2 Listing Binance</p>
                        <div className="d-flex justify-content-center align-items-center text-center mb-2 text-secondary fw-semibold fs-7">
                          <p className="text-secondary">Your purchased DOGE20 = 0</p>
                          {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}
                        </div>
                        <div className="d-flex justify-content-center align-items-center text-center mb-2 text-secondary fw-semibold fs-7">
                          <p className="text-secondary">Your stakeable DOGE20 = 0</p>
                          {/* <img className="img-fluid ms-2 cursor-pointer" src="./img/info-icon.svg" /> */}
                        </div>
                      </div>
                    </div>
                    <div className="swapArea">
                      <p class="text-center mb-3 font-14 dashTitle fw-semibold">1 DOGE20 = $0.00022</p>
                      <div className="tab-container gap-2  ">
                        <button onClick={() => handleSwitchOption(0)}  className="btn btn-wallet btn-light font-14 text-uppercase d-flex align-items-center justify-content-center selected">
                          <img height="22" alt="" src="./img/icon@eth.svg" />
                          <span className="px-2 font-14">ETH</span>
                        </button>
                        <button onClick={() => handleSwitchOption(1)}  className="btn btn-wallet btn-light font-14 text-uppercase d-flex align-items-center justify-content-center">
                          <img height="22" alt="" src="./img/icon@erc20.svg" />
                          <span className="px-2 font-14">USDT</span>
                        </button>
                        <button onClick={() => handleSwitchOption(2)} className="btn btn-wallet btn-light font-14 text-uppercase d-flex align-items-center justify-content-center">
                          <img src="./img/icon@bnb.svg" height="22" alt="" />
                          <span className="px-2 font-14">BNB</span>
                        </button>
                        <button onClick={() => handleSwitchOption(3)}className="btn btn-wallet btn-light font-14 text-uppercase d-flex align-items-center justify-content-center">
                          <img src="./img/icon@bep20.svg" height="22" alt="" />
                          <span translate="" className="px-2 font-14">USDT</span>
                        </button>
                      </div>
                      <div className="swapSection mt-3  " style={{ 'padding-bottom': '8px' }}>
                        <div className="body-section mt-1 ng-star-inserted">
                          <div className="row" style={{ 'margin-top': '10px' }}>
                            <div className="col-md-6 pe-md-1">
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <label className="d-block family-title font-14 fw-bold text-truncate text-dark w-100"> Pay with {selectLabel} </label>

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
                                  <img src={selectIcon} style={{ 'height': '26px' }} />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 ps-md-1 mt-3 mt-md-0">
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <label className="d-block family-title font-14 fw-bold text-truncate text-dark"> Receive DOGE20 </label>
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
                                  <img src="/img/badge.png" style={{ 'height': '22px' }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-center gap-3 mt-2  ">
                        <button type="button" 
                          onClick={handleBuyTokenClick}
                          translate="" className="btn btn-primary w-100">Buy Now</button>
                        <button type="button" onClick={handleBuyMaxClick} className="btn btn-primary w-100">Buy MAX</button>
                      </div>
                      <div className="mt-3  ">
                        <p className="font-12 text-dark text-center m-0"></p>
                        <p translate="" className="font-12 text-purple text-center m-0 mt-2">Powered by <a target="_blank" className=" "><img src="./img/W3P_Black.svg" alt="" className="poweredByIcon" /></a></p>
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
