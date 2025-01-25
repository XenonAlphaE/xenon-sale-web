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
import { useWalletERC20 } from '../../erc20wallet-provider';

export const Navbar = () => {

  const walletETH = useWalletERC20()
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

  const mobileBuyNow = () => {
    if (!!currAccount.address) {
        walletETH.connect()
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
  }

  const scrollToBuySection = async () => {
    if (!!currAccount.address) {
      openAccountModal();
    }
    else {

      walletETH.connect()
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
          <img src="/img/wepe/token.svg" alt="Brand Logo" className="appnav-logo" />
        </a>

        <button onClick={mobileBuyNow} className="buy-btn-mobile" style={{background:"rgb(51, 255, 0)"}}>{!!currAccount?.address ? truncateMiddle(currAccount?.address) : sectionText?.buyNow}</button>

        <button className="appnav-menu-toggle" onClick={toggleMenu}>
          <div className={`appnav-hamburger ${isMenuOpen ? 'appnav-is-active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <div className={`appnav-navbar-menu`}>
        <a href="/staking">{sectionText?.staking}</a>
        <a href={`/${currentLanguage}`}>{sectionText?.home}</a>
        <a href="#about">{sectionText?.about}</a>
        <a href="#howtobuy">{sectionText?.howtobuy}</a>
        {/* <a href="#tokenomics">{sectionText?.tokenomics}</a> */}
        <a href="#faqs">{sectionText?.faq}</a>
      </div>
      <div className={`appnav-navbar-right`}>

        <div className="appnav-lang-login-container">
          <a  href="https://coinsult.net/projects/wall-street-pepe/" className="appnav-login" target='_blank' style={{background:"rgb(255, 211, 96)"}}>{sectionText?.audit}</a>
          <a href="/img/wepe/whitepaper.pdf" className="appnav-login" target='_blank' style={{background:"rgb(197, 35, 237)"}}>{sectionText?.whitePaper}</a>
          <button onClick={scrollToBuySection} className="appnav-login" style={{background:"rgb(51, 255, 0)"}}>{!!currAccount?.address ? truncateMiddle(currAccount?.address) : sectionText?.buyNow}</button>

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
        <a onClick={toggleMenu} href="/staking">{sectionText?.staking}</a>
        <a href={`/${currentLanguage}`}>{sectionText?.home}</a>
        <a href="#about" onClick={toggleMenu}>{sectionText?.about}</a>
        <a href="#howtobuy" onClick={toggleMenu}>{sectionText?.howtobuy}</a>
        {/* <a href="#tokenomics" onClick={toggleMenu}>{sectionText?.tokenomics}</a> */}
        <a href="#faqs" onClick={toggleMenu}>{sectionText?.faq}</a>
        <a href="/img/wepe/whitepaper.pdf" style={{color:"rgb(197, 35, 237)"}} target='_blank'>{sectionText?.whitePaper}</a>

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

      </div>
      }
    </nav>
  );
};

