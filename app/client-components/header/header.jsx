'use client'; // This component will run on the client side

import React, {  } from "react";
import { useI18nSection } from "../../../redux/utils/languageUtils";

import './header.css'
import './header.mobile.css'
import { BuyForm } from "../buyform/buyform";

export const Header = () => {
  const sectionText = useI18nSection('header')

  return (
    <div id="intro" className='intro'>
      <div className="intro-content">
          
          <div className="intro-content-left">
              <div className="intro-text-container">
                <h1 className="intro-heading1"><span _ngcontent-ng-c406187462="">{sectionText?.heading1}:</span> {sectionText?.heading2}</h1>
                <h2 className="intro-heading2">{sectionText?.desc}</h2>
              </div>
              <img className="intro-banner" src="/img/btcbull/banner-img.webp" />
          </div>
          <div className="intro-content-right">
              <BuyForm/>
            
          </div>

      </div>
    </div>
    // </div>
  );
};
