import React, { useState, useEffect } from 'react';
import Dropdown from './dropdown';
import { useI18nSection, useLanguage, useSetLanguage } from "../../utils/languageUtils";

import './navbar.css';
import { useCurrentAddress } from '../../utils/nativeNetworkUtils';
import {truncateMiddle} from '../../services/wallet-service'
const Navbar = () => {
  const languageOptions = {
    en: {
      flag: "fi fi-gb width-size",
      name: "English",
      selectLanguage: "",
    },
    zh: {
      flag: "fi fi-cn width-size",
      name: "中文",
      selectLanguage: "",
    },
    es: {
      flag: "fi fi-es width-size",
      name: "Español",
      selectLanguage: "",
    },
    jp: {
      flag: "fi fi-jp width-size",
      name: "日本語",
      selectLanguage: "",
    },
    vi: {
      flag: "fi fi-vn width-size",
      name: "Tiếng Việt",
      selectLanguage: "",
    },
    de: {
      flag: "fi fi-de width-size",
      name: "Deutsch",
      selectLanguage: "",
    },
  };
  const currentAddress = useCurrentAddress()
  const currentLanguage = useLanguage()
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const sectionText = useI18nSection('nav')
  const setLanguage = useSetLanguage()

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const handleChangeLanguage = (language) => {
    setLanguage(language);
    setIsLanguageOpen(false)
  };

  const displayBtn = currentAddress? truncateMiddle(currentAddress) : sectionText.buyNow


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageDrpdwn = () =>{
    setIsLanguageOpen(!isLanguageOpen);
  }

  const aboutItems = [
    { label: sectionText.about1, href: '/#about' },
    { label: sectionText.about2, href: '/#howto' },
    { label: sectionText.about3, href: '/#faq' }
  ];

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
    toggleMenu()
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Adjust the breakpoint as needed
    };
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
    };

    handleResize(); // Check initial viewport width
    window.addEventListener('resize', handleResize); // Add event listener for window resize
    window.addEventListener('scroll', handleScroll); // Add event listener for window scroll


    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
      window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
    }
  }, []);






  return (
    <nav className={`appnav-navbar sticky ${isScrolled ? 'scrolled' : ''}`}>
      <div className="appnav-navbar-brand">
        <a href="/">
          <img src="/img/wienerdog/logo.svg" width={"70"} height={"70"}  alt="Brand Logo" className="appnav-logo" />
        </a>        
        <button className="appnav-menu-toggle" onClick={toggleMenu}>
          <div className={`appnav-hamburger ${isMenuOpen ? 'appnav-is-active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      
      <div className={`appnav-navbar-menu ${isMenuOpen ? 'appnav-is-active' : ''}`}>
        <a href="/staking">{sectionText.staking}</a>
        <a href="/whitepaper.pdf">{sectionText.whitePaper}</a>
        <Dropdown title={sectionText.about} items={aboutItems} />
        <a href="/audit.pdf">{sectionText.audit}</a>
      </div>
      <div className={`appnav-navbar-right ${isMenuOpen ? 'appnav-is-active' : ''}`}>
        <div className="appnav-social">
            <a href="https://x.com/WienerDogAI">
              <img src="img/wienerdog/twitter.svg" />
            </a>
            <a href="https://t.me/wienersAI">
              <img src="img/wienerdog/telegram.svg" />
            </a>
        </div>

        <div className="appnav-lang-login-container">
          <button onClick={scrollToBuySection} className="appnav-login">{displayBtn}</button>
          
          <div className="appnav-lang-dropdown">
            <div className="appnav-lang-custom-dropdown" onClick={toggleLanguageDrpdwn}>
              <span className={languageOptions[currentLanguage].flag}></span>
              <span className={`lang-dropdown-icon ${isLanguageOpen ? 'open' : ''}`}>&#9660;</span>
            </div>
            <div className={`lang-dropdown-content ${isLanguageOpen ? 'open' : ''}`}>
              {Object.keys(languageOptions).map((language) => (
                <div key={language} className="lang-dropdown-item" onClick={() => handleChangeLanguage(language)}>
                  <span className={languageOptions[language].flag}></span>
                  <span>{languageOptions[language].name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
