'use client';

import React, { useRef, useState, useEffect } from 'react';
import './faq.css';

export const FAQ = () => {
  return (
    <div id='faqs' className="faq-container">
        <div className='faq-images'>
            <img src="/img/flockers/poof.svg" alt=""  style={{width:"60%"}}/>
            <img src="/img/flockers/join_us_desktop.gif" alt="" />
            <button  className="faq-buynow">Buy and Stake Now FOR 1093%!</button>
            </div>
        <div className='faq-content'>
            <h2 className='faq-heading'>What’s Up, Mother Flockerz?
            </h2>
            <div className='faq-card-1'>
                <h3 className='faq-title'>What Is $FLOCK?</h3>
                <p className='faq-detail'>Flockerz ($FLOCK) is breaking new ground in decentralization. It is the first-of-its-kind Vote To Earn meme coin, where YOU have the power to control the destiny of the project, while earning rewards for your votes. Holders are in the driver’s seat, voting on all new proposals related to the future success of the project, and the growth of the community. This means there is no one leader, just a group of likeminded people working together to make $FLOCK great, and earning crazy rewards for their participation.</p>
            </div>
            <div className='faq-card-2'></div>
            <div className='faq-card-3'></div>
            <div className='faq-card-4'></div>
        </div>
    </div>
  );
};
