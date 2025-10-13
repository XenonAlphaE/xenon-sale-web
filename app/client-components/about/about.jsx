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
    {id: generateRandomId(), img:'/img/subbd/follower-4.webp', title: sectionText?.cards?.[0]?.title, content:sectionText?.cards?.[0]?.content },
    {id: generateRandomId(), img:'/img/subbd/follower-5.webp', title: sectionText?.cards?.[0]?.title, content:sectionText?.cards?.[0]?.content },
    {id: generateRandomId(), img:'/img/subbd/follower-6.webp', title: sectionText?.cards?.[0]?.title, content:sectionText?.cards?.[0]?.content },
    {id: generateRandomId(), img:'/img/subbd/follower-7.webp', title: sectionText?.cards?.[0]?.title, content:sectionText?.cards?.[0]?.content },
    {id: generateRandomId(), img:'/img/subbd/follower-8.webp', title: sectionText?.cards?.[0]?.title, content:sectionText?.cards?.[0]?.content },
    {id: generateRandomId(), img:'/img/subbd/follower-1.webp', title: sectionText?.cards?.[0]?.title, content:sectionText?.cards?.[0]?.content },
    {id: generateRandomId(), img:'/img/subbd/follower-2.webp', title: sectionText?.cards?.[0]?.title, content:sectionText?.cards?.[0]?.content },
    {id: generateRandomId(), img:'/img/subbd/follower-3.webp', title: sectionText?.cards?.[0]?.title, content:sectionText?.cards?.[0]?.content },
  ]
  const renderCardItem = (item) =>{
    
    return <div key={item?.id} className={styles.card}>
                <img className={styles.cardImg} src={item?.img}/>

            </div>

  }
  return (
    <section  className={styles.container} id='about'>
        <div className={styles.mainContent}>  
          <h1 className={styles.title}> {sectionText?.title} ABOUT SUPER PEPE</h1>
          <div className={styles.descWrapper}>

              <p className={styles.desc}> {sectionText?.desc}  THE NEXT EVOLUTION OF MEME COIN.</p>
              <p className={styles.desc}> {sectionText?.desc}  THE FIRST MEME COIN WITH A MISSION to HELP PEOPLE BY DONATING EVERY PURCHASE BY 10% to CHARITY. </p>
          </div>
          
          <button className={styles.buynow} onClick={scrollToBuySection}> {sectionText?.buyNow} BUY $SUPEPE  </button>
        </div>
    </section>

  );
};
export default About;
