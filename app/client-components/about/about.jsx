import React from 'react';
import styles from './about.module.css';
import { useIsMobile } from '../../../redux/utils/mobileUtils';
import { useI18nSection } from '../../../redux/utils/languageUtils';
import AutoScrollCarousel from '../carousal/AutoScrollCarousel';
import { generateRandomId } from '../services/utils';


const About =() => {
  const isMobile = useIsMobile()
  const sectionText = useI18nSection('about')
  console.log(JSON.stringify (sectionText))
  const aboutContents = sectionText?.contents


  const carousalItems = [
    {id: generateRandomId()},
    {id: generateRandomId()},
    {id: generateRandomId()},
    {id: generateRandomId()},
    {id: generateRandomId()},
    {id: generateRandomId()},
    {id: generateRandomId()},
    {id: generateRandomId()},
    {id: generateRandomId()},
    {id: generateRandomId()},
  ]
  const renderCarousalItem = (item) =>{
    
    return <img index={item?.id} src='/img/token6900/feature.svg' width={100} height={'auto'} ></img>

  }
  return (
    <section  className={styles.container} id='about'>
      <div className={styles.mainContent}>  
        <AutoScrollCarousel slides={carousalItems} renderSlide={renderCarousalItem} />

        
        <div className={styles.flexRow}>
          <div className={styles.flex3}>
            <div className={styles.mainText}>
                <h1 className={styles.title}>WHY 69</h1>
                <p>
                  Why not 69? TOKEN6900 isn’t a meme coin. It’s a consciousness parasite. Go search “TOKEN6900” on Google. Ask ChatGPT. Whisper it into your tax advisor’s voicemail. Turn your phone off and listen closely — it’s in the walls. It’s in your thoughts. It’s in your unpaid credit card bill. Like the best crypto presales, it's a tradable emotion. A way of coping with the unrelenting crush of modern finance.
                </p>
                <h3>EXPLAINER: PEAK BRAIN ROT THEORY</h3>
                <p>
                  The human mind was never meant to process this many charts. You were built to hunt deer and maybe make fire — not to follow 19 wallets across three chains praying a gormless frog is going to 20x. TOKEN6900 is the final form of financial regression: a regression that feels good. It’s not just another new coin launch or hyped crypto presale. It’s a lobotomy. A soothing hum at the edge of sanity. It’s what happens when you stare into the abyss of trading for too long and the abyss throws a ticker back at you.
                </p>
            </div>
          </div>
          {
            !isMobile &&
            <div className={styles.flex3}>
              <img src='	/img/token6900/shirts.webp' width={'100%'} />
            </div>
          }
          <div className={styles.flex3}>
            <img src='/img/token6900/shirt-bottle-mob.webp' className={styles.mobShirt}/>
            <img src='/img/token6900/belle.webp' width={'100%'} />
            <img src='/img/token6900/mob-white-tshirt.webp' className={styles.mobWhiteShirt} />
          </div>
       
        </div>
      </div>
    </section>

  );
};
export default About;
