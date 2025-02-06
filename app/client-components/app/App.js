'use client'; // This component will run on the client side

import React, { useState, useEffect } from "react";
import "./App.css";
// import Navbar from "../navbar/navbar";
import { Header } from "../header/header";
import { Navbar } from "../navbar/navbar";
import { About } from "../about/about";
// import { Carousel } from "../carousel/carousel";
// import { FeaturesGrid } from "../features/features";
import { HowToBuy } from "../howtobuy/howtobuy";
import { Tokenomics } from "../tokenomics/tokenomics";
import { Roadmap } from "../roadmap/roadmap";
import { Footer } from "../footer/footer";
import { FAQ } from "../faq/faq";
// import { useParams } from "react-router-dom";
import { useSetLanguage } from "../../../redux/utils/languageUtils";
import { NewCoinForm } from "../newcoin/newcoin";
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
    <div>
      <Navbar />
      <NewCoinForm/>
      <button>Login</button>
      {/* <Header/> */}
      {/* <About /> */}
      {/* <Roadmap /> */}
      {/* <Tokenomics /> */}
      {/* <HowToBuy /> */}
      {/* <FAQ/> */}
      {/* <Footer />  */}
      
    </div>
  );
};

export default App;
