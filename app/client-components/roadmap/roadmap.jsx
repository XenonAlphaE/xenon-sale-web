import React, { useState } from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import styles from './roadmap.module.css'
import { generateRandomId } from "../services/utils";


export const Roadmap = () => {

  const sectionText = useI18nSection('roadmap')
    const [selectedIdx , setSelectedIdx] = useState();
    
    const handleSelectSection = (idx) => {
      if(selectedIdx === idx){
        setSelectedIdx("")
      }else{
        setSelectedIdx(idx)
      }
    }

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
      {id: generateRandomId(),  title: "1. Presale Process", content:"The PEPENODE presale is your early access pass to the future of virtual meme coin mining. Secure $PEPENODE tokens before public launch at progressive pricing phases. Early supporters can also stake their tokens to supercharge their mining rewards from day one. Don't miss your chance to stack $PEPENODE before the rigs go live."},
      {id: generateRandomId(),  title: "2. TGE Phase", content:"The Token Generation Event (TGE) kicks off the official launch of PEPENODE. Once live, holders can deploy their $PEPENODE tokens to begin building out virtual server rooms, setting up mining nodes, and activating their meme coin earning potential. This marks the moment PEPENODE shifts from hype to hash power—virtually, of course."},
      {id: generateRandomId(),  title: "3. Mine-to-earn game", content:"Once your virtual rigs are running, it’s time to mine! PEPENODE's Mine-To-Earn system lets users strategically build and upgrade custom mining facilities using $PEPENODE tokens. The more optimized your setup, the more meme coins you generate, ranging from exclusive $PEPENODE boosts to top-tier tokens like Pepe and Fartcoin. Gamify your grind and climb the leaderboard."},
  ]
  const renderCardItem = ( item, idx,) =>{
    
    return <div key={item?.id} className={`${styles.card}  ${selectedIdx===idx ? styles.active : ''}`}>
                <div className={styles.cardTop} onClick={() => handleSelectSection(idx)}>
                    <h3 className={styles.cardTitle} > {item?.title} </h3>
                </div>
                <div className={styles.cardBottom}>
                  <p className={`${styles.cardContent}  ${selectedIdx===idx ? styles.active : ''}`}>
                    {item?.content}
                  </p>
                </div>

            </div>

  }


  return (
    <section id="roadmap" className={styles.container}>

        <div className={styles.mainContent}>
          <h1 className={styles.title}> {sectionText?.title} Roadmap</h1>
          

          <div className={styles.cardList }>
            {cardItems?.map((item,idx)=> renderCardItem(item,idx))}
          </div>
                  
        </div>
        <img src="/img/pepenode/roadmap_gif.gif" className={styles.decor} />


    </section>
  );
};
