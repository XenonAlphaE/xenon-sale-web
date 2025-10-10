'use client'; // This component will run on the client side

import React, {  } from "react";
import { useI18nSection } from "../../../redux/utils/languageUtils";

import  styles from './header.module.css'
import PresaleSection from "./PresaleSection";
import { BuyForm } from "../buyform/buyform";
import AutoScrollCarousel from "../carousal/AutoScrollCarousel";
export const Header = () => {
  const sectionText = useI18nSection('header')

  const slides = [
    {src: '/img/subbd/featured_1.svg'},
    {src: '/img/subbd/featured_3.svg'},
    {src: '/img/subbd/featured_4.svg'},
    {src: '/img/subbd/featured_5.svg'},
    {src: '/img/subbd/featured_6.svg'},
]
  const renderSlide = (item) => {
    return (
      <img src={item.src} />
    )
  }

  return (
    <section id="intro"  >
      <div className={styles.container}>
        <video autoPlay={true} muted={true} playsInline={true} loop={true} className={styles.videoBg} >
          <source src="/img/supepe/herobg-BzC8Ps58.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        <div className={styles.mainContent}> 
          <div className={styles.leftPart}>
              <PresaleSection />  
          </div> 
          <div className={styles.rightPart}>
              <BuyForm/>  
          </div> 

        </div>
      </div>
      <AutoScrollCarousel slides={slides} renderSlide={renderSlide}/>

    </section>
    // </div>
  );
};
