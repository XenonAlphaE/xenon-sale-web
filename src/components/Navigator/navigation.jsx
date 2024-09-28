import React, { useState, useEffect } from "react";

export const Navigation = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en"); // Default language is English
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Adjust the breakpoint as needed
    };

    handleResize(); // Check initial viewport width
    window.addEventListener('resize', handleResize); // Add event listener for window resize

    return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
  }, []);

  const languageOptions = {
    en: {
      flag: "fi fi-gb width-size",
      name: "English",
      selectLanguage: "EN",
    },
    cn: {
      flag: "fi fi-cn",
      name: "中文",
      selectLanguage: "选择语言",
    },
    es: {
      flag: "fi fi-es",
      name: "Español",
      selectLanguage: "Seleccionar Idioma",
    },
    jp: {
      flag: "fi fi-jp",
      name: "日本語",
      selectLanguage: "言語を選択",
    },
    vn: {
      flag: "fi fi-vn",
      name: "Tiếng Việt",
      selectLanguage: "Chọn Ngôn Ngữ",
    },
    de: {
      flag: "fi fi-de",
      name: "Deutsch",
      selectLanguage: "Sprache auswählen",
    },
  };

  const handleChangeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  const scrollToBuySection = () => {
    // Find the target section to scroll to
    const section = document.getElementById('intro');

    // Scroll to the section
    section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // <nav id="menu" className="navbar navbar-default navbar-fixed-top">
    //   <div >
    //     <div className="navbar-header">
    //       <button
    //         type="button"
    //         className="navbar-toggle collapsed"
    //         data-toggle="collapse"
    //         data-target="#bs-example-navbar-collapse-1"
    //         style={{float:'none', color:""}}
    //       >
    //         {" "}
    //         <span className="sr-only">Toggle navigation</span>{" "}
    //         <span className="icon-bar" style={{ backgroundColor: 'rgb(144, 34, 255)' }}></span>{" "}
    //         <span className="icon-bar" style={{ backgroundColor: 'rgb(144, 34, 255)' }}></span>{" "}
    //         <span className="icon-bar" style={{ backgroundColor: 'rgb(144, 34, 255)' }}></span>{" "}
    //       </button>
    //       <a className="navbar-brand page-scroll" href="#page-top" style={{float:'none'}}>
    //         <img src="/img/flockers/logo.svg" width={"262"} height={"78"} style={{ "display": "inline" }} />
    //       </a>{" "}
    //       <button className="navbar-toggle collapsed btn-buynow" style={{
    //         cursor: 'pointer',
    //         borderRadius: '8px',
    //         border: '1px solid #171717',
    //         textTransform: 'capitalize',
    //         color: "#2a2a2a",
    //         }}
    //         onClick={scrollToBuySection}>
    //           BUY NOW
    //         </button>

    //     </div>
    //     <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    //       <ul className="nav navbar-nav navbar-right">
    //         <li>
    //           <a href="#features" className="page-scroll">
    //             STAKING
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#about" className="page-scroll">
    //             ROADMAP
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#about" className="page-scroll">
    //             Tokenomics
    //           </a>
    //         </li>

    //         <li>
    //           <a href="#about" className="page-scroll">
    //           How To Buy 
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#about" className="page-scroll">
    //           Faqs
    //           </a>
    //         </li>

    //         <li>
    //           <a href="#portfolio" className="page-scroll">
    //             WHITEPAPER
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#contact" className="page-scroll">
    //             Comic Story
    //           </a>
    //         </li>
    //       </ul>
    //       {!isMobile&&
    //       <div className="buy-and-contact">
    //         <button className="btn-buynow" onClick={scrollToBuySection}>

    //           BUY NOW
    //         </button>
    //         <button className="noboder-nobackground">
    //           <a href="https://twitter.com/DOGE_COIN20" className="page-scroll">
    //             <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    //               <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#171717" />
    //               <path d="M18.8732 10C17.3538 10 16.122 11.2312 16.122 12.75C16.122 12.9795 16.1501 13.2024 16.2031 13.4156C14.55 13.4156 11.95 13.0556 10 10.6111C10 16.7222 12.6 18.4537 13.9 18.5556C12.925 19.4722 11.4058 20.1508 10 20.2784C10.6048 20.801 12.4992 20.9772 13.3708 21C17.8781 21 21.5415 17.3887 21.623 12.9028C22.4875 12.3677 22.898 10.917 23 10.6111C22.5789 11.0321 21.7 11.2222 20.9997 11.005C20.4951 10.3914 19.7299 10 18.8732 10Z" fill="#171717" />
    //             </svg>
    //           </a>
    //         </button>
    //         <button className="noboder-nobackground">
    //           <a href="https://t.me/DOGE_COIN20" className="page-scroll">
    //             <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    //               <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#171717" />
    //               <path d="M16 9C19.8387 9 23 12.1613 23 16C23 19.8669 19.8387 23 16 23C12.1331 23 9 19.8669 9 16C9 12.1613 12.1331 9 16 9ZM19.2177 13.7702C19.246 13.6855 19.246 13.6008 19.2177 13.4879C19.2177 13.4315 19.1613 13.3468 19.1331 13.3185C19.0484 13.2339 18.9073 13.2339 18.8508 13.2339C18.5968 13.2339 18.1734 13.375 16.2258 14.1935C15.5484 14.4758 14.1935 15.0403 12.1613 15.9435C11.8226 16.0847 11.6532 16.1976 11.625 16.3387C11.5968 16.5645 11.9637 16.6492 12.3871 16.7903C12.754 16.9032 13.2339 17.0444 13.4879 17.0444C13.7137 17.0444 13.9677 16.9597 14.25 16.7621C16.1411 15.4637 17.129 14.8145 17.1855 14.8145C17.2419 14.8145 17.2984 14.7863 17.3266 14.8145C17.3831 14.871 17.3831 14.9274 17.3548 14.9556C17.3266 15.0968 15.5484 16.7339 15.4355 16.8468C15.0403 17.2419 14.5887 17.496 15.2944 17.9476C15.8871 18.3427 16.2258 18.5968 16.8468 18.9919C17.2419 19.246 17.5524 19.5565 17.9476 19.5282C18.1452 19.5 18.3427 19.3306 18.4274 18.7944C18.6815 17.5806 19.1331 14.871 19.2177 13.7702Z" fill="#171717" />
    //             </svg>
    //           </a>
    //         </button>
    //         <button
    //           className="dropdown-toggle btn btn-default btn-english"
    //           type="button"
    //           data-toggle="dropdown"
    //           aria-haspopup="true"
    //           aria-expanded="false"
    //         >
    //           <span className={languageOptions[currentLanguage].flag}></span>
    //           {languageOptions[currentLanguage].selectLanguage}{" "}
    //           <span className="caret"></span>
    //         </button>
    //         <ul className="dropdown-menu">
    //           {Object.keys(languageOptions).map((language) => (
    //             <li key={language}>
    //               <a
    //                 href="#"
    //                 onClick={() => handleChangeLanguage(language)}
    //               >
    //                 <span className={languageOptions[language].flag}></span>
    //                 {languageOptions[language].name}
    //               </a>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //       }
    //     </div>
    //   </div>
    // </nav>
    <div className="header ng-star-inserted">
      <img />
      <div className="d-flex justify-content-between align-items-center w-100 menu-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-start w-100">
            <a className="cursor-pointer d-flex align-items-center p-0">
              <img src="img/flockers/logo.svg" style={{width: "262px", height: "78px"}} />
            </a>
            <div className="menu-item d-flex align-items-center py-2 mt-2">
              <a title="staking" className="text-uppercase font-family-primary" href="/en/staking">Staking</a>
              <a className="mx-2 text-uppercase font-family-primary ng-star-inserted" title="roadmap" href="/en#roadmap"> Roadmap </a>
              <a className="mx-2 text-uppercase font-family-primary ng-star-inserted" title="tokenomics" href="/en#tokenomics"> Tokenomics </a>
              <a className="mx-2 text-uppercase font-family-primary ng-star-inserted" title="how-to-buy" href="/en#how-to-buy"> How To Buy </a>
              <a className="mx-2 text-uppercase font-family-primary ng-star-inserted" title="faq" href="/en#faq"> FAQS </a>
              <a href="/assets/documents/white-paper.pdf" target="_blank" className="text-uppercase font-family-primary">WhitePaper</a>
              <a title="comicstory" className="mx-2 text-uppercase font-family-primary" href="/en/comicstory"> Comic Story </a>
              <div className="btn btn-primary py-2 head d-flex align-items-center font-25 ms-4 text-uppercase ng-star-inserted">
                Buy Now!
              </div>
              <div dropdown="" className="btn-group language ms-4 text-white">
                <div dropdowntoggle="" type="button" className="dropdown-toggle amountType d-flex align-items-center" aria-haspopup="true" aria-expanded="false">
                  <div className="font-24 text-uppercase fw-semibold">en
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
