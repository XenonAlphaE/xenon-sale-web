import React from "react";
import "./wrapper.css";

export const Wrapper = () => {
    const scrollToBuySection = () => {
        // Find the target section to scroll to
        const section = document.getElementById('buyForm');

        // Scroll to the section
        section.scrollIntoView({ behavior: 'smooth' });
    };
  return (
    <div class="wrapper">
    <div class="page-header">
        <div class="logo">
            <a href="/">
                <img src="img/shiba/icon2.png" alt=""/>
            </a>
        </div>
        <div class="navigation">
            <ul className="navigation-ul">
                <li className="navigation-li"><a className="navigation-a" href="#" id="gtm-about">about</a></li>
                <li className="navigation-li"><a className="navigation-a" href="#" id="gtm-tokenomics">tokenomics</a></li>
                <li className="navigation-li"><a className="navigation-a" href="#" id="gtm-faqs">faq's</a></li>
                <li className="navigation-li"><a className="navigation-a" href="/how-to-buy">HOW TO BUY?</a></li>
                <li className="navigation-li">
                    <a  id="gtm-buy-now-menu" href="#buyForm" onClick={scrollToBuySection} class="navigation-a navigation-button button">buy now</a>
                </li>
                <li className="navigation-li">
                    <select className="navigation-select">
                        <option value="en" selected="">EN</option>
                        <option value="es">ES</option>
                        <option value="pt">PT</option>
                        <option value="fr">FR</option>
                        <option value="it">IT</option>
                        <option value="de">DE</option>
                        <option value="ar">AR</option>
                        <option value="id">ID</option>
                        <option value="in">IN</option>
                        <option value="tr">TR</option>
                    </select>
                </li>
            </ul>
        </div>
        <div class="toggle show-mobile">
            <img src="/menu-toggle.svg" alt="" />
        </div>
    </div>
</div>

  );
};
