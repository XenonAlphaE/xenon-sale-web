import React from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import styles from './roadmap.module.css'
import { generateRandomId } from "../services/utils";


export const Roadmap = () => {

  const sectionText = useI18nSection('roadmap')
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


  const cardItems = [
      {id: generateRandomId(), circleColor:'rgb(247, 147, 26)', img:'/img/btcswift/roadmap1.svg', title: sectionText?.cards?.[0]?.title, subTitle:sectionText?.cards?.[0]?.subTitle, contents:sectionText?.cards?.[0]?.contents},
      {id: generateRandomId(), circleColor:'rgb(255, 107, 107)', img:'/img/btcswift/roadmap2.svg', title: sectionText?.cards?.[1]?.title, subTitle:sectionText?.cards?.[1]?.subTitle, contents:sectionText?.cards?.[1]?.contents},
      {id: generateRandomId(), circleColor:'rgb(255, 138, 128)', img:'/img/btcswift/roadmap3.svg', title: sectionText?.cards?.[2]?.title, subTitle:sectionText?.cards?.[2]?.subTitle, contents:sectionText?.cards?.[2]?.contents},
      {id: generateRandomId(), circleColor:'rgb(255, 95, 143)', img:'/img/btcswift/roadmap4.svg', title: sectionText?.cards?.[3]?.title, subTitle:sectionText?.cards?.[3]?.subTitle, contents:sectionText?.cards?.[3]?.contents},
      {id: generateRandomId(), circleColor:'rgb(233, 30, 99)', img:'/img/btcswift/roadmap5.svg', title: sectionText?.cards?.[4]?.title, subTitle:sectionText?.cards?.[4]?.subTitle, contents:sectionText?.cards?.[4]?.contents},
  ]

  const renderRow = (item, idx) => {
          return(

        <div key={item?.id} className={ idx %2 === 0 ? styles.leftPart : styles.rightPart}>


            <div className={styles.card}>
                <div className={styles.cardTop}>
                    <div className={styles.cardCircle} style={{backgroundColor:item?.circleColor}}>
                      <img src={item?.img} className={styles.cardImg} alt="image" />
                      </div>
                    <div > 
                      <div className={styles.cardSubtitle} style={{color:item?.circleColor}}> {item?.subTitle} </div>
                      <h4 className={styles.cardTitle}>  {item?.title}</h4>

                    </div>
                </div>
                <div >
                  <ul className={styles.cardContent}>
                      {item?.contents?.map(x => <li key={generateRandomId()}>{x}</li>)}
                  </ul>
                </div>

            </div>
          
      </div>
          )
  }

  return (
    <section id="roadmap" className={styles.container}>

        <div className={styles.mainContent}>
          <h1 className={styles.title}> {sectionText?.title} </h1>
          <p className={styles.desc}>{sectionText?.desc} </p>
          

          <div className={styles.cardList}>

            {cardItems.map((item,idx)=> renderRow(item,idx))}

          </div>
        </div>


    </section>
  );
};
