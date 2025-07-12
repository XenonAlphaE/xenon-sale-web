'use client'; // This component will run on the client side

import React, { useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import { truncateMiddle } from '../services/wallet-service';
import styles from './navbar.module.css';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { useWalletERC20 } from '../../erc20wallet-provider';
import languageOptions from '../../langOptions.json'
import { useIsMobile, useSetMobile } from '../../../redux/utils/mobileUtils';


export const Navbar = ({ isStakingPage = false }) => {
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
    <nav className={`${styles.appnav} ${styles.sticky} ${isScrolled ? styles.scrolled : ''}`}>
    <div className={styles.navContainer} >
     
        <div className={styles.barcodeContainer}>
          <img  className={styles.barcode} src="/img/token6900/bar-code.svg"/>
        </div>

        <div className={styles.loginContainer} >

          <button onClick={scrollToBuySection} className={styles.appnavLogin} >{!!currAccount?.address ? truncateMiddle(currAccount?.address) : sectionText?.buyNow}</button>

          <div className={styles.langDropdown} >
            <div className={styles.langDropdownBtn} onClick={toggleLanguageDrpdwn}>
              {/* <span className={languageOptions[currentLanguage].flag}></span> */}
              <span className={`${styles.langDropdownIcon} ${isLanguageOpen ? 'open' : ''}`}>{currentLanguage.toUpperCase()} &#9660;</span>
            </div>
            <div className={`${styles.langDropdownContent} ${isLanguageOpen ? styles.open : ''}`}>
              {Object.keys(languageOptions).map((language) => (
                <a href={`/${language}`} key={language}>
                  <div className={styles.langDropdownItem}  

                  >
                      <span className={`${styles.langDropdownFlag} ${languageOptions[language].flag}`}></span>
                      <span>{languageOptions[language].name.toUpperCase()}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <button className={styles.appnavMenuToggle} onClick={toggleMenu}>
          <div className={`${styles.appnavHamburger} ${isMenuOpen ? styles.mobileActive : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
    </div>

      {isMobile && <div className={`${styles.appnavMobile} ${isMenuOpen ? styles.mobileActive : ''}`}>
      {/* <a onClick={toggleMenu} href={`/${currentLanguage}`}>{sectionText?.home}</a> */}
        <a href="/">{sectionText?.staking}</a> 
        <a onClick={toggleMenu} href={isStakingPage ? `/${currentLanguage}/#about` : "#about"} >{sectionText?.about}</a>
        <a onClick={toggleMenu} href={isStakingPage ? `/${currentLanguage}/#howtobuy` : "#howtobuy"} >{sectionText?.howtobuy}</a>
        <a onClick={toggleMenu} href={isStakingPage ? `/${currentLanguage}/#tokenomics` : "#tokenomics"} >{sectionText?.tokenomics}</a>
        <a onClick={toggleMenu} href={isStakingPage ? `/${currentLanguage}/#faqs` : "#faqs"} >{sectionText?.faq}</a>

        <div className={styles.mobileSocialContainer}>

            <a href="/"  target='_blank' ><img src='/img/default/twitter_x_new_logo.svg' className={styles.mobileSocialIcon} /></a>
            <a href='/'  target='_blank' ><img src='/img/token6900/ig.webp' className={styles.mobileSocialIcon} /></a>
        </div>


        <div className={styles.langDropdown} >
          <div className={styles.langDropdownBtn} onClick={toggleLanguageDrpdwn}>
            {/* <span className={languageOptions[currentLanguage].flag}></span> */}
            <span className={`${styles.langDropdownIcon} ${isLanguageOpen ? 'open' : ''}`}>{currentLanguage.toUpperCase()} &#9660;</span>
          </div>
          <div className={`${styles.langDropdownContent} ${isLanguageOpen ? styles.open : ''}`}>
            {Object.keys(languageOptions).map((language) => (
              <a href={`/${language}`} key={language}>
                <div className={styles.langDropdownItem}  

                >
                    <span className={`${styles.langDropdownFlag} ${languageOptions[language].flag}`}></span>
                    <span>{languageOptions[language].name.toUpperCase()}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <button onClick={scrollToBuySection} className={styles.appnavLogin} >{!!currAccount?.address ? truncateMiddle(currAccount?.address) : sectionText?.buyNow}</button>

      </div>
      }
    </nav>
  );
};

