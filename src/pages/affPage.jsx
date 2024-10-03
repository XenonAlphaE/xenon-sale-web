import React, { useState, useEffect } from "react";
import { BrandsCarousel } from "../components/brands-carousel/BrandsCarousel";
import { Footer } from "../components/Footer/footer";
import Navbar from "../components/navbar/navbar";
import { AffForm } from "../components/aff-form/affForm";
const AffPage = () => {
 
  return (
    <div id="container">
        <Navbar />
        <AffForm />
        <Footer/>
    </div>
  );
};

export default AffPage;
