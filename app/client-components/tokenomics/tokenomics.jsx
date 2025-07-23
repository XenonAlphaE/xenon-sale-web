import React from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import styles from './tokenomics.module.css'
import DonutChart from "./DonutChart";


  
function InfoCard({ cardClass, title, contents }) {
    return (
        <div className={cardClass}>
          <div className={styles.cardTitle}>{title}</div>
          
          {contents.map((content, i) => (
            <div className={styles.cardContent}>{content} </div>
          ))}
        </div>
  
    );
}
  
function BuyNowButton( {eventOnClick, buyNow, desc}) {
    return(
        <div className={styles.buyNowWrapper}>
            <button className={styles.buyNowBtn} onClick={eventOnClick}>BUY NOW</button>
        </div>
    )
}



export const Tokenomics = () => {

  const sectionText = useI18nSection('tokenomics')
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
    <section id="tokenomics" className={styles.container}>

        <div className={styles.mainContent}>
          <h1 className={styles.title}>Tokenomics</h1>
          <p className={styles.desc}>Transparent and sustainable tokenomics designed for long-term growth and community benefit</p>
          

          <div className={styles.infoContainer}>
            <div className={styles.leftPart}>
              <div className={styles.chartWrapper}>
                  <DonutChart/>
              </div>


            </div>
            <div className={styles.rightPart}>


                <div className={styles.cartList}> 
                  <div className={styles.card}>
                      <div className={styles.cardLeft}>
                          <div className={styles.cardBullet}></div>
                          <span > Presale</span>
                      </div>
                      <div className={styles.cardRight}>
                        <div style={{color:'#F7931A'}}>30%</div>
                        <div style={{color:'rgb(70, 91, 59) '}} >13.5M</div>
                      </div>

                  </div>
                  <div className={styles.card}>
                      <div className={styles.cardLeft}>
                          <div className={styles.cardBullet} style={{background:'rgb(255, 107, 107)'}}></div>
                          <span > Mining Rewards</span>
                      </div>
                      <div className={styles.cardRight}>
                        <div style={{color:'rgb(255, 107, 107)', fontWeight:'bold'}}>50%</div>
                        <div style={{color:'rgb(70, 91, 59) '}} >22.5M</div>
                      </div>

                  </div>
                  <div className={styles.card}>
                      <div className={styles.cardLeft}>
                          <div className={styles.cardBullet} style={{background:'#14F195'}}></div>
                          <span > Liquidity Pool</span>
                      </div>
                      <div className={styles.cardRight}>
                        <div style={{color:'#14F195', fontWeight:'bold'}}>15%</div>
                        <div style={{color:'rgb(70, 91, 59) '}} >6.75M</div>
                      </div>

                  </div>
                  <div className={styles.card}>
                      <div className={styles.cardLeft}>
                          <div className={styles.cardBullet} style={{background:'#E91E63'}}></div>
                          <span > Team & Reserves</span>
                      </div>
                      <div className={styles.cardRight}>
                        <div style={{color:'#E91E63', fontWeight:'bold'}}>5%</div>
                        <div style={{color:'rgb(70, 91, 59) '}} >2.25M</div>
                      </div>

                  </div>
                </div>


            </div>
          </div>
        </div>


    </section>
  );
};
