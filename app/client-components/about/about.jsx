import React, { useState, useEffect } from 'react';
import "./about.css";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

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
        <div className='about-container' id="about">
            <div className='about-bg-outer'>
                <div className='about-bg-inner'>

                </div>
            </div>
        </div>
    );
};
