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

  const [hashText, setHashText] = useState("");

  useEffect(() => {
    // Function to update the hash text
    const updateHashText = () => {
      const hash = window.location.hash; // Get the part after #
      setHashText(hash ? hash.substring(1) : ""); // Remove the leading # or set to empty string if no hash
    };

    // Set the initial hash value
    updateHashText();

    // Add event listener to listen for hash changes
    window.addEventListener("hashchange", updateHashText);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", updateHashText);
    };
  }, []);

// Function to render the component based on hash
const renderComponent = () => {
  switch (hashText.toLowerCase()) {
    case "howtobuy":
      return <HowToBuy />;
    default:
      return <Header />; // Default component
  }
};

  // useEffect(() => {
  //   setLandingPageData(JsonData);
  // }, []);

  return (
    <div>
      <Navbar />
      {renderComponent()}
      {/* <HowToBuy />  */}
      {/* <Header/> */}
       {/* <About />
      <Roadmap />
      <Tokenomics />
       <FAQ/>
      <Footer />    */}
      
    </div>
  );
};

export default App;
