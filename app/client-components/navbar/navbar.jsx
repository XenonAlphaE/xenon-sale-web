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
import { useWalletERC20 } from '../../erc20wallet-provider';
import languageOptions from '../../langOptions.json'
import { useIsMobile, useSetMobile } from '../../../redux/utils/mobileUtils';


export const Navbar = () => {
  const { openAccountModal } = useAccountModal();
  const currAccount = useAccount()

  const currentLanguage = useLanguage()

  // const currentAddress = useCurrentAddress()
  const setIsMobile = useSetMobile();
  const isMobile = useIsMobile()
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionText = useI18nSection("nav")
  const walletEth = useWalletERC20()

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
      toggleMenu()
      openAccountModal();
    }
    else {
        toggleMenu()
        walletEth?.connect()
    }
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
    <div className='nav-container'>
      <div className="appnav-navbar-brand">
        <a href="/">
        <img src="/img/btcbull/logo.png" alt="Brand Logo" className="appnav-logo" />
        </a>

          {/* <button onClick={mobileBuyNow} className="buy-btn-mobile" >{!!currAccount?.address ? truncateMiddle(currAccount?.address) : sectionText?.buyNow}</button> */}

        <button className="appnav-menu-toggle" onClick={toggleMenu}>
          <div className={`appnav-hamburger ${isMenuOpen ? 'appnav-is-active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

        <div className={`appnav-navbar-menu`}>
          {/* <a href="/staking">Staking</a> */}
          <a href="#about">{sectionText?.about}</a>
          {/* <a href={`/${currentLanguage}`}>{sectionText?.home}</a> */}
          <a href="#howtobuy">{sectionText?.howtobuy}</a>
          <a href="#tokenomics">{sectionText?.tokenomics}</a>
          {/* <a href="#roadmap">{sectionText?.roadmap}</a> */}
          <a href="#faqs">{sectionText?.faq}</a>
          {/* <a href="/white-paper.pdf" target='_blank'>{sectionText?.whitePaper}</a> */}
        </div>
      <div className={`appnav-navbar-right`}>

        <div className="appnav-lang-login-container">
            {/* <a href="https://x.com/Pepetocoin"  target='_blank' ><img src='/img/pepeto/twitter.svg' className='appnav-social-icon' /></a>
            <a href="https://t.me/pepeto_channel"  target='_blank' ><img src='/img/pepeto/telegram.svg' className='appnav-social-icon' /></a> */}

        <a className="appnav-whitepaper" >{sectionText?.whitePaper}</a>
        <button onClick={scrollToBuySection} className="appnav-login" >{!!currAccount?.address ? truncateMiddle(currAccount?.address) : sectionText?.buyNow}</button>

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
                      <span className={`lang-dropdown-flag ${languageOptions[language].flag}`}></span>
                      <span>{languageOptions[language].name.toUpperCase()}</span>
                  </div>
                </a>
              ))}
            </div>
            </div>
          </div>
          <a href="https://x.com/BTCBULL_TOKEN"  target='_blank' ><img src='/img/default/twitter2.svg' className='appnav-social-icon' /></a>
          <a href="https://t.me/BTC_Bull_Token"  target='_blank' ><img src='/img/default/telegram2.svg' className='appnav-social-icon' /></a>
      </div>
    </div>

      {isMobile && <div className={`appnav-navbar-menu-mobile ${isMenuOpen ? 'appnav-is-active' : ''}`}>
      {/* <a onClick={toggleMenu} href={`/${currentLanguage}`}>{sectionText?.home}</a> */}
        <a onClick={toggleMenu} href="#about">{sectionText?.about}</a>
        <a onClick={toggleMenu} href="#howtobuy">{sectionText?.howtobuy}</a>
        <a onClick={toggleMenu} href="#tokenomics">{sectionText?.tokenomics}</a>
        <a onClick={toggleMenu} href="#faqs">{sectionText?.faq}</a>
        {/* <a href="/staking">Staking</a> */}

        <div className='social-container'>

          <a href="https://x.com/BTCBULL_TOKEN"  target='_blank' ><img src='/img/default/twitter2.svg' className='appnav-social-icon' /></a>
          <a href="https://t.me/BTC_Bull_Token"  target='_blank' ><img src='/img/default/telegram2.svg' className='appnav-social-icon' /></a>
        </div>


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
                <span className={`lang-dropdown-flag ${languageOptions[language].flag}`}></span>
                <span>{languageOptions[language].name}</span>

                </div>
              </a>
            ))}
          </div>
        </div>
        <button onClick={scrollToBuySection} className="appnav-login" >{!!currAccount?.address ? truncateMiddle(currAccount?.address) : sectionText?.buyNow}</button>

      </div>
      }
    </nav>
  );
};

