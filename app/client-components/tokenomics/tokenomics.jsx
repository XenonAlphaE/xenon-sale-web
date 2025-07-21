import React from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import styles from './tokenomics.module.css'


  
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
    <section id="tokenomics" className={styles.tokenomicsContainer}>

        <div className={styles.mainContent}>
            <div className={styles.leftPart}>
              <div className={styles.titleWrapper}>
                  <h1 className={styles.title}>sTokenemoics</h1>
              </div>

            </div>
            <div className={styles.midPart}>
              <img src="https://token6900.com/assets/images/png/token-img-1.png" />
              <p  className={styles.desc}>TOKEN 6900 has 1 more token than SPX6900. Cos we are 1x better...</p>
              <p className={styles.desc}>Total supply 930,993,091 hard cap $5M</p>
              < p className={styles.desc}>Dev keeps 6900 tokens locked for 5 years</p>
              <BuyNowButton/>
              <img src="https://token6900.com/assets/images/png/token-img-4.png" alt="token-img"></img>
            </div>
            <div className={styles.rightPart}>
              <video autoplay="" muted="false" playsinline="" loop={true} width="100%">
                <source _ngcontent-ng-c1442129416="" src="/img/token6900/dud.webm" type="video/webm"></source>
              </video>
            </div>
             <div className={styles.leftPart}>

            </div>
            <InfoCard cardClass={`${styles.item1}`} title={'0.0007%'} contents={['developer moon bag (locked for 5 years)']} />
            <InfoCard cardClass={`${styles.item2}`} title={'15%'} contents={['vibe coding development']} />
            <InfoCard cardClass={`${styles.item3}`} title={'40%'} contents={['token 6900 marketing']} />
            <InfoCard cardClass={`${styles.item4}`} title={'5%'} contents={['Staking Rewards']} />
            <InfoCard cardClass={`${styles.item5}`} title={'10%'} contents={['Vibe Liquidity']} />
            <InfoCard cardClass={`${styles.item6}`} title={'24.9993%'} contents={['does anyone have a dolphin']} />
            <InfoCard cardClass={`${styles.item7}`} title={'5%'} contents={['rewards/airdrops/burn']} />
        </div>


    </section>
  );
};
