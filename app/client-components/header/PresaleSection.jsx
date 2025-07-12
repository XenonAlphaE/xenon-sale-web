// components/PresaleSection.jsx
import { useI18nSection } from '../../../redux/utils/languageUtils';
import styles from './PresaleSection.module.css';

const PresaleSection = () => {
    const sectionText = useI18nSection('header')
  
  return (
    <section className={styles.container}>
      <div className={styles.leftPart}>
        <h2 className={styles.headline}>{sectionText?.headline}</h2>
        <p className={styles.description}>
            Millions are slowly realizing the truth: 6900 is not just a number. It’s the natural peak of human thought, the divine intersection of meme and market, the new global benchmark for brain rot finance.
        </p>
        <p className={styles.description}>
            TOKEN6900 isn’t just greater than 500 — it’s above everything. It doesn’t track GDP, oil reserves, or corporate earnings. It tracks vibe liquidity. It’s not built on fundamentals. It’s built on delusion, irony, and the collective hallucination of terminally online traders. Welcome to the crypto presale fantasy. In a financial system still clinging to the illusion of growth, TOKEN6900 is a siren — not of danger, but of deliverance. This is the top. Forever.
        </p>
        <p className={styles.description}>
          TL;DR Hard Cap: 5 million uSD <br/>
          TL;DR Hard Cap: 5 million uSD <br/>
          TL;DR Hard Cap: 5 million uSD
        </p>
      </div>
      <div className={styles.rightPart}>
        <div className={styles.videoContainer}>
            <video className={styles.videoPlayer} controls poster='/img/token6900/video-thumbnail.png'>
              <source src="/img/token6900/banner-vdo.mp4" type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
        </div>
        <div className={styles.bannerList}>
          <img className={styles.bannerListItem} src="/img/token6900/banner-red.png" alt="banner" />
          <img className={styles.bannerListItem} src="/img/token6900/banner-green.png" alt="banner" />
          <img className={styles.bannerListItem} src="/img/token6900/banner-blue.png" alt="banner" />
        </div>
      </div>

    </section>
  );
};

export default PresaleSection;
