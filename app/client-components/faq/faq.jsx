'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import { BuyForm } from '../buyform/buyform';

import './faq.css';
import './faq.mobile.css';
import { ClaimForm } from '../claimform/claimform';


export const FAQ = () => {
  const sectionText = useI18nSection('faqs')
  const currentLanguage = useLanguage()

  const [selectedIdx, setSelectedIdx] = useState()
  const handleSelectItem = (idx) => {
    if(idx === selectedIdx){
      setSelectedIdx('')
    }
    else{
      setSelectedIdx(idx)
    }
  }
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

            <div className="faq-content-left column-arrage">
                <h2 className='faq-heading'>{sectionText?.heading} </h2>
                <div className='list-items'>

                    <div className='list-item'>
                        <div
                          className={`list-item-title  ${selectedIdx === 0 ? 'active' : ''}`}
                          onClick={() => handleSelectItem(0)}
                            style={{backgroundColor:"rgb(255, 229, 151)"}}>

                            {sectionText?.title1}

                          <div  className={`list-item-number  ${selectedIdx === 0 ? 'active' : ''}`} />
                        </div>

                        <div className={`list-item-content  ${selectedIdx === 0 ? 'active' : ''}`}>
                        {sectionText?.desc1}
                        </div>
                    </div>
                    <div className='list-item'>
                        <div     className={`list-item-title  ${selectedIdx === 1 ? 'active' : ''}`}
                          onClick={() => handleSelectItem(1)} style={{backgroundColor:"rgb(255, 229, 151)"}}>

{sectionText?.title2}

                          <div  className={`list-item-number  ${selectedIdx === 1 ? 'active' : ''}`} />
                        </div>

                        <div className={`list-item-content  ${selectedIdx === 1 ? 'active' : ''}`}>
                        {sectionText?.desc2}

                        </div>
                    </div>

                    <div className='list-item'>
                        <div 
                          className={`list-item-title  ${selectedIdx === 2 ? 'active' : ''}`}
                          onClick={() => handleSelectItem(2)}
                          style={{backgroundColor:"rgb(255, 229, 151)"}} >

{sectionText?.title3}


                          <div
                          className={`list-item-number  ${selectedIdx === 2 ? 'active' : ''}`}

                          />
                        </div>

                        <div 
                            className={`list-item-content  ${selectedIdx === 2 ? 'active' : ''}`}>
{sectionText?.desc3}
                          </div>
                    </div>

                    <div className='list-item'>
                        <div 
                          className={`list-item-title  ${selectedIdx === 3 ? 'active' : ''}`}
                          onClick={() => handleSelectItem(3)}
                          style={{backgroundColor:"rgb(255, 229, 151)"}} >

{sectionText?.title4}



                          <div
                          className={`list-item-number  ${selectedIdx === 3 ? 'active' : ''}`}

                          />
                        </div>

                        <div 
                            className={`list-item-content  ${selectedIdx === 3 ? 'active' : ''}`}>
{sectionText?.desc4}
                        </div>
                    </div>
                </div>
                

            </div>
            <div className="faq-content-mid column-arrage">
                <img className='faq-img1' src='/img/wepe/wepenomics.gif' />
                <img className='faq-img2' src='/img/wepe/about-img.gif' />

                <div className='card'>
                {sectionText?.card}

                </div>
            </div>


            <div className="faq-content-right">
                <ClaimForm />
                      
            </div>
        </div>
    </div>
  );
};
