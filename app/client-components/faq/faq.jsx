'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import './faq.css';
import './faq.mobile.css';
import { Footer } from '../footer/footer';
import { AppSpinner } from '../spinner/spinner';


export const FAQ = () => {
  const sectionText = useI18nSection('faqs')
  const currentLanguage = useLanguage()

  const scrollToBuySection = () => {
    // Find the target section to scroll to
    let section = null;
   
      section = document.getElementById('intro');
    
    if (!section) {
      window.location = `/${currentLanguage}`
      return
    }
    // Scroll to the section
    section.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div id='faqs' className="faq-container">
        <div className='faq-content'>
          <AppSpinner/>
        </div>

        <Footer/>
    </div>
  );
};
