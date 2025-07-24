import React from 'react';
import styles from './about.module.css';
import { useIsMobile } from '../../../redux/utils/mobileUtils';
import { useI18nSection } from '../../../redux/utils/languageUtils';
import AutoScrollCarousel from '../carousal/AutoScrollCarousel';
import { generateRandomId } from '../services/utils';


const About =() => {
  const isMobile = useIsMobile()
  const sectionText = useI18nSection('about')
  const aboutContents = sectionText?.contents

  const scrollToBuySection = () => {
    // Find the target section to scroll to
    let section = null;

    section = document.getElementById('intro');

    if (!section) {
      window.location = `/${currentLanguage}`
      return
    }
    // Scroll to the section
    section.scrollIntoView({ behavior: 'smooth' });
  };


  const cardItems = [
    {id: generateRandomId(), circleColor:'#FFD700', img:'/img/btcswift/about1.svg', title: sectionText?.cards?.[0]?.title, content:sectionText?.cards?.[0]?.content },
    {id: generateRandomId(), circleColor:'#FF8C00', img:'/img/btcswift/about2.svg', title: sectionText?.cards?.[1]?.title, content:sectionText?.cards?.[1]?.content },
    {id: generateRandomId(), circleColor:'#FF6B6B', img:'/img/btcswift/about3.svg', title: sectionText?.cards?.[2]?.title, content:sectionText?.cards?.[2]?.content },
    {id: generateRandomId(), circleColor:'#FF8A80', img:'/img/btcswift/about4.svg', title: sectionText?.cards?.[3]?.title, content:sectionText?.cards?.[3]?.content },
    {id: generateRandomId(), circleColor:'#E91E63', img:'/img/btcswift/about5.svg', title: sectionText?.cards?.[4]?.title, content:sectionText?.cards?.[4]?.content },
    {id: generateRandomId(), circleColor:'#9945FF', img:'/img/btcswift/about6.svg', title: sectionText?.cards?.[5]?.title, content:sectionText?.cards?.[5]?.content },
  ]
  const renderCardItem = (item) =>{
    
    return <div key={item?.id} className={styles.card}>
                <div className={styles.cardTop}>
                    <div className={styles.cardImgWrapper} style={{background: item?.circleColor}}>

                        <img className={styles.cardImg} src={item?.img}/>
                    </div>
                    <h3 className={styles.cardTitle} > {item?.title} </h3>
                </div>
                <div className={styles.cardBottom}>
                  <p className={styles.cardContent}>{item?.content}</p>
                </div>

            </div>

  }
  return (
    <section  className={styles.container} id='about'>
      <div className={styles.mainContent}>  
        <h1 className={styles.title}> {sectionText?.title} </h1>
        <p className={styles.desc}> {sectionText?.desc} </p>
        
        <div className={styles.cardList }>
            {cardItems.map(x=> renderCardItem(x))}
        </div>

        <button className={styles.buyBtn} onClick={scrollToBuySection}> {sectionText?.buyBtn} </button>
      </div>
    </section>

  );
};
export default About;
