'use client'; // This component will run on the client side

import React, { useState, useEffect } from "react";
import "./StakingApp.css";


// import Navbar from "../navbar/navbar";
import { Staking } from "../staking/staking";
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

// import { useParams } from "react-router-dom";
import { useSetLanguage } from "../../../redux/utils/languageUtils";

// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// });

const StakingApp = () => {
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
      {/* <Staking/> */}
      
    </div>
  );
};

export default StakingApp;
