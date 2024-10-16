import React, { useState, useEffect } from 'react';
import "./about.css";
import { useI18nSection } from "../../utils/languageUtils";

export const About = () => {
    const sectionText = useI18nSection('about')
    const [isMobile, setIsMobile] = useState(false);
    const scrollToBuySection = () => {
        // Find the target section to scroll to
        let section = null;
        if(isMobile){
          section = document.getElementById('buyForm');
        }else{
          section = document.getElementById('intro');
        }
        if (!section) {
          window.location = "/"
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
        <div id="about">
            <section id="about" className="about">
            <div className='row inside'>

                    <div className="col-12 col-md-7 " style={{position:'relative'}}>
                        <div className="about-content">
                            <p>{sectionText?.description1}</p>
                            <p>{sectionText?.description2}</p>
                            <p>{sectionText?.description3}</p>
                            <p>{sectionText?.description4}</p>
                            <p>{sectionText?.description5}</p>
                            <div className='btn-container'>
                                <button className='buy-btn' onClick={scrollToBuySection}>  {sectionText?.buyNow} </button>
                            </div>
                        </div>
                        <img className='about-content-welcome' src='/img/flockers/welcome-about.png' />
                        <img className='about-content-wtf' src='/img/flockers/wtf-img.svg' />
                    </div>
                    <div className="col-12 col-md-5 img-banner">
                        <img className='banner-img1' src='/img/flockers/king-img.gif' />
                        {/* <img className='banner-img2' src='/img/flockers/zap-img.svg' /> */}
                    </div>
            </div>
            </section>
        </div>
    );
};
