import React from "react";
import "./RoadMapContainer.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const RoadMapContainer = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false
    };

    return (
        <div class="roadmap-container">
            <img src="/img/path@r-1.webp" alt="" class="roadmap-path01" /><img src="/img/path@r-2.webp" alt="" class="roadmap-path02" /><img src="/img/path@r-3.webp" alt="" class="roadmap-path03" />
            <div class="">
                <div class="hero">Roadmap</div>
                <div className="wrapper">
                <Slider {...settings}>
                    <div data-index="0" class="slick-slide slick-current" tabIndex="-1" aria-hidden="false">
                        <div>
                            <div class="item-wrapper" tabIndex="-1">
                                <div class="item">
                                    <div class="label">
                                        Phase 1
                                        <img src="img/icon@checked.svg" alt="" />
                                    </div>
                                    <div class="subhead">FOUNDATION LAUNCH</div>
                                    <ul>
                                        <li class="icon"><img src="img/icon@checked.svg" alt="" /><span>Launch Website</span></li>
                                        <li class="icon"><img src="img/icon@checked.svg" alt="" /><span>Launch Socials</span></li>
                                        <li class="icon"><img src="img/icon@checked.svg" alt="" /><span>Launch Presale Stage 1</span></li>
                                        <li class="icon"><img src="img/icon@checked.svg" alt="" /><span>Start Marketing</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-index="1" class="slick-slide " tabIndex="-1" aria-hidden="false" >
                        <div>
                            <div class="item-wrapper" tabIndex="-1">
                                <div class="item">
                                    <div class="label">Phase 2</div>
                                    <div class="subhead">COMMUNITY ENGAGEMENT</div>
                                    <ul>
                                        <li>Grow Telegram and Twitter Members</li>
                                        <li class="icon"><img src="img/icon@checked.svg" alt="" /><span>Continue Marketing Campaign</span></li>
                                        <li class="icon"><img src="img/icon@checked.svg" alt="" /><span>Start appointing Community Managers</span></li>
                                        <li class="icon"><img src="img/icon@checked.svg" alt="" /><span>Reach Stage 3 of Presale</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-index="2" class="slick-slide " tabIndex="-1" aria-hidden="false" >
                        <div>
                            <div class="item-wrapper" tabIndex="-1" >
                                <div class="item">
                                    <div class="label">Phase 3</div>
                                    <div class="subhead">EXPLOSIVE GROWTH</div>
                                    <ul>
                                        <li>Pass Stage 8 of Presale</li>
                                        <li>Have over 10,000 Social Media Members</li>
                                        <li>Push Marketing Campaign for pre launch push</li>
                                        <li>Start collecting information for Token Allocation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-index="3" class="slick-slide" tabIndex="-1" aria-hidden="true" >
                        <div>
                            <div class="item-wrapper" tabIndex="-1" >
                                <div class="item">
                                    <div class="label">Phase 4</div>
                                    <div class="subhead">GO LIVE</div>
                                    <ul>
                                        <li>Set up Token Allocations</li>
                                        <li>Push Marketing for Launch</li>
                                        <li>Launch on DEX</li>
                                        <li>Allocate Community Tokens</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-index="4" class="slick-slide" tabIndex="-1" aria-hidden="true" >
                        <div>
                            <div class="item-wrapper" tabIndex="-1" >
                                <div class="item">
                                    <div class="label">Phase 5</div>
                                    <div class="subhead">KEEP PUSHING GROWTH</div>
                                    <ul>
                                        <li>Have over 20,000 Members</li>
                                        <li>Start Trending on Dextools, CMC and CG</li>
                                        <li>Get into the Top 1000</li>
                                        <li>Push Cuteness to the world</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
                </div>
            </div>
        </div>
    );
};
