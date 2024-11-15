import React, { useState, useEffect } from "react";
import { BrandsCarousel } from "../components/brands-carousel/BrandsCarousel";
import { Footer } from "../components/Footer/footer";
import Navbar from "../components/navbar/navbar";
const Staking = () => {
 
  return (
    <div id="container">
        <Navbar />
        <BrandsCarousel />
        <Footer/>
    </div>
  );
};

export default Staking;
