import React, { useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import './footer.css'

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionText = useI18nSection('footer')

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Adjust the breakpoint as needed
    };

    handleResize(); // Check initial viewport width
    window.addEventListener('resize', handleResize); // Add event listener for window resize

    return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
  }, []);


  return (
    <div id="footer" className="footer-container">
        <img  src='/img/flockers/token.svg' width={112} height={112}/>
        <p translate="" className="copyright">{sectionText?.copyRight}</p>
        <p translate="" className="copyright ">{sectionText?.text}</p>
    </div>
  );
};
