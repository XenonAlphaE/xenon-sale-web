import React from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import './tokenomics.css'

export const Tokenomics = () => {
  const tokenomicsSection = useI18nSection('tokenomics')

  return (
    <section id="tokenomics" className="tokenomics-container">

        <div className="tokenomics-text">
            <h3>flockenomics</h3>
            <div className="tks-content-grid  ">
                <div className="tks-content-card">
                    <p className="tks-content-card-title"> Flock Vault (25%)</p>
                    <p className="tks-content-card-desc"> 25% is stored in the DAO Vault. This is the $FLOCK treasure chest, used to collectively allocate the Kingdom’s vast riches. The more you vote, the more you earn.</p>
                </div>
                <div className="tks-content-card">
                    <p className="tks-content-card-title"> Flock Vault (25%)</p>
                    <p className="tks-content-card-desc"> 25% is stored in the DAO Vault. This is the $FLOCK treasure chest, used to collectively allocate the Kingdom’s vast riches. The more you vote, the more you earn.</p>
                </div>
                <div className="tks-content-card">
                    <p className="tks-content-card-title"> Flock Vault (25%)</p>
                    <p className="tks-content-card-desc"> 25% is stored in the DAO Vault. This is the $FLOCK treasure chest, used to collectively allocate the Kingdom’s vast riches. The more you vote, the more you earn.</p>
                </div>
                <div className="tks-content-card">
                    <p className="tks-content-card-title"> Flock Vault (25%)</p>
                    <p className="tks-content-card-desc"> 25% is stored in the DAO Vault. This is the $FLOCK treasure chest, used to collectively allocate the Kingdom’s vast riches. The more you vote, the more you earn.</p>
                </div>
                <div className="tks-content-card">
                    <p className="tks-content-card-title"> Flock Vault (25%)</p>
                    <p className="tks-content-card-desc"> 25% is stored in the DAO Vault. This is the $FLOCK treasure chest, used to collectively allocate the Kingdom’s vast riches. The more you vote, the more you earn.</p>
                </div>
            </div>
        </div>
        <div className="tokenomics-img" >
            <img src="/img/flockers/flockenomic-graph.webp" style={{width:"100%", maxHeight:800}}/>
        </div>

        <img className="tks-bottom-img" src="/img/flockers/flockenomic-bird.gif" alt="flockenomic-bird"/>



    </section>
  );
};
