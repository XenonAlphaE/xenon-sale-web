import React from "react";
import { useI18nSection } from "../../utils/languageUtils";
import './tokenomics.css'

export const TokenNomics = () => {
  const tokenomicsSection = useI18nSection('tokenomics')
  const roadmap = useI18nSection('roadMap')

  return (
    <section id="tokenomics" className="tokenomics">
      <div className="position-relative">
        <div className="story-fart">
            <div style={{width: "100%",height: "451px", maxWidth: "464px",margin: "0px auto", zIndex:-999999}}>
              <img src="img/wienerdog/right.svg" />
            </div>
        </div>
        <div className="row" style={{width: '100%'}}>
          <div className="col-lg-5 col-xs-12">
            <div className="tokenomics-info infor-1">
              <h3 translate="" className="section-title text-start">{tokenomicsSection?.heading}</h3>
              <ul style={{listStyle : 'none'}}>
                <li translate="">{tokenomicsSection?.item1}</li>
                <li translate="">{tokenomicsSection?.item2}</li>
                <li translate="">{tokenomicsSection?.item3}</li>
                <li translate="">{tokenomicsSection?.item4}</li>
                <li translate="">{tokenomicsSection?.item5}</li>
              </ul>
              <p translate="" className="font-20 text-white mb-0 mt-5">{tokenomicsSection?.total}: 69.000.000.000</p>
            </div>
          </div>
          <div className="col-lg-2 col-xs-12"></div>
          <div className="col-lg-5 col-xs-12" style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
            <div className="tokenomics-info infor-2">
              <h2 translate="" className="section-title text-start text-capitalize pb-3">{roadmap?.title}</h2>
              <p translate="" className="section-title mb-0 font-28 text-start">{roadmap?.phase1?.title}</p>
              <ul className="ms-4">
                <li translate="">{roadmap?.phase1?.sub1}</li>
                <li translate="">{roadmap?.phase1?.sub2}</li>
                <li translate="">{roadmap?.phase1?.sub3}</li>
                <li translate="">{roadmap?.phase1?.sub4}</li>
                <li translate="">{roadmap?.phase1?.sub5}</li>
              </ul>
              <p translate="" className="section-title mb-0 font-28 text-start mt-4">{roadmap?.phase2?.title}</p>
              <ul className="ms-4">
                <li translate="">{roadmap?.phase2?.sub1}</li>
                <li translate="">{roadmap?.phase2?.sub2}</li>
                <li translate="">{roadmap?.phase2?.sub3}</li>
              </ul>
              <p translate="" className="section-title mb-0 font-28 text-start mt-4">{roadmap?.phase3?.title}</p>
              <ul className="ms-4">
                <li translate="">{roadmap?.phase3?.sub1}</li>
                <li translate="">{roadmap?.phase3?.sub2}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
