'use client'; // This component will run on the client side

import React, { useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import { truncateMiddle } from '../services/wallet-service';
import './navbar.css';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import languageOptions from '../../langOptions.json'


export const Navbar = () => {
  const { openAccountModal } = useAccountModal();
  const currAccount = useAccount()

  const currentLanguage = useLanguage()

  // const currentAddress = useCurrentAddress()
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionText = useI18nSection("nav")


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);


  const displayBtn = false;


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageDrpdwn = () => {
    setIsLanguageOpen(!isLanguageOpen);
  }


  const scrollToBuySection = async () => {
    if (!!currAccount.address) {
      openAccountModal();
    }
    else {

      // Find the target section to scroll to
      let section = null;

      section = document.getElementById('intro');

      if (!section) {
        window.location = `/${currentLanguage}`
        return
      }
      // Scroll to the section
      section.scrollIntoView({ behavior: 'smooth' });
    }
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

    // <div className='container'> 
    <nav className={`appnav-navbar sticky ${isScrolled ? 'scrolled' : ''}`}>

      <div className="appnav-navbar-brand">
        <a href="/">
          <img src="/img/flockers/logo.svg" alt="Brand Logo" className="appnav-logo" />
        </a>
        <button className="appnav-menu-toggle" onClick={toggleMenu}>
          <div className={`appnav-hamburger ${isMenuOpen ? 'appnav-is-active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <div className={`appnav-navbar-menu`}>
              
        <a href="#staking" onClick={toggleMenu}>{sectionText?.staking}</a>
        <a href="#about">{sectionText?.about}</a>
        <a href="#howtobuy">{sectionText?.howtobuy}</a>
        <a href={`/${currentLanguage}`}>{sectionText?.home}</a>
        <a href="#roadmap">{sectionText?.roadmap}</a>
        <a href="#tokenomics">{sectionText?.tokenomics}</a>
        <a href="#faqs">{sectionText?.faq}</a>
        <a href="/white-paper.pdf" target='_blank'>{sectionText?.whitePaper}</a>
      </div>
      <div className={`appnav-navbar-right`}>

        <div className="appnav-lang-login-container">
    
          <button onClick={scrollToBuySection} className="appnav-login">{!!currAccount?.address ? truncateMiddle(currAccount?.address) : sectionText?.buyNow}</button>
          <div className='appnav-social'>
            <a  href="https://t.me/pepebuldakchannel"  target='_blank' ><img src='/img/flockers/telelogo.svg' /></a>
            <a  href="https://x.com/pepebuldak" target='_blank' ><div ><img  src='/img/flockers/xlogo.svg' /></div></a>
          </div>
          <div className="appnav-lang-dropdown">
            <div className="appnav-lang-custom-dropdown" onClick={toggleLanguageDrpdwn}>
              {/* <span className={languageOptions[currentLanguage].flag}></span> */}
              <span className={`lang-dropdown-icon ${isLanguageOpen ? 'open' : ''}`}>{currentLanguage.toUpperCase()} &#9660;</span>
            </div>
            <div className={`lang-dropdown-content ${isLanguageOpen ? 'open' : ''}`}>
              {Object.keys(languageOptions).map((language) => (
                <a href={`/${language}`} key={language}>
                  <div className="lang-dropdown-item"

                  >
                    <span className={languageOptions[language].flag}></span>
                    <span>{languageOptions[language].name.toUpperCase()}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isMobile && <div className={`appnav-navbar-menu-mobile ${isMenuOpen ? 'appnav-is-active' : ''}`}>
      
        <a href="#staking" onClick={toggleMenu}>{sectionText?.staking}</a>
        {/* <a href={`/${currentLanguage}`}>{sectionText?.home}</a> */}
        <a href="#about" onClick={toggleMenu}>{sectionText?.about}</a>
        <a href="#roadmap" onClick={toggleMenu}>{sectionText?.roadmap}</a>
        <a href="#tokenomics" onClick={toggleMenu}>{sectionText?.tokenomics}</a>
        <a href="#faqs" onClick={toggleMenu}>{sectionText?.faq}</a>
        <a href="/white-paper.pdf" target='_blank'>{sectionText?.whitePaper}</a>

        <div className="appnav-lang-dropdown">
          <div className="appnav-lang-custom-dropdown" onClick={toggleLanguageDrpdwn}>
            <span className={languageOptions[currentLanguage].flag}></span>
            <span className={`lang-dropdown-icon ${isLanguageOpen ? 'open' : ''}`}>{currentLanguage.toUpperCase()} &#9660;</span>
          </div>
          <div className={`lang-dropdown-content ${isLanguageOpen ? 'open' : ''}`}>
            {Object.keys(languageOptions).map((language) => (
              <a href={`/${language}`} key={language}>
                <div className="lang-dropdown-item"
                >
                  <span className={languageOptions[language].flag}></span>
                  <span>{languageOptions[language].name}</span>

                </div>
              </a>
            ))}
          </div>
        </div>
        <button onClick={scrollToBuySection} className="appnav-login">{!!currAccount?.address ? truncateMiddle(currAccount?.address) : sectionText?.buyNow}</button>

      </div>
      }
    </nav>
  );
};

