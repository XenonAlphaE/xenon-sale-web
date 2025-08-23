// components/PresaleSection.jsx
import { useI18nSection } from '../../../redux/utils/languageUtils';
import styles from './PresaleSection.module.css';

const PresaleSection = () => {
    const sectionText = useI18nSection('header')
  
  return (
    <section className={styles.container}>
      <div className={styles.leftPart}>
        <h2 className={styles.headline}>Pepenode Token Presale</h2>
        <h2 className={styles.headline1}>MINE-TO-EARN memecoin</h2>
        <p className={styles.description}>

PEPENODE lets you build your own virtual meme coin mining rig.
        </p>
        <p className={styles.description  }>
Buy Nodes. Build Your Server Room. Combine Nodes For Huge Bonuses.
        </p>
        <div className={styles.bannerList}>
          <div className={styles.bannerListItem}>
            <img className={styles.bannerListImg} src="/img/pepenode/buy-icon.webp" alt="banner" />
            <span> Buy Meme Nodes </span> 
          </div>
          <div className={styles.bannerListItem}>
            <img className={styles.bannerListImg} src="/img/pepenode/upgrade-icon.webp" alt="banner" />
            <span> Upgrade Facilities </span> 
          </div>
          <div className={styles.bannerListItem}>
            <img className={styles.bannerListImg} src="/img/pepenode/meme-icon.webp" alt="banner" />
            <span> Earn meme Coins </span> 
          </div>
        </div>
        <div className={styles.rewards}>
          <p >4573%</p>
          <p >staking rewards</p>
        </div>
        <div className={styles.buynow}>
            Buy $PEPENODE Presale Now
        </div>
        <p className={styles.bonus}>
          Earn Bonuses in Meme Coins — Airdrops For Top Miners in $PEPE, $FARTCOIN and more...
        </p>
      </div>
      <div className={styles.rightPart}>
        <div className={styles.videoContainer}>
          <video className={styles.videoPlayer} autoplay="true" muted="true" playsinline="true" loop="true">
              <source src="/img/pepenode/banner.mp4" type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
        </div>
      </div>

    </section>
  );
};

export default PresaleSection;
