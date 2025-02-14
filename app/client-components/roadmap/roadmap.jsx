
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
                <h2 className='roadmap-desc-title'>{sectionText?.heading1} <span style={{color:'white'}}>{sectionText?.heading2}</span></h2>
                <p className='roadmap-desc-content'>
                {sectionText?.desc}

                </p>
            </div>
            <div className='roadmap-row'>
                <div className='roadmap-milstones-container'>
                    <h2 className='roadmap-milstones-title'>
                        {sectionText?.milestones}
                    </h2>
                    <div className='roadmap-milstones'>

                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span>  BTC $100K - <span style={{color:"rgb(255, 199, 0)"}}>                        
                            {sectionText?.item1}
                        </span>
                    </div>
                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span>  BTC $125K -  {sectionText?.item2}
                    </div>
                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span> BTC $150K  - <span style={{color:"rgb(255, 199, 0)"}}>{sectionText?.item3}</span>
                    </div>
                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span>  BTC $175K - {sectionText?.item4}
                    </div>
                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span>  BTC $200K  - <span style={{color:"rgb(255, 199, 0)"}}>{sectionText?.item5}</span>
                    </div>
                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span>  BTC $225K - {sectionText?.item6}
                    </div>
                    <div className='roadmap-milstones-item'>
                        <span className='roadmap-circle'></span>  BTC $250K  - <span style={{color:"rgb(255, 199, 0)"}}>{sectionText?.item7}</span>
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