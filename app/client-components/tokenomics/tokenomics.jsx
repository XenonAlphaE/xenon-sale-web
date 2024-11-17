import React from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import './tokenomics.css'
import './tokenomics.mobile.css'

export const Tokenomics = () => {
  const sectionText = useI18nSection('tokenomics')

  return (
    <section id="tokenomics" className="tokenomics-container">

        <div className="tokenomics-text">
            <h3>{sectionText?.heading}</h3>
            <div className="tks-content-grid  ">
                <div className="tks-content-card">
                    <p className="tks-content-card-title"> {sectionText?.title1}</p>
                    <p className="tks-content-card-desc"> {sectionText?.item1}</p>
                </div>
                <div className="tks-content-card">
                    <p className="tks-content-card-title"> {sectionText?.title2}</p>
                    <p className="tks-content-card-desc"> {sectionText?.item2}</p>
                </div>
                <div className="tks-content-card">
                    <p className="tks-content-card-title"> {sectionText?.title3}</p>
                    <p className="tks-content-card-desc"> {sectionText?.item3}</p>
                </div>
                <div className="tks-content-card">
                    <p className="tks-content-card-title"> {sectionText?.title4}</p>
                    <p className="tks-content-card-desc"> {sectionText?.item4}</p>
                </div>
                <div className="tks-content-card">
                    <p className="tks-content-card-title"> {sectionText?.title5}</p>
                    <p className="tks-content-card-desc"> {sectionText?.item5}</p>
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
