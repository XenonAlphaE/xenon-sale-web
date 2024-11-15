'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import './faq.css';
import './faq.mobile.css';


export const FAQ = () => {
  const sectionText = useI18nSection('faqs')

  return (
    <div id='faqs' className="faq-container">
        <div className='faq-images'>
            <img src="/img/flockers/poof.svg" alt=""  style={{width:"60%"}}/>
            <img src="/img/flockers/join_us_desktop.gif" alt="" />
            <button  className="faq-buynow">{sectionText?.buynow}</button>
            </div>
        <div className='faq-content'>
            <h2 className='faq-heading'>{sectionText?.heading}
            </h2>
            <div className='faq-card-1'>
                <h3 className='faq-title'>{sectionText?.title1}</h3>
                <p className='faq-detail'>{sectionText?.desc1}</p>
            </div>
            <div className='faq-card-2'>
                <h3 className='faq-title'>{sectionText?.title2}</h3>
                <p className='faq-detail'>{sectionText?.desc2}</p>
            </div>
            <div className='faq-card-3'>
                <h3 className='faq-title'>{sectionText?.title3}</h3>
                <p className='faq-detail'>{sectionText?.desc3}</p>
            </div>
            <div className='faq-card-4'>
                <h3 className='faq-title'>{sectionText?.title4}</h3>
                <p className='faq-detail'>{sectionText?.desc4}</p>
            </div>
        </div>
    </div>
  );
};
