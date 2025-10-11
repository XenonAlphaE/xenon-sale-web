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

  const cardItems = [
    {id: generateRandomId(),title: 'What is PEPENODE?', content:'PEPENODE is the first platform to bring virtual meme coin mining to life. It simplifies what used to be advanced crypto concepts by turning them into a gamified experience. Through its early-stage crypto presale, users can secure $PEPENODE tokens, then build mining setups to earn meme coins all in a virtual setting.' },
    {id: generateRandomId(),title: 'How does PEPENODE work?', content:'PEPENODE is an interactive, gamified mining platform where holders create virtual server rooms filled with digital nodes. By using $PEPENODE tokens, you can purchase, enhance, and fine-tune these nodes to improve your mining performance. Over time, your setup produces meme coins, with higher rewards going to players who build the most efficient virtual rigs. Think of it as crypto mining without the power bills or expensive hardware.' },
    {id: generateRandomId(),title: 'What is virtual meme coin mining?', content:'Virtual meme coin mining, introduced by PEPENODE, is a fresh approach to digital asset mining. Instead of relying on physical computers, the entire process happens in a virtual environment. Users set up and manage digital nodes via the PEPE NODE official website which simulate mining to earn meme coins.' },
    {id: generateRandomId(),title: 'Why join the PEPENODE crypto presale?', content:'Taking part in the PEPENODE crypto presale means getting $PEPENODE tokens at entry-level prices before the official launch. Early supporters can stake their tokens for extra rewards and gain priority access to building powerful rigs. It’s your chance to claim a leading position in the next big meme coin project.' },
  ]
  const renderCardItem = (item) =>{
      
      return <div key={item?.id} className={styles.card}>
                  <div className={styles.cardTop}>
                      <h3 className={styles.cardTitle} > {item?.title} </h3>
                  </div>
                  <div className={styles.cardBottom}>
                    <p className={styles.cardContent}>{item?.content}</p>
                  </div>

              </div>

    }
  return (
    <section id="faqs" className={styles.container}>

        <div className={styles.mainContent}>
          <h1 className={styles.title}> {sectionText?.title} FAQ </h1>
          <p className={styles.desc}> {sectionText?.desc} Earn Bonuses in Meme Coins — Airdrops For Top Miners in $PEPE and $FARTCOIN</p>
          

            <div className={styles.cardList }>
                {cardItems.map(x=> renderCardItem(x))}
            </div>



          <div className={styles.buyNowContainer}>
            <button className={styles.buynow} onClick={scrollToBuySection}>
                {sectionText?.buyNow} Buy Presale Now
            </button>
          </div>

        </div>


    </section>
  );
};
