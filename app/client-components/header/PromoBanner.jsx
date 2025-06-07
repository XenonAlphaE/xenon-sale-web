// components/PromoBanner.jsx
import styles from './PromoBanner.module.css';

const PromoBanner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.badge}>1052% STAKING REWARDS</div>
      <div className={styles.imageWrapper}>
          <img src='/img/btchyper/slider-running.gif' alt="Mascot" className={styles.imageMascot} priority />
        </div>
      <div className={styles.content}>

        <div className={styles.textSection}>
          <h1 className={styles.title}>THE FIRST BITCOIN LAYER 2 CHAIN</h1>
          <p className={styles.subtitle}>SCALABILITY AND SPEED FOR BITCOIN ARE FINALLY HERE</p>
          <button className={styles.ctaButton}>PRESALE IS LIVE</button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
