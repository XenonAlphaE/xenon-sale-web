'use client'; // This component will run on the client side

import React, {  } from "react";
import { useI18nSection } from "../../../redux/utils/languageUtils";

import './header.css'
import './header.mobile.css'
import { BuyForm } from "../buyform/buyform";
import PromoBanner from "./PromoBanner";
import PresaleSection from "./PresaleSection";

export const Header = () => {
  const sectionText = useI18nSection('header')

  return (
    <div id="intro" className='intro'>
      <div className="carousal-container">
          <div className="carousal-banner">
              <span className="intro-carousal-text">
                  🚨 BTC Hyper Coming! 🚨 don’t miss out on the next big meme Coin!.
              </span>  
              <span className="intro-carousal-text">
              🚨 BTC Hyper Coming! 🚨 don’t miss out on the next big meme Coin!.
              </span>  
              <span className="intro-carousal-text">
              🚨 BTC Hyper Coming! 🚨 don’t miss out on the next big meme Coin!.
              </span>  
              <span className="intro-carousal-text">
              🚨 BTC Hyper Coming! 🚨 don’t miss out on the next big meme Coin!.
              </span>  
              <span className="intro-carousal-text">
              🚨 BTC Hyper Coming! 🚨 don’t miss out on the next big meme Coin!.
              </span>  
              <span className="intro-carousal-text">
              🚨 BTC Hyper Coming! 🚨 don’t miss out on the next big meme Coin!.
              </span>  


          </div>
      </div>
      <div className="intro-main-content">

        <PromoBanner/>
        <div className="intro-content">
            <div className="intro-content-left">
                <PresaleSection/>

            </div>
            <div className="intro-content-right">
                <BuyForm/>
              
            </div>

        </div>
      </div>
    </div>
    // </div>
  );
};
