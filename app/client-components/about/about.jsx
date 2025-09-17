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
        <h1 className={styles.title}> {sectionText?.title} </h1>
        <p className={styles.desc}> {sectionText?.desc} </p>
        
        <div className={styles.listContainer }>

            <div className={styles.cardList }>
                {cardItems.map(x=> renderCardItem(x))}
            </div>
        </div>

        <button className={styles.buynow} onClick={scrollToBuySection}> {sectionText?.buyNow} </button>
      </div>
    </section>

  );
};
export default About;
