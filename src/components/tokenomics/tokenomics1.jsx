import React from "react";
import { useI18nSection } from "../../utils/languageUtils";
import './tokenomics.css'

export const TokenNomics = () => {
  const tokenomicsSection = useI18nSection('tokenomics')
  const roadmap = useI18nSection('roadMap')

  return (
    <section id="tokenomics" className="tokenomics">
      <div className="position-relative">
        {/* <div className="story-fart">
            <div style={{width: "100%",height: "451px", maxWidth: "464px",margin: "0px auto", zIndex:-999999}}>
              <img src="img/wienerdog/right.svg" />
            </div>
        </div> */}
        <div className="row" style={{width: '100%'}}>
          <div className="col-lg-5 col-xs-12">
            <div className="tokenomics-info">
              <h3 translate="" className="section-title">{tokenomicsSection?.heading}</h3>
              <div className="info-cards">

                  <div className="info-card">
                    <p className="section-heading">{tokenomicsSection?.title1}</p>
                    <p className="section-desc">{tokenomicsSection?.item1}</p>
                  </div>
                  <div className="info-card">
                    <p className="section-heading">{tokenomicsSection?.title2}</p>
                    <p className="section-desc">{tokenomicsSection?.item2}</p>
                  </div>
                  <div className="info-card">
                    <p className="section-heading">{tokenomicsSection?.title3}</p>
                    <p className="section-desc">{tokenomicsSection?.item3}</p>
                  </div>
                  <div className="info-card">
                    <p className="section-heading">{tokenomicsSection?.title4}</p>
                    <p className="section-desc">{tokenomicsSection?.item4}</p>
                  </div>
                  <div className="info-card">
                    <p className="section-heading">{tokenomicsSection?.title5}</p>
                    <p className="section-desc">{tokenomicsSection?.item5}</p>
                  </div>

              </div>
              <div className="bottom-img">
                  <img src="/img/flockers/flockenomic-bird.gif" alt="flockenomic-bird"/>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-xs-12" >
              <img src="/img/flockers/flockenomic-graph.webp" style={{width:"100%", maxHeight:800}}/>
          </div>
        </div>
      </div>
      
    </section>
  );
};
