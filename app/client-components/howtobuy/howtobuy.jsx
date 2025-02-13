
'use client'; // This component will run on the client side

import React from 'react';
import { useI18nSection } from '../../../redux/utils/languageUtils';

import './howtobuy.css';
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

          <AppSpinner/>
        </div>
    </div>
  );
};