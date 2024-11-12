'use client'; // This component will run on the client side

import React, { useState, useEffect } from 'react';
// import Dropdown from './dropdown';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
// import { useNavigate, useParams } from 'react-router-dom';
import './navbar.css';
// import { useCurrentAddress } from '../../utils/nativeNetworkUtils';
// import {truncateMiddle} from '../../services/wallet-service'


export const Navbar = () => {
  // const navigate = useNavigate();
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
    fr: {
      flag: "fi fi-fr width-size",
      name: "Français",
      selectLanguage: "",
    },
    it: {
      flag: "fi fi-it width-size",
      name: "Italiano",
      selectLanguage: "",
    },
    pt: {
      flag: "fi fi-pt width-size",
      name: "Português",
      selectLanguage: "",
    },
    ru: {
      flag: "fi fi-ru width-size",
      name: "Русский",
      selectLanguage: "",
    },
    ar: {
      flag: "fi fi-sa width-size",
      name: "العربية",
      selectLanguage: "",
    },
    hi: {
      flag: "fi fi-in width-size",
      name: "हिन्दी",
      selectLanguage: "",
    },
    ko: {
      flag: "fi fi-kr width-size",
      name: "한국어",
      selectLanguage: "",
    },
    th: {
      flag: "fi fi-th width-size",
      name: "ไทย",
      selectLanguage: "",
    },
    nl: {
      flag: "fi fi-nl width-size",
      name: "Nederlands",
      selectLanguage: "",
    },
    tr: {
      flag: "fi fi-tr width-size",
      name: "Türkçe",
      selectLanguage: "",
    },
    pl: {
      flag: "fi fi-pl width-size",
      name: "Polski",
      selectLanguage: "",
    },
    sv: {
      flag: "fi fi-se width-size",
      name: "Svenska",
      selectLanguage: "",
    },
    el: {
      flag: "fi fi-gr width-size",
      name: "Ελληνικά",
      selectLanguage: "",
    },
    he: {
      flag: "fi fi-il width-size",
      name: "עברית",
      selectLanguage: "",
    },
    uk: {
      flag: "fi fi-ua width-size",
      name: "Українська",
      selectLanguage: "",
    },
    ms: {
      flag: "fi fi-my width-size",
      name: "Bahasa Melayu",
      selectLanguage: "",
    },
    id: {
      flag: "fi fi-id width-size",
      name: "Bahasa Indonesia",
      selectLanguage: "",
    },
    fa: {
      flag: "fi fi-ir width-size",
      name: "فارسی",
      selectLanguage: "",
    },
    bn: {
      flag: "fi fi-bd width-size",
      name: "বাংলা",
      selectLanguage: "",
    },
    ta: {
      flag: "fi fi-in width-size",  // Tamil also uses the India flag
      name: "தமிழ்",
      selectLanguage: "",
    },
  };
  const currentLanguage = useLanguage()

  
  // const {lang} = useParams()
  
  // const handleNavigation = () => {
  //   // Preserve the current path and search query, then append the hash
  //   navigate(`${window.location.pathname}${window.location.search}#tokenomics`);

  //   // Scroll to the element with the ID 'tokenomics'
  //   const targetElement = document.getElementById('tokenomics');
  //   if (targetElement) {
  //     targetElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };


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

  const toggleLanguageDrpdwn = () =>{
    setIsLanguageOpen(!isLanguageOpen);
  }


  const scrollToBuySection = () => {
    // Find the target section to scroll to
    let section = null;
   
      section = document.getElementById('intro');
    
    if (!section) {
      window.location = `/${currentLanguage}`
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
      debugger
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
            <img src="/img/flockers/logo.svg"  alt="Brand Logo" className="appnav-logo" />
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
       
        <a href={`/${currentLanguage}`}>{sectionText?.about}</a>
        <a href="#roadmap">{sectionText?.roadmap}</a>
        <a href="#tokenomics">{sectionText?.tokenomics}</a>
        <a href="#features">{sectionText?.features}</a>
        <a href="#features">{sectionText?.howtobuy}</a>
        <a href="#features">{sectionText?.whitePaper}</a>
      </div>
      <div className={`appnav-navbar-right`}>
        {/* <div className="appnav-social">
            <a href="https://x.com/Doge2014token">
              <img src="/img/flockers/twitter.svg" />
            </a>
            <a href="https://t.me/officialdoge2014token">
              <img src="/img/flockers/telegram.svg" />
            </a>
        </div> */}

        <div className="appnav-lang-login-container">
          <button onClick={scrollToBuySection} className="appnav-login">{sectionText?.buyNow}</button>
          
          <div className="appnav-lang-dropdown">
            <div className="appnav-lang-custom-dropdown" onClick={toggleLanguageDrpdwn}>
              {/* <span className={languageOptions[currentLanguage].flag}></span> */}
              <span className={`lang-dropdown-icon ${isLanguageOpen ? 'open' : ''}`}>{currentLanguage.toUpperCase()} &#9660;</span>
            </div>
            <div className={`lang-dropdown-content ${isLanguageOpen ? 'open' : ''}`}>
              {Object.keys(languageOptions).map((language) => (
                <a href={`/${language}`} key={language}>
                <div  className="lang-dropdown-item" 
                
                // onClick={() => handleChangeLanguage(language)}
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
        <a href={`/${currentLanguage}`}>{sectionText?.home}</a>
        <a href="#features" onClick={toggleMenu}>{sectionText?.features}</a>
        <a href="#tokenomics" onClick={toggleMenu}>{sectionText?.tokenomics}</a>
        <a href="#roadmap" onClick={toggleMenu} >{sectionText?.roadmap}</a>
        {/* <a href={`/community/en`}>Staking</a>
        <a href={`/community/en`}>Leaderboard</a> */}
        <a href="#howtobuy" onClick={toggleMenu}>{sectionText?.airdrop}</a>
        {/* <div style={{boxSizing:'border-box'}} >
            <a className='social-icon' href="https://x.com/Doge2014token" target='_blank'>
              <img src="/navbar/twitter-circle.svg" />
            </a>
            <a className='social-icon'  href="https://t.me/officialdoge2014token" target='_blank'>
              <img src="/navbar/telegram-circle.svg" />
            </a>
          </div> */}
        <div className="appnav-lang-dropdown">
          <div className="appnav-lang-custom-dropdown" onClick={toggleLanguageDrpdwn}>
            <span className={languageOptions[currentLanguage].flag}></span>
            <span className={`lang-dropdown-icon ${isLanguageOpen ? 'open' : ''}`}>{currentLanguage.toUpperCase()} &#9660;</span>
          </div>
          <div className={`lang-dropdown-content ${isLanguageOpen ? 'open' : ''}`}>
            {Object.keys(languageOptions).map((language) => (
              <a href={`/${language}`} key={language}>
              <div  className="lang-dropdown-item" 
              
              // onClick={() => handleChangeLanguage(language)}
              >
                  <span className={languageOptions[language].flag}></span>
                  <span>{languageOptions[language].name}</span>
                
              </div>
              </a>
            ))}
          </div>
        </div>
        <button onClick={scrollToBuySection} className="appnav-login">{sectionText?.buyNow}</button>

      </div>
      }
    </nav>
  );
};

