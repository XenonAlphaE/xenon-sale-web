
'use client'; // This component will run on the client side

import React from 'react';
import { useI18nSection } from '../../../redux/utils/languageUtils';

import styles from './howtobuy.module.css';
import HowToBuyPromoBanner from './PromoBanner';
import { generateRandomId } from '../services/utils';




export const HowToBuy = () => {
    const sectionText = useI18nSection('howtobuy')

    const cardItems = [
      {id: generateRandomId(), img:'/img/pepenode/about1.png', title: sectionText?.cards?.[0]?.title, content:sectionText?.cards?.[0]?.content },
      {id: generateRandomId(), img:'/img/pepenode/about2.png', title: sectionText?.cards?.[1]?.title, content:sectionText?.cards?.[1]?.content },
      {id: generateRandomId(), img:'/img/pepenode/about3.png', title: sectionText?.cards?.[2]?.title, content:sectionText?.cards?.[2]?.content },
      {id: generateRandomId(), img:'/img/pepenode/about4.png', title: sectionText?.cards?.[3]?.title, content:sectionText?.cards?.[3]?.content },
    ]
    const renderCardItem = (item) =>{
      
      return <div key={item?.id} className={styles.card}>
                  <div className={styles.cardTop}>
                      <h3 className={styles.cardTitle} > {item?.title} </h3>
                  </div>
                  <div className={styles.cardBottom}>
                    <p className={styles.cardContent}>{item?.content}</p>
                  </div>

              </div>

    }

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
    <section  className={styles.container} id='howtobuy'>
      <div className={styles.mainContent}>  
        <h1 className={styles.title}> {sectionText?.title} </h1>
        <p className={styles.desc}> {sectionText?.desc} </p>
           
        <div className={styles.cardList }>
              {cardItems.map(x=> renderCardItem(x))}
          </div>

        
        <div className={styles.buyNowContainer}>
          <button className={styles.buynow} onClick={scrollToBuySection}>
              {sectionText?.buyNow}
          </button>
        </div>

        <div className={styles.videoWrap}>
          <video autoPlay={true} muted={true} playsInline={true} loop={true} >
            <source  src="/img/pepenode/how-to-buy.mp4" type="video/mp4"/>
                Your browser does not support the video tag 
          </video>
        </div>
      </div>
    </section>


  );
};