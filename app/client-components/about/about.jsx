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
                    <img className='about-features-img'  src='/img/btcbull/newsbtc-new.svg'/>
                    <div className='about-features-text'>
                         <h2>
                          {sectionText?.featuresIn}
                          
                        </h2> 

                    </div>
                    <img className='about-features-img'  src='/img/btcbull/coinpedia-new.svg'/>
                    <img className='about-features-img'  src='/img/btcbull/cryptopolitan-new.svg'/>
                </div>

                <div className='about-desc-container'>
                    <h2 className='about-desc-title'>{sectionText?.heading1} <span style={{color:'white'}}>{sectionText?.heading2}</span></h2>
                    <p className='about-desc-content'>
                    {sectionText?.desc}

                    </p>
                    <div className='about-buttons'>
                      <button className='about-buynow' onClick={scrollToBuySection}>                     
                        {sectionText?.buynow}
                      </button>
                    </div>
                    <img className='about-desc-img' src='/img/btcbull/about-bull.webp'/>
              </div>
              <div className='about-cards'>

                  <div className='about-card-item'>
                      <h3 className='about-card-title'>{sectionText?.cardTitle1}                     </h3>
                      <p className='about-card-desc'>
                      {sectionText?.cardDesc1}
                      </p>
                  </div>
                  <div className='about-card-item'>
                      <h3 className='about-card-title'>{sectionText?.cardTitle2}                     </h3>
                      <p className='about-card-desc'>
                      {sectionText?.cardDesc2}
                      </p>
                  </div>
                  <div className='about-card-item'>
                      <h3 className='about-card-title'>{sectionText?.cardTitle3}                     </h3>
                      <p className='about-card-desc'>
                      {sectionText?.cardDesc3}
                      </p>
                  </div>


              </div>
          </div>
          <img src='/img/btcbull/token-trucks.webp' style={{width:"100%"}}/>
          <img  className='about-decorate1' src='/img/btcbull/line.webp' />

        </div>
    );
};
