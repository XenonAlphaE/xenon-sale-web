import React, { useState, useEffect } from "react";
import { Header } from "./components/header";
import { About } from "./components/about/about";
import { TokenNomics } from "./components/tokenomics/tokenomics1";
import { Footer } from "./components/Footer/footer";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import Navbar from "./components/navbar/navbar";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div id="container">
      <Navbar />
      <Header/>
      <About />
      <TokenNomics />
      <Footer /> 
    </div>
  );
};

export default App;
