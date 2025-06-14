import React from 'react';
import styles from './about.module.css';
import { useIsMobile } from '../../../redux/utils/mobileUtils';
import { useI18nSection } from '../../../redux/utils/languageUtils';



function FrameworkCard ({frameworks}) {

  return (
    <div className={styles.frameworkContainer}>
    <h2 className={styles.frameworkHeading}>LAYER 2 FRAMEWORKS POWERING <span className={styles.highlight}>SCALABILITY</span></h2>
    <div className={styles.frameworks}>
      {frameworks.map((fw, idx) => (
        <div key={idx} className={styles.frameworkItem}>
          <div className={styles.imageWrapper}>
            <img src={fw.image} alt={fw.name} className={styles.image} />
          </div>
          <div className={styles.label}>{fw.title}</div>
        </div>
      ))}
    </div>
  </div>  

  )
}

function AboutCard({ cardClass, number, title, contents }) {
  return (
      <div className={cardClass}>
        <div className={styles.cardNumber}>{number}</div>
        <div className={styles.cardTitle}>{title}</div>
        <ul className={styles.cardContent}>
            {contents?.map((content, i) => (
              <li key={i}>{content}</li>
            ))}
        </ul>
      </div>

  );
}


const About =() => {
  const isMobile = useIsMobile()
  const sectionText = useI18nSection('about')
  console.log(JSON.stringify (sectionText))
  const aboutContents = sectionText?.contents

  const frameworks = [
    {
      title: sectionText?.frameworks?.[0].title ? sectionText?.frameworks?.[0].title : '', 
      name: sectionText?.frameworks?.[0].name ? sectionText?.frameworks?.[0].name : '', 
      image: '/img/btchyper/lightning.png', 
    },
    {
      title: sectionText?.frameworks?.[1].title ? sectionText?.frameworks?.[1].title : '', 
      name: sectionText?.frameworks?.[1].name ? sectionText?.frameworks?.[1].name : '', 
      image: '/img/btchyper/optimism.png', 
    },
    {
      title: sectionText?.frameworks?.[2].title ? sectionText?.frameworks?.[2].title : '', 
      name: sectionText?.frameworks?.[2].name ? sectionText?.frameworks?.[2].name : '', 
      image: '/img/btchyper/zkrollups.png', 
    },
    {
      title: sectionText?.frameworks?.[3].title ? sectionText?.frameworks?.[3].title : '', 
      name: sectionText?.frameworks?.[3].name ? sectionText?.frameworks?.[3].name : '', 
      image: '/img/btchyper/rootstock.png', 
    },
    {
      title: sectionText?.frameworks?.[4].title ? sectionText?.frameworks?.[4].title : '', 
      name: sectionText?.frameworks?.[4].name ? sectionText?.frameworks?.[4].name : '', 
      image: '/img/btchyper/bitcoin-hyper.png', 
    },
  ];

  return (
    <section  className={styles.container} id='about'>
      <div className={styles.mainContent}>

        <h1 className={styles.title}>BITCOIN LAYER 2</h1>
        
        <div className={styles.flexRow}>
          <div className={styles.flex3}>
              <AboutCard cardClass={styles.card} number={aboutContents?.[0].number} title={aboutContents?.[0].title}  contents={aboutContents?.[0].contents}/>
          </div>
          <div className={styles.stepConnect}>
              <img src='/img/btchyper/ani-arrow.svg' />
          </div>
          <div className={styles.flex3}>
              <AboutCard cardClass={`${styles.card} ${styles.operationCard}`} number={aboutContents?.[1].number} title={aboutContents?.[1].title}  contents={aboutContents?.[1].contents}/>

          </div>
          <div className={styles.stepConnect}>            
            <img src='/img/btchyper/ani-arrow.svg' />
          </div>
          <div className={styles.flex3}>
              <AboutCard cardClass={`${styles.card} ${styles.settlementCard}`} number={aboutContents?.[2].number} title={aboutContents?.[2].title}  contents={aboutContents?.[2].contents}/>

          </div>

          {isMobile &&<div className={styles.stepConnect}>            
            <img src='/img/btchyper/ani-arrow.svg' />
          </div>}
        
          
          {isMobile &&<div className={styles.flex3}>
              <AboutCard cardClass={`${styles.card} ${styles.withdrawCard}`} number={aboutContents?.[3].number} title={aboutContents?.[3].title}  contents={aboutContents?.[3].contents}/>

          </div>}
        </div>

        {!isMobile &&<div className={styles.flexRow}>
          <div className={styles.flex8}> </div>
          <div className={`${styles.flex3} ${styles.stepConnect}`}>
              <img style={{transform:'rotate(90deg)'}} src='/img/btchyper/ani-arrow.svg' />



          </div>
        </div>}

        {!isMobile &&<div className={styles.flexRow}>
          <div className={styles.flex8}>
              <FrameworkCard frameworks={frameworks} />
          </div>
          <div className={styles.flex3}>
                <AboutCard cardClass={`${styles.card} ${styles.withdrawCard}`} number={aboutContents?.[3].number} title={aboutContents?.[3].title}  contents={aboutContents?.[3].contents}/>

          </div>
        </div>
        }

      </div>
    </section>

  );
};
export default About;
