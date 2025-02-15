
'use client'; // This component will run on the client side

import React from 'react';
import { useI18nSection } from '../../../redux/utils/languageUtils';

import './howtobuy.css';
import './howtobuy.mobile.css';
import {Carousel} from '../carousel/carousel'
import { AppSpinner } from '../spinner/spinner';
export const HowToBuy = () => {
    const sectionText = useI18nSection('howtobuy')

    const scrollToBuySection = () => {
        // Find the target section to scroll to
        let section = null;
      
        section = document.getElementById('intro');
        
        if (!section) {
          window.location = "/"
          return
        }
        // Scroll to the section
        section.scrollIntoView({ behavior: 'smooth' });
      };

  return (
    <div id="howtobuy" className='howtobuy-container'>
        <div className='howtobuy-container-overlay'> </div>
        <div className='howtobuy-content'> 
          <h3 className="howtobuy-heading">{sectionText?.heading1} <span style={{color:"white"}}> {sectionText?.heading2} </span> </h3>

              <div className='howtobuy-card howtobuy-card1'>
                  <div className='howtobuy-card-title'>{sectionText?.title1}</div>
                  <p className='howtobuy-card-content'>
                  {sectionText?.desc1}
                  </p>
                  <img className='howtobuy-card-img' src='/img/btcbull/btcbull-icon.svg'/>
              </div>
              <div className='howtobuy-card howtobuy-card2'>
                  <div className='howtobuy-card-title'>{sectionText?.title2}</div>
                  <p className='howtobuy-card-content'>

                  {sectionText?.desc2}
                  </p>
                  <img className='howtobuy-card-img' src='/img/btcbull/btcbull-icon.svg'/>
              </div>
              <div className='howtobuy-card howtobuy-card3'>
                  <div className='howtobuy-card-title'>
                  {sectionText?.title3}
                  </div>
                  <p className='howtobuy-card-content'>

                  {sectionText?.desc3}


                  </p>
                  <img className='howtobuy-card-img' src='/img/btcbull/btcbull-icon.svg'/>
              </div>
              <div className='howtobuy-card howtobuy-card4'>
                  <div className='howtobuy-card-title'>
                  {sectionText?.title4}

                  </div>
                  <p className='howtobuy-card-content'>
                  {sectionText?.desc4}
                  </p>
                  <img className='howtobuy-card-img' src='/img/btcbull/btcbull-icon.svg'/>
              </div>
        </div>
    </div>
  );
};