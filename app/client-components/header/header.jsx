'use client'; // This component will run on the client side

import React, { useState, useEffect,useMemo } from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import './header.css'
import './header.mobile.css'
import { BuyForm } from "../buyform/buyform";

export const Header = () => {
  const sectionText = useI18nSection('buyForm')
  const currentLanguage = useLanguage()

  return (
    <div id="intro" className='intro'>
      <div className="intro-content">
          
          <div className="intro-content-left">
            <div className="intro-heading1">
                    $WEPE Token

            </div>

            <div className="intro-heading2">
                    WALL STREET
            </div>
            <div className="intro-heading3">
                    PEPE
            </div>

            <img className="btm-img" src="/img/wepe/wepe-mascot.gif"/>
            <img className="arrow1"  src="/img/wepe/left-arrow-1.svg"/>
            <img className = "arrow2" src="/img/wepe/left-arrow-2.svg"/>

           

          </div>
          <div className="intro-content-mid">
              <h2 className="heading1">
                  Trade Like Pepe. Buy $WEPE!
              </h2>

              <p className="heading2">
                  Wall Street Pepe hates that whales are hiding in insider groups. So he decided to make his own. Join the WEPE Token Army - frogs strong together!

              </p>
              <div className="tag-list">
                  <div className="tag-item">
                    <img  src="/img/wepe/wobs-icon.svg"  className="tag-icon"/>
                    WEPE Community: Choose rich together!
                  </div>
                  <div className="tag-item">
                    <img  src="/img/wepe/wobs-icon.svg"  className="tag-icon"/>
                    WEPE Token Insights: Trade like a pro!
                  </div>
                  <div className="tag-item">
                    <img  src="/img/wepe/wobs-icon.svg"  className="tag-icon"/>
                    WEPE Picks: Mad degen plays!
                  </div>


              </div >    
              <div className="next-nav">
                  <h2>JOIN WEPE ARMY </h2>
                  <img src="/img/wepe/arrow-banner.svg" />
                  <img src="/img/wepe/home_arrow.svg" />

              </div>
          </div>

          <div className="intro-content-right">
              <BuyForm />
                  
          </div>

      </div>
    </div>
    // </div>
  );
};
