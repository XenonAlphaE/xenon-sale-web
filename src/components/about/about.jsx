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
                <div className="about-astro ng-star-inserted">
                    <div id="statisStyle">
                        <img src="img/wienerdog/lapxuong.gif" style={{width : "700px", maxWidth:'100%', height: "85%"}} />
                    </div>
                </div>
                <div >
                    <div className="about-dog ng-star-inserted">
                    <div id="statisStyleDog">
                        <img src="/img/wienerdog/logo.svg" style={{width: "100%",height: "100%", maxWidth: "227px",margin: "0px auto",maxHeight: "227px"}} />
                    </div>
                    </div>
                    <div className="row" style={{zIndex: 9000, margin: '0 50px'}}>
                        <h2 className="text-primary text-center font-lg-50 d-flex-sup">{sectionText.title}</h2>
                        <div className="d-flex justify-content-center d-flex-sup">
                            <p className="text-white font-20 text-center pt-2 mwx-770">
                                {sectionText.description}
                            </p>
                        </div>
                        <div className="col-xs-12 col-md-3 pt-lg-5 pt-3 ng-star-inserted">
                            <div className="about-box">
                                <h2 className="text-center font-28 text-white">
                                    {sectionText.section1.title}
                                </h2>
                                <p className="text-center font-20 para">
                                    {sectionText.section1.description}
                                </p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-3 pt-lg-5 pt-3 ng-star-inserted">
                            <div className="about-box">
                                <h2 className="text-center font-28 text-white">
                                    {sectionText.section2.title}
                                </h2>
                                <p className="text-center font-20 para">
                                    {sectionText.section2.description}
                                </p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-3 pt-lg-5 pt-3 ng-star-inserted">
                            <div className="about-box">
                                <h2 className="text-center font-28 text-white">
                                    {sectionText.section3.title}
                                </h2>
                                <p className="text-center font-20 para">
                                    {sectionText.section3.description}
                                </p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-3 pt-lg-5 pt-3 ng-star-inserted">
                            <div className="about-box">
                                <h2 className="text-center font-28 text-white">
                                    {sectionText.section4.title}
                                </h2>
                                <p className="text-center font-20 para">
                                    {sectionText.section4.description}
                                </p>
                            </div>
                        </div>
                        <p className="mx-auto d-block mwx-770 text-center font-20 my-5 text-white">
                            {sectionText?.subSection}
                        </p>
                        <div className="btn-wrapper d-flex-sup">
                            <button className="btn btn-primary px-5" onClick={scrollToBuySection}>
                                <span className="text-uppercase font-16">
                                    {sectionText?.buyNow}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
