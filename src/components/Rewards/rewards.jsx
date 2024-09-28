import React, { useState } from 'react';
import Decimal from 'decimal.js';


export const Rewards = () => {
  const [progress, setProgress] = useState(40);
  const [inputValue, setInputValue] = useState(1000000);
  const [iBuy, setIBuy] = useState(1000000 * 0.00022);

  const scrollToBuySection = () => {
    // Find the target section to scroll to
    const section = document.getElementById('intro');

    // Scroll to the section
    section.scrollIntoView({ behavior: 'smooth' });
  };

  
  const handleChange = (event) => {
    setInputValue(event.target.value);
    const inputNumber = new Decimal(event.target.value);
    const result = inputNumber.times(0.00022);
    setIBuy(result.toString());
  };

  const handleKeyPress = (event) => {
    setInputValue(event.target.value);
    const inputNumber = new Decimal(event.target.value);
    const result = inputNumber.times(0.00022);
    setIBuy(result.toString());
  };

  // const handleChangePropressBar = (event) => {
  //   setProgress(parseInt(event.target.value)); // Cập nhật giá trị tiến trình khi người dùng thay đổi
  // };

  return (
    <div>
      <div id="contact" className="text-center">
        <div className="container">
          <h1 className="setion_title">REWARDS CALCULATOR</h1>
          <p className="text-secondary-header">Dogecoin20 offers a new passive rewards opportunity to the meme coin scene but could also benefit from token price appreciation. DOGE20 has a fully diluted starting market cap nearly 900 times cheaper than the original Dogecoin.</p>
          <div className="row" >
            <div className="col-12 col-md-6 setion_header d-flex flex-column justify-content-center align-items-center">
              <h1 class="setion_title body-title-header">READY TO BUY?</h1>
              <p class="text-secondary"> All you need to buy DOGE20 tokens at the lowest presale price is a decentralised wallet containing ETH, BNB, or USDT. Simply connect to the widget above to swap tokens!</p>
              <a type="button" className="btn-primary btn-left" onClick={scrollToBuySection}> BUY NOW <img src="/img/go-right.svg" /></a>
            </div>
            <div className="col-12 col-md-6 setion_header">
              <div className="tokenomics-box">
                <h3 className="font-18 fw-bold text-dark">Returns Calculator</h3>
                <p className="font-18 px-3 mb-3 text-center text-lg-start">Input the amount of DOGE20 you’re purchasing, and see what it would be worth at different prices.</p>
                <div className="align-items-center justify-content-between">
                  <label className="d-block  font-16 text-uppercase fw-bold  text-dark">If I buy </label>
                  <div className="font-16 text-align-right fw-bold  text-dark">(${iBuy})</div>
                </div>
                <div className="amountField position-relative">
                  <input type="text" value={inputValue} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="0" className="form-control input-rewards text-truncate text-mid-grey" />
                  <div className="amountType">
                    <img src="/img/badge.png" className="img-badge" />
                  </div>
                  <p className="font-12 text-purple fw-bold text-start padding-top-20"> And the token price reaches:  $0.00007</p>
                </div>
                {/* <div className="progress-bar-container">
                  <input
                    type="range"
                    min="0"
                    max="93"
                    value={progress}
                    step="1"
                    onChange={handleChangePropressBar}
                    className="progress-bar"
                  />
                  <div className="progress-value">{progress}</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
