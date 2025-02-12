import React, { useState, useEffect } from 'react';
import "./about.css";
import "./about.mobile.css";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

export const About = () => {
    const sectionText = useI18nSection('about')
    const [isMobile, setIsMobile] = useState(false);
    const currentLanguage = useLanguage()

    const scrollToBuySection = () => {
      // Find the target section to scroll to
      let section = null;
     
        section = document.getElementById('intro');
      
      if (!section) {
        window.location = `/${currentLanguage}`
        return
      }
      // Scroll to the section
      section.scrollIntoView({ behavior: 'smooth' });
    };
    
    
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 1024); // Adjust the breakpoint as needed
        };
    
        handleResize(); // Check initial viewport width
        window.addEventListener('resize', handleResize); // Add event listener for window resize
    
        return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
      }, []);
    return (
        <div className='about-container' id="about">
            <div className='about-content'>
                <div className='about-features-container'>
                    <img className='about-features-img'  src='/img/btcbull/cryptonews-new.svg'/>
                    <img className='about-features-img'  src='/img/btcbull/cryptonews-new.svg'/>
                    <div className='about-features-text'>
                         <h2>
                          Featured In
                          
                        </h2> 

                    </div>
                    <img className='about-features-img'  src='/img/btcbull/cryptonews-new.svg'/>
                    <img className='about-features-img'  src='/img/btcbull/cryptonews-new.svg'/>
                </div>

                <div className='about-desc-container'>
                    <h2 className='about-desc-title'>The Official <span style={{color:'white'}}>Bitcoin Meme Coin</span></h2>
                    <p className='about-desc-content'>
                        Bitcoin is the best-performing asset in history with an AAR of 230% – up more than 200 million percent since inception. Now jump on board for the ride of your life as the BTC Bull stampedes towards $250K BTC and beyond!


                    </p>
                    <button className='about-buynow' onClick={scrollToBuySection}> BUY NOW</button>
                    <img className='about-desc-img' src='/img/btcbull/about-bull.webp'/>
              </div>
              <div className='about-cards'>
                  <div className='about-card-item'>
                      <h3 className='about-card-title'>Earn Bitcoin Airdrops!                      </h3>
                      <p className='about-card-desc'>
                      Hold $BTCBULL tokens to receive BTC airdrops as the price of the greatest asset rises! A huge $BTCBULL airdrop also awaits the strongest hodlers when BTC hits $250,000, weighted by your Community Sale purchase amount.


                      </p>
                  </div>
                  <div className='about-card-item'>
                      <h3 className='about-card-title'>Earn Bitcoin Airdrops!                      </h3>
                      <p className='about-card-desc'>
                      Hold $BTCBULL tokens to receive BTC airdrops as the price of the greatest asset rises! A huge $BTCBULL airdrop also awaits the strongest hodlers when BTC hits $250,000, weighted by your Community Sale purchase amount.


                      </p>
                  </div>

                  <div className='about-card-item'>
                      <h3 className='about-card-title'>Earn Bitcoin Airdrops!                      </h3>
                      <p className='about-card-desc'>
                      Hold $BTCBULL tokens to receive BTC airdrops as the price of the greatest asset rises! A huge $BTCBULL airdrop also awaits the strongest hodlers when BTC hits $250,000, weighted by your Community Sale purchase amount.


                      </p>
                  </div>

              </div>
          </div>
          <img src='/img/btcbull/token-trucks.webp' style={{width:"100%"}}/>
          <img  className='about-decorate1' src='/img/btcbull/line.webp' />

        </div>
    );
};
