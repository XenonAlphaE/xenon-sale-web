import React from "react";

export const TokenNomics = () => {
  return (
    <div id="testimonials">
      <div className="container">
        <h1 className="setion_title text-center padding-bottom">TOKENOMICS</h1>
        <div className="row padding-bottom" >
          <div className="col-12 col-md-5">
            <div className="tokenomics-box">
              <img src="/img/badge.png" className="img-fluid tokenomics-image" />
              <h3 class="font-18 fw-bold text-dark">Token Information</h3>
              <p class="font-18 text-secondary px-3 mb-3 text-center text-lg-start">DOGE20 tokenomics include smart staking rewards, meaning you can earn right away.</p>
              <ul class="text-start">
                <li className="text-secondary">25% of supply sold in presale</li>
                <li className="text-secondary">25% allocated to marketing</li>
                <li className="text-secondary">25% for the project treasury</li>
                <li className="text-secondary">15% used for staking rewards</li>
                <li className="text-secondary">10% for exchange liquidity</li>
              </ul>
              <p class="text-center font-size-18">DOGE20 Token Address: 0x2541A36BE4cD39286ED61a3E6AFC2307602489d6</p>
            </div>
          </div>
          <div className=" col-12 col-md-5 d-flex justify-content-center">
            <img src="/img/tokenomics-chart.svg" className="postion-absolute" />
          </div>
          <div className=" col-12 col-md-2 " style={{minHeight: 100}}>
            <div className="chart-label  d-flex flex-wrap flex-row " style={{flexDirection:'row', flexWrap:'wrap'}}>
              <div class="d-flex align-items-center mb-3 bg-yellow">
                <span class="label bg-primary me-lg-3 me-2"></span>
                <div class="chart-label-info">
                  <h4 class="mb-0 text-purple">Presale</h4>
                  <p class="mb-0 text-dark">25%</p>
                </div>
              </div>
              {/* BLOCK 2 */}
              <div class="d-flex align-items-center mb-3">
                <span class="label bg-purple me-lg-3 me-2"></span>
                <div class="chart-label-info">
                  <h4 class="mb-0 text-purple">Marketing</h4>
                  <p class="mb-0 text-dark">25%</p>
                </div>
              </div>
              {/* BLOCK 3 */}
              <div class="d-flex align-items-center mb-3">
                <span class="label bg-light-blue me-lg-3 me-2"></span>
                <div class="chart-label-info">
                  <h4 class="mb-0 text-purple">Treasury</h4>
                  <p class="mb-0 text-dark">25%</p>
                </div>
              </div>
              {/* BLOCK 4 */}
              <div class="d-flex align-items-center mb-3">
                <span class="label bg-primary me-lg-3 me-2"></span>
                <div class="chart-label-info">
                  <h4 class="mb-0 text-purple">Staking</h4>
                  <p class="mb-0 text-dark">15%</p>
                </div>
              </div>
              {/* BLOCK 5 */}
              <div class="d-flex align-items-center mb-3">
                <span class="label bg-primary me-lg-3 me-2"></span>
                <div class="chart-label-info">
                  <h4 class="mb-0 text-purple">Liquidity</h4>
                  <p class="mb-0 text-dark">10%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
