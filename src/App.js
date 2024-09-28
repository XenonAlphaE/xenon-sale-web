import React, { useState, useEffect } from "react";
import { Navigation } from "./components/Navigator/navigation";
import { Header } from "./components/header";
import { OutMore } from "./components/ourmore/outmore";
import { Featured } from "./components/Featured/featured";
import { RoadMap } from "./components/Roadmap/roadmap";
import { Rewards } from "./components/Rewards/rewards";
import { TokenNomics } from "./components/Tokenmics/tokenomics";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { Footer } from "./components/Footer/footer";

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
      <Navigation />
      <Header data={landingPageData.Header} />
      <OutMore data={landingPageData.Features} />
      <Featured data={landingPageData.About} />
      <RoadMap data={landingPageData.Gallery} />
      <TokenNomics data={landingPageData.Testimonials} />
      <Rewards data={landingPageData.Contact} />
      <Footer/>
    </div>
  );
};

export default App;
