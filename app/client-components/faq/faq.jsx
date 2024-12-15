'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import { BuyForm } from '../buyform/buyform';

import './faq.css';
import './faq.mobile.css';


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
                <h2 className='faq-heading'>WEPE Token FAQs </h2>
                <div className='list-items'>

                    <div className='list-item'>
                        <div
                          className={`list-item-title  ${selectedIdx === 0 ? 'active' : ''}`}
                          onClick={() => handleSelectItem(0)}
                            style={{backgroundColor:"rgb(255, 229, 151)"}}>

                            What is WEPE Token?

                          <div  className={`list-item-number  ${selectedIdx === 0 ? 'active' : ''}`} />
                        </div>

                        <div className={`list-item-content  ${selectedIdx === 0 ? 'active' : ''}`}>
                        WEPE Token is the meme coin of Wall Street Pepe, who’s tired of whale groups controlling the crypto markets. So he’s creating his own - the WEPE Army! WEPE makes the calls that turn frogs into whales, transforming your trading game.
                        </div>
                    </div>
                    <div className='list-item'>
                        <div     className={`list-item-title  ${selectedIdx === 1 ? 'active' : ''}`}
                          onClick={() => handleSelectItem(1)} style={{backgroundColor:"rgb(255, 229, 151)"}}>

                            Why join the WEPE Army?

                          <div  className={`list-item-number  ${selectedIdx === 1 ? 'active' : ''}`} />
                        </div>

                        <div className={`list-item-content  ${selectedIdx === 1 ? 'active' : ''}`}>
                        WEPE Token is built to let meme coin degens trade with the wit, swagger, and confidence of WEPE himself. $WEPE token holders become part of the movement and get access to WEPE's exclusive trading calls and insights. Joining the WEPE Army could be your path to financial freedom!

                        </div>
                    </div>

                    <div className='list-item'>
                        <div 
                          className={`list-item-title  ${selectedIdx === 2 ? 'active' : ''}`}
                          onClick={() => handleSelectItem(2)}
                          style={{backgroundColor:"rgb(255, 229, 151)"}} >

                              When do I get my tokens?


                          <div
                          className={`list-item-number  ${selectedIdx === 2 ? 'active' : ''}`}

                          />
                        </div>

                        <div 
                            className={`list-item-content  ${selectedIdx === 2 ? 'active' : ''}`}>
                            You can claim your $WEPE tokens once the presale has ended and the token is launched. You’ll just need to connect the same wallet you used to buy and click claim.
                          </div>
                    </div>

                    <div className='list-item'>
                        <div 
                          className={`list-item-title  ${selectedIdx === 3 ? 'active' : ''}`}
                          onClick={() => handleSelectItem(3)}
                          style={{backgroundColor:"rgb(255, 229, 151)"}} >

                              How do I know WEPE token is safe?



                          <div
                          className={`list-item-number  ${selectedIdx === 3 ? 'active' : ''}`}

                          />
                        </div>

                        <div 
                            className={`list-item-content  ${selectedIdx === 3 ? 'active' : ''}`}>

                            $WEPE The WEPE Token site is built by huge Pepe fans using cutting edge technology to facilitate token swaps. You can also stake your $WEPE tokens securely.
                        </div>
                    </div>
                </div>
                

            </div>
            <div className="faq-content-mid column-arrage">
                <img className='faq-img1' src='/img/wepe/wepenomics.gif' />
                <img className='faq-img2' src='/img/wepe/about-img.gif' />

                <div className='card'>
                  "If I could be a rich WEPE or a poor WEPE, I’d choose rich every time!"


                </div>
            </div>


            <div className="faq-content-right">
                <BuyForm />
                      
            </div>
            </div>
    </div>
  );
};
