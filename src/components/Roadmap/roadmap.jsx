
import React from "react";
import { useI18nSection } from "../../utils/languageUtils";
import './roadmap.css'

export const RoadMap = () => {
  const sectionText = useI18nSection('buyGuide')

  return (
    <section id="howto" className="buy-wrapper d-flex justify-content-center align-items-center">
      <div >
        <h3 translate="" className="title mb-5 text-primary">{sectionText?.title}</h3>
        <div className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center roadmap-buy-container">
          <div className="box ng-star-inserted">
            <div className="d-flex justify-content-center align-items-center flex-column gap-3 mb-3">
              <div className="head">01</div>
              <h3 translate="" className="box-title mb-0">{sectionText?.section1?.title}</h3>
            </div>
            <p translate="" className="desc mb-0">{sectionText?.section1?.sub}</p>
          </div>
          <div className="box ng-star-inserted">
            <div className="d-flex justify-content-center align-items-center flex-column gap-3 mb-3">
              <div className="head">02</div>
              <h3 translate="" className="box-title mb-0">{sectionText?.section2?.title}</h3>
            </div>
            <p translate="" className="desc mb-0">{sectionText?.section2?.sub}</p>
          </div>
          <div className="box ng-star-inserted">
            <div className="d-flex justify-content-center align-items-center flex-column gap-3 mb-3">
              <div className="head">03</div>
              <h3 translate="" className="box-title mb-0">{sectionText?.section3?.title}</h3>
            </div>
            <p translate="" className="desc mb-0">{sectionText?.section3?.sub}</p>
          </div>
          <div className="box ng-star-inserted">
            <div className="d-flex justify-content-center align-items-center flex-column gap-3 mb-3">
              <div className="head">04</div>
              <h3 translate="" className="box-title mb-0">{sectionText?.section4?.title}</h3>
            </div>
            <p translate="" className="desc mb-0">{sectionText?.section4?.sub}</p>
          </div>

        </div>
      </div>
    </section>
  );
};
