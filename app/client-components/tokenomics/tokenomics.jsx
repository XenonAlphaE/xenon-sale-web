import React from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import './tokenomics.css'
import './tokenomics.mobile.css'

export const Tokenomics = () => {
  const sectionText = useI18nSection('tokenomics')

  return (
    <section id="tokenomics" className="tokenomics-container">
        <div className="tokenomics-content">
            <img className="tokenomics-decorate1" src="/img/btcbull/tokenomics-bull.webp" alt="tokenomics-bull"/>

            <h3 className="tokenomics-heading">BTC Bull <span style={{color:"white"}}> Tokenomics </span> </h3>
            <div className="tokenomics-details-container">
                <div className="tokenomics-cards">
                  
                    <div className="tokenomics-card-item">
                        <div className="tokenomics-card-figure">
                            <span> 15% </span>
                            <img className="tokenomics-card-img" src="/img/btcbull/tokenomic-circle1.svg"/>
                        </div>
                        <p className="tokenomics-card-desc">Bull Fund</p>
                    </div>
                    <div className="tokenomics-card-item">
                        <div className="tokenomics-card-figure">
                            <span> 15% </span>
                            <img className="tokenomics-card-img" src="/img/btcbull/tokenomic-circle1.svg"/>
                        </div>
                        <p className="tokenomics-card-desc">Bull Fund</p>
                    </div>
                    <div className="tokenomics-card-item">
                        <div className="tokenomics-card-figure">
                            <span> 10% </span>
                            <img className="tokenomics-card-img" src="/img/btcbull/tokenomic-circle1.svg"/>
                        </div>
                        <p className="tokenomics-card-desc">Bull Fund</p>
                    </div>
                    <div className="tokenomics-card-item">
                        <div className="tokenomics-card-figure">
                            <span> 10% </span>
                            <img className="tokenomics-card-img" src="/img/btcbull/tokenomic-circle1.svg"/>
                        </div>
                        <p className="tokenomics-card-desc">Bull Fund</p>
                    </div>
                    <div className="tokenomics-card-item">
                        <div className="tokenomics-card-figure">
                            <span> 10% </span>
                            <img className="tokenomics-card-img" src="/img/btcbull/tokenomic-circle1.svg"/>
                        </div>
                        <p className="tokenomics-card-desc">Bull Fund</p>
                    </div>
                    <div className="tokenomics-card-item">
                        <div className="tokenomics-card-figure">
                            <span> 45% </span>
                            <img className="tokenomics-card-img" src="/img/btcbull/tokenomic-circle.svg"/>
                        </div>
                        <p className="tokenomics-card-desc">Bull Fund</p>
                    </div>
                </div>
                <h2 className="tokenomics-total">Total Supply:  <span style={{color:"rgb(255, 199, 0)"}}>21,000,000,000</span></h2>
                <h2 className="tokenomics-address"></h2>
            </div>
        </div>
      

        <img src="/img/btcbull/grey-bottom-border.svg" style={{width:"100%"}} />

    </section>
  );
};
