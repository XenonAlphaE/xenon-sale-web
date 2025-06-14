import React from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import styles from './tokenomics.module.css'


  
function InfoCard({ cardClass, title, contents }) {
    return (
        <div className={cardClass}>
          <div className={styles.cardNumber}></div>
          <div className={styles.cardTitle}>{title}</div>
          
          {contents.map((content, i) => (
            <div>{content} </div>
          ))}
        </div>
  
    );
  }
  
function BuyNowButton( {eventOnClick, buyNow, desc}) {
    return(
        <div className={styles.buyNowWrapper}>
            <button className={styles.buyNowBtn} onClick={eventOnClick}>{buyNow}</button>
            <p>{desc}</p>
        </div>
    )
}

  

export const Tokenomics = () => {

  const sectionText = useI18nSection('tokenomics')
  const infoContents = sectionText?.contents
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
        <h1 className={styles.title}>{sectionText?.title}</h1>

        <div className={styles.mainContent}>

            <div class={`${styles.item} ${styles.item1}`}>
                <div  className={styles.cards}>
                    <InfoCard cardClass={styles.card} title={infoContents[0].title} contents={infoContents[0].contents} />
                    <InfoCard cardClass={styles.card} title={infoContents[1].title} contents={infoContents[1].contents} />
                </div>

            </div>
            <div class={`${styles.item} ${styles.item2}`}>
                <div className={styles.imgWrapper}>
                    <img src="/img/btchyper/tokenomics.gif" className={styles.imgGraphic}/>
                </div>
            </div>
            <div class={`${styles.item} ${styles.item3}`}>
                <div  className={styles.cards}>
                    <InfoCard cardClass={styles.card} title={infoContents[2].title} contents={infoContents[2].contents} />
                    <InfoCard cardClass={styles.card} title={infoContents[3].title} contents={infoContents[3].contents} />
                </div>
                <div  className={styles.cards}>

                    <InfoCard cardClass={styles.card} title={infoContents[4].title} contents={infoContents[4].contents} />
                </div>

            </div>
            <div class={`${styles.item} ${styles.item4}`}><BuyNowButton buyNow={sectionText?.buyNow} desc={sectionText?.desc} eventOnClick={scrollToBuySection} /></div>
        </div>


    </section>
  );
};
