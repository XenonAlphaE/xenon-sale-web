'use client'; // This component will run on the client side

import React, { useState, useEffect } from "react";
import styles from  "./App.module.css";
// import Navbar from "../navbar/navbar";
import { Header } from "../header/header";
import { Navbar } from "../navbar/navbar";
import {HowToBuy} from "../howtobuy/howtobuy"
// import { Carousel } from "../carousel/carousel";
// import { FeaturesGrid } from "../features/features";
import { Tokenomics } from "../tokenomics/tokenomics";
import { Roadmap } from "../roadmap/roadmap";
import { Footer } from "../footer/footer";
import { FAQ } from "../faq/faq";
// import { useParams } from "react-router-dom";
import { useSetLanguage } from "../../../redux/utils/languageUtils";
import About from "../about/about";
import TrustedBy from "../TrustedBy/TrustedBy";
import { AppSpinner } from "../spinner/spinner";
// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// });

const App = () => {
  const setLanguage = useSetLanguage()

  useEffect( () => {
    const langInput = document.getElementById("current-lang")
    setLanguage(langInput?.value || 'en')
  }, [])
  // useEffect(() => {
  //   setLandingPageData(JsonData);
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftPannel}></div>
      <div className={styles.centerPannel}>
          <Header/>
          {/* <TrustedBy/> */}
          {/* <About /> */}
          {/* <Roadmap /> */}
          {/* <HowToBuy /> */}
          {/* <TrustedBy/> */}
          {/* <Tokenomics /> */}
          {/* <FAQ/> */}
          {/* <Footer />  */}
          <AppSpinner/>
      </div>
      <div className={styles.rightPannel}>
      </div>

    </div>
  );
};

export default App;
