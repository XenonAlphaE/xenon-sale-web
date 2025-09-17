import React from 'react';
import styles from './about.module.css';
import { useIsMobile } from '../../../redux/utils/mobileUtils';
import { useI18nSection } from '../../../redux/utils/languageUtils';
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
    {id: generateRandomId(), img:'/img/pepenode/about1.png', title: sectionText?.cards?.[0]?.title, content:sectionText?.cards?.[0]?.content },
    {id: generateRandomId(), img:'/img/pepenode/about2.png', title: sectionText?.cards?.[1]?.title, content:sectionText?.cards?.[1]?.content },
    {id: generateRandomId(), img:'/img/pepenode/about3.png', title: sectionText?.cards?.[2]?.title, content:sectionText?.cards?.[2]?.content },
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

        <button className={styles.buynow} onClick={scrollToBuySection}> {sectionText?.buyNow} </button>
      </div>
    </section>

  );
};
export default About;
