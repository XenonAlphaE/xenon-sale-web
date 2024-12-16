import React, { useState, useEffect } from 'react';
import "./about.css";
import "./about.mobile.css";
import { BuyForm } from '../buyform/buyform';

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
                <div className="about-content-left column-arrage">
                    <h2 className='about-heading'>WEPE Token </h2>
  
                    <div className='card-item'>
                        <div
                          className={`card-item-title `}
                          
                            >

                            What is WEPE Token?

                          <div  className={`card-item-number `} />
                        </div>

                        <div className={`card-item-content `}>
                        WEPE Token is the meme coin of Wall Street Pepe, who’s tired of whale groups controlling the crypto markets. So he’s creating his own - the WEPE Army! WEPE makes the calls that turn frogs into whales, transforming your trading game.
                        </div>
                    </div>
                

                    
                </div>
                <div className="about-content-mid column-arrage">
                    <img src='/img/wepe/WHALE.gif' width={'100%'} />
                </div> 


                <div className="about-content-right">
                    <BuyForm />
                          
                </div>
            </div>
        </div>
    );
};
