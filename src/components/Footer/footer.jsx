import React, { useState, useEffect } from 'react';
import { useI18nSection } from "../../utils/languageUtils";

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
    <div id="team">
      <div className="section footer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12 text-center">
              <h3 translate="" className="font-14 text-light mb-0">{sectionText?.sub}</h3>
              <p translate="" className="para font-14 px-sm-3 pt-2 pb-0 text-light ">{sectionText?.text}</p>
              <p translate="" className="para font-20 text-white">{sectionText?.copyRight}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
