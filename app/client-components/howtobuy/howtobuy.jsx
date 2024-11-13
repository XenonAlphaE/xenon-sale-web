
'use client'; // This component will run on the client side

import React from 'react';
import { useI18nSection } from '../../../redux/utils/languageUtils';

import './howtobuy.css';
import {Carousel} from '../carousel/carousel'
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
      <div className='howtobuy-heading-wrapper'>
        <h3>Become a Flocker</h3>
      </div>
        <Carousel/> 
    </div>
  );
};