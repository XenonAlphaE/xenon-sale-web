import React, { useState, useEffect } from "react";
import { BrandsCarousel } from "../components/brands-carousel/BrandsCarousel";
import { Footer } from "../components/Footer/footer";
import Navbar from "../components/navbar/navbar";
import { AffForm } from "../components/aff-form/affForm";
import { useSetLanguage } from "../utils/languageUtils";
import { useParams } from "react-router-dom";
const AffPage = () => {
  const {lang} = useParams()
  const setLanguage = useSetLanguage()
 
  useEffect( () => {
    setLanguage(lang || 'en')
}, )


  return (
    <div id="container">
        <Navbar />
        <AffForm />
        <Footer/>
    </div>
  );
};

export default AffPage;
