import React from "react";
import "./HeroContainer.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HeroContainer = () => {
    const scrollToBuySection = () => {
        // Find the target section to scroll to
        const section = document.getElementById('buyForm');

        // Scroll to the section
        section.scrollIntoView({ behavior: 'smooth' });
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // autoplay: true,
        // autoplaySpeed: 3000
    };
    return (
        <div class="hero-container">
            <Slider {...settings}>
                <div tabIndex="-1">
                    <div class="wrapper">
                        <div class="item">
                            <div class="content">
                                <div class="hero">ShibaPrime Presale is now Open</div>
                                <p>Woof your way to the moon!</p>
                                <ul class="buttons">
                                    <li><a href="#buyForm" onClick={scrollToBuySection}>BUY NOW</a></li>
                                </ul>
                            </div>
                            <div class="image-container"><img src="/img/shiba/img.png" alt="" /></div>
                        </div>
                    </div>
                </div>

                <div tabIndex="-1" >
                    <div class="wrapper">
                        <div class="item item-raised">
                            <div class="content">
                                <div class="hero">ShibaPrime's Presale Triumph: Over $1,025,451 Raised!</div>
                                <p>Feeling the FOMO? Don't miss out on the crypto adventure of a lifetime! 🌟 ShilbaPrime Token is soaring, and the buying pressure is purr-sistently building.</p>
                                <ul class="buttons">
                                    <li><a href="#buyForm" onClick={scrollToBuySection}>BUY NOW</a></li>
                                </ul>
                            </div>
                            <div class="image-container"><img src="/img/shiba/unnamed.png" alt="" /></div>
                        </div>
                    </div>
                </div>
              
            </Slider>
        </div>
    );
};
