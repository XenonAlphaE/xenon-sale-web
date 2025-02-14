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
  const [selectedIdx , setSelectedIdx] = useState();

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

 
  const handleSelectSection = (idx) => {
    if(selectedIdx === idx){
      setSelectedIdx("")
    }else{
      setSelectedIdx(idx)
    }
  }
  return (
    <div id='faqs' className="faq-container">
        <div className='faq-content'>
        <h3 className="faq-heading">{sectionText?.heading1} <span style={{color:"white"}}> {sectionText?.heading2} </span> </h3>
        <div className='faq-list'>
                {sectionText?.data?.map((sec,idx) => {
                  return(
                    <div key={idx} className='faq-list-item-container'>
                        <div className='faq-list-item'>
                          <div className='faq-list-item-title' onClick={() => handleSelectSection(idx)}> {sec?.title} </div>
                          <img src="/img/btcbull/angle-down.svg" alt="arrow" style={{height:19}}/>
                        </div>
                        <p className={`faq-list-item-content  ${selectedIdx===idx ? 'active' : ''}`}> {sec?.desc}
                        </p>
                    </div>
                  )
                })}
              
            </div>
        </div>

        <Footer/>
    </div>
  );
};
