
'use client'; // This component will run on the client side

import React from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import './roadmap.css';
import './roadmap.mobile.css';

export const Roadmap = () => {
const sectionText = useI18nSection("roadmap")

  return (
    <div id="roadmap" className='roadmap-container'>
        <div className='roadmap-content'>


            <div className='roadmap-desc-container'>
                <h2 className='roadmap-desc-title'>The Official <span style={{color:'white'}}>Bitcoin Meme Coin</span></h2>
                <p className='roadmap-desc-content'>
                    Bitcoin is the best-performing asset in history with an AAR of 230% – up more than 200 million percent since inception. Now jump on board for the ride of your life as the BTC Bull stampedes towards $250K BTC and beyond!


                </p>
            </div>
            <div className='roadmap-row'>
                <div className='roadmap-milstones-container'>
                    <h2 className='roadmap-milstones-title'>
                        Project Milestones
                    </h2>
                    <div className='roadmap-milstones'>

                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span>  BTC $100K - <span style={{color:"rgb(255, 199, 0)"}}>$BTCBULL Presale!</span>
                    </div>
                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span>  BTC $125K -  Token Burn!
                    </div>
                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span> BTC $150K  - <span style={{color:"rgb(255, 199, 0)"}}>BTC Airdrop!</span>
                    </div>
                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span>  BTC $175K - Token Burn!
                    </div>
                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span>  BTC $200K  - <span style={{color:"rgb(255, 199, 0)"}}>BTC Airdrop!</span>
                    </div>
                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span>  BTC $225K - Token Burn!
                    </div>
                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span>  BTC $250K  - <span style={{color:"rgb(255, 199, 0)"}}>$BTCBULL Airdrop!</span>
                    </div>
                    </div>
                </div>
                <div className='roadmap-chart-container'>
                    <div className='roadmap-chart-content'>

                        <img src='/img/btcbull/roadmap-graph-arrow.webp' className='roadmap-chart-decorate1' />
                        <img src='/img/btcbull/jetpack-bull.webp' className='roadmap-chart-decorate2' />
                    </div>
                    <div className='roadmap-chart-numbers'>
                        <p _ngcontent-ng-c3844831219="">$250K</p><p _ngcontent-ng-c3844831219="">$225K</p><p _ngcontent-ng-c3844831219="">$200K</p><p _ngcontent-ng-c3844831219="">$175K</p><p _ngcontent-ng-c3844831219="">$150K</p><p _ngcontent-ng-c3844831219="">$125K</p><p _ngcontent-ng-c3844831219="">$100K</p>
                    </div>
                </div>
            </div>

        </div>
        <img className='roadmap-decorate1' src='/img/btcbull/line.png' />
     
        
    </div>
  );
};