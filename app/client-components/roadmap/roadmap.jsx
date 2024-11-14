
'use client'; // This component will run on the client side

import React from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import './roadmap.css';
import './roadmap.mobile.css';

export const Roadmap = () => {
const sectionText = useI18nSection("roadmap")

  return (
    <div id="roadmap" className='roadmap-container'>
        <h2 className='roadmap-heading'>FLight PlaN.. LET’S FLOCKING GO!</h2>
        <div className='roadmap-row'>
            <div className='content-part'>
                <div className='top-text'>
                    <div style={{width: 20, height:20, borderRadius: '50%', backgroundColor:"rgb(245, 136, 45)"}}>  </div>
                    Take Flight
                </div>
                <div className='roadmap-content-bg-outer'>
                    <div className='roadmap-content-bg-inner'>
                        <div className='text-inside'>
                            <h3 >Step 1</h3>
                            <ul _ngcontent-ng-c2416091851="" class="text-black d-flex font-lg-18 font-15 fw-regular font-family-secondary"><li _ngcontent-ng-c2416091851=""><span _ngcontent-ng-c2416091851="" class="text-orange">Nest Security Audit:</span>Secure the $FLOCK contract with thorough audits before takeoff. </li></ul>
                            <ul _ngcontent-ng-c2416091851="" class="text-black d-flex font-lg-18 font-15 fw-regular font-family-secondary"><li _ngcontent-ng-c2416091851=""><span _ngcontent-ng-c2416091851="" class="text-orange">Nest Security Audit:</span>Secure the $FLOCK contract with thorough audits before takeoff. </li></ul>
                            <ul _ngcontent-ng-c2416091851="" class="text-black d-flex font-lg-18 font-15 fw-regular font-family-secondary"><li _ngcontent-ng-c2416091851=""><span _ngcontent-ng-c2416091851="" class="text-orange">Nest Security Audit:</span>Secure the $FLOCK contract with thorough audits before takeoff. </li></ul>
                        </div>
                        <div className='img-inside'>
                            <img className='egg1' src='/img/flockers/step1-egg.gif' alt='egg 1' />
                        </div>
                    </div>
                </div>
                <div className='orange-box' style={{width:"83.2%"}}></div>
            </div>
            <div className='image-part'>
                <img src='/img/flockers/high-five.gif' alt='high five' />

            </div>

        </div>
        <div className='roadmap-row reverse-col'>
            <div className='image-part'>
            
            <img src='/img/flockers/listening-to-music.gif' alt='Step 2' />

            </div>
            <div className='content-part'>
                <div className='top-text'>
                    <div style={{width: 20, height:20, borderRadius: '50%', backgroundColor:"rgb(245, 136, 45)"}}>  </div>
                    Expand the Flock
                </div>
                <div className='roadmap-content-bg-outer' style={{clipPath:"polygon(16% 0%, 137% 0%, 68% 190%, 0% 100%)"}}>
                    <div className='roadmap-content-bg-inner reverse-col' style={{clipPath:"polygon(16% 0%, 137% 0%, 68% 190%, 0% 100%)", background:"#c1daea"}}>
                        
                        <div className='img-inside'>
                            <img className='egg1' src='/img/flockers/step2-egg.gif' alt='egg 2' />
                        </div>
                        <div className='text-inside'>
                            <h3 >Step 2</h3>
                            <ul _ngcontent-ng-c2416091851="" class="text-black d-flex font-lg-18 font-15 fw-regular font-family-secondary"><li _ngcontent-ng-c2416091851=""><span _ngcontent-ng-c2416091851="" class="text-orange">Nest Security Audit:</span>Secure the $FLOCK contract with thorough audits before takeoff. </li></ul>
                            <ul _ngcontent-ng-c2416091851="" class="text-black d-flex font-lg-18 font-15 fw-regular font-family-secondary"><li _ngcontent-ng-c2416091851=""><span _ngcontent-ng-c2416091851="" class="text-orange">Nest Security Audit:</span>Secure the $FLOCK contract with thorough audits before takeoff. </li></ul>
                            <ul _ngcontent-ng-c2416091851="" class="text-black d-flex font-lg-18 font-15 fw-regular font-family-secondary"><li _ngcontent-ng-c2416091851=""><span _ngcontent-ng-c2416091851="" class="text-orange">Nest Security Audit:</span>Secure the $FLOCK contract with thorough audits before takeoff. </li></ul>
                        </div>
                    </div>
                </div>
                <div className='orange-box' style={{width:"100%"}}></div>
            </div>


        </div>
        <div className='roadmap-row'>
            <div className='content-part'>
                <div className='top-text'>
                    <div style={{width: 20, height:20, borderRadius: '50%', backgroundColor:"rgb(245, 136, 45)"}}>  </div>
                    The Great Migration
                </div>
                <div className='roadmap-content-bg-outer'>
                    <div className='roadmap-content-bg-inner'>
                        <div className='text-inside'>
                            <h3 >Step 3</h3>
                            <ul _ngcontent-ng-c2416091851="" class="text-black d-flex font-lg-18 font-15 fw-regular font-family-secondary"><li _ngcontent-ng-c2416091851=""><span _ngcontent-ng-c2416091851="" class="text-orange">Nest Security Audit:</span>Secure the $FLOCK contract with thorough audits before takeoff. </li></ul>
                            <ul _ngcontent-ng-c2416091851="" class="text-black d-flex font-lg-18 font-15 fw-regular font-family-secondary"><li _ngcontent-ng-c2416091851=""><span _ngcontent-ng-c2416091851="" class="text-orange">Nest Security Audit:</span>Secure the $FLOCK contract with thorough audits before takeoff. </li></ul>
                            <ul _ngcontent-ng-c2416091851="" class="text-black d-flex font-lg-18 font-15 fw-regular font-family-secondary"><li _ngcontent-ng-c2416091851=""><span _ngcontent-ng-c2416091851="" class="text-orange">Nest Security Audit:</span>Secure the $FLOCK contract with thorough audits before takeoff. </li></ul>
                        </div>
                        <div className='img-inside'>
                            <img className='egg1' src='/img/flockers/step3-egg.gif' alt='egg 3' />
                        </div>
                    </div>
                </div>
                <div className='orange-box' style={{width:"83.2%"}}></div>
            </div>
            <div className='image-part'>
                <img src='/img/flockers/spinning.gif' alt='Step 3' />

            </div>

        </div>
     
        
    </div>
  );
};