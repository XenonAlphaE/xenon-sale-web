import React, {useState} from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import styles from './faq.module.css'
import { generateRandomId } from "../services/utils";


export const FAQS = () => {
  const [selectedIdx , setSelectedIdx] = useState();

  const sectionText = useI18nSection('faq')
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

  const handleSelectSection = (idx) => {
    if(selectedIdx === idx){
      setSelectedIdx("")
    }else{
      setSelectedIdx(idx)
    }
  }

  const cardItems = sectionText?.cards?.map(item => {
    return {...item, id: generateRandomId()}
  })

  const renderRow = (item, idx) => {
          return(


            <div key={item?.id} className={styles.card}>
                <div className={styles.cardTop} onClick={() => handleSelectSection(idx)}>
                    <div className={styles.cardTitle} > {item?.title} </div>
                    {selectedIdx===idx ? 
                      <img src='/img/btcswift/arrow-up.svg' width={33} />
                      :
                      <img src='/img/btcswift/arrow-down.svg' width={33} />
                    }

                </div>
                <div className={`${styles.cardContent}  ${selectedIdx===idx ? styles.active : ''}`}>
                      {item?.contents?.map(x => x)}
                </div>

          
            </div>
          )
  }

  return (
    <section id="faqs" className={styles.container}>

        <div className={styles.mainContent}>
          <h1 className={styles.title}> {sectionText?.title} </h1>
          <p className={styles.desc}> {sectionText?.desc} </p>
          

          <div className={styles.cardList}>

            {cardItems?.map((item,idx)=> renderRow(item,idx))}

          </div>

          <button className={styles.buyBtn} onClick={scrollToBuySection}> {sectionText?.buyBtn} </button>

        </div>


    </section>
  );
};
