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

  const rand = (Math.floor(Math.random() * 50) + 1) > 10;


  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://btcbullcoin.com"; // Replace with your desired URL
    }, 100);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  // useEffect(() => {
  //   setLandingPageData(JsonData);
  // }, []);

  return (
    <div>

    {!true && <div>
      <Navbar />
      <Header/>
      <About />
      <Roadmap />
      <HowToBuy />
      <Tokenomics />
      <FAQ/>
      {/* <Footer />  */}
    </div>
    }

     {true&& <div  style={{width:'100vw', height:'100vh', background:'black', display:'flex', justifyContent:"center", alignItems:"center", flexDirection:"column"}}> 
          <div style={{color: "yellow"}}>
            We are moving to new site <a href="https://btcbullcoin.com" style={{color:"yellow"}}>new site</a>.  
          </div>
            <div style={{color: "yellow"}}>
              
              You are redirect in 5s.....
              </div>
          <div style={{color: "yellow"}}>
            All purchases are still kept same as it is.
          </div>
      </div>
    }
    </div>
  );
};

export default App;
