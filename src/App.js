import React, { useState, useEffect } from "react";
import { Navigation } from "./components/Navigator/navigation";
import { Header } from "./components/header";
import { HeaderClaim } from "./components/header_claim";
import { OutMore } from "./components/ourmore/outmore";
import { Featured } from "./components/Featured/featured";
import { About } from "./components/about/about";
import { MediaContainer } from "./components/media-container/MediaContainer";
import { Rewards } from "./components/Rewards/rewards";
import { TokenNomics } from "./components/tokenomics/tokenomics1";
import { RoadMap } from "./components/Roadmap/roadmap";
import { Faqs } from "./components/Faqs/faqs";
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
      <OutMore />
      <MediaContainer /> 
      <Featured />
      <About />
      <Rewards />
      <TokenNomics />
      <RoadMap /> 
      <Faqs />
      <Footer /> 
    </div>
  );
};

export default App;
