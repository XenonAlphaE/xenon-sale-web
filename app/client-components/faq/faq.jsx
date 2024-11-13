'use client';

import React, { useRef, useState, useEffect } from 'react';
import './faq.css';

export const FAQ = () => {
  return (
    <div id='faqs' className="faq-container">
        <div className='faq-images'>

        </div>
        <div className='faq-content'>
            <div className='faq-card-1'></div>
            <div className='faq-card-2'></div>
            <div className='faq-card-3'></div>
            <div className='faq-card-4'></div>
        </div>
    </div>
  );
};
