// components/PresaleSection.jsx
import styles from './PresaleSection.module.css';

const PresaleSection = () => {
  return (
    <section className={styles.wrapper}>

      <div className={styles.content}>
        <h2 className={styles.headline}>THE BITCOIN HYPER PRESALE</h2>
        <h3 className={styles.subheadline}>
          BUY $HYPER BEFORE IT POWERS THE FASTEST LAYER IN BITCOIN HISTORY.
        </h3>

        <p className={styles.description}>
          Bitcoin Hyper finally unlocks fast and cheap Bitcoin transactions.<br />
          This unleashes the true power of Bitcoin. <strong>Payments. Meme Coins. dApps.</strong><br />
          2025 will be remembered as the year BTC Hyper changed everything.
        </p>

        <p className={styles.tagline}>
          <strong>Bitcoin Hyper. Building Bitcoin's Future.</strong>
          <span className={styles.underline}></span>
        </p>

        <div className={styles.audit}>
          <span className={styles.auditText}>TRUST AND SAFETY AUDITS</span>
          <img src={'/img/btchyper/coinsult.svg'} alt="Coinsult" width={100} height={28} />
        </div>

        <div className={styles.bullets}>
          <div className={styles.bullet}>SCALABILITY</div>
          <div className={styles.bullet}>SPEED</div>
          <div className={styles.bullet}>MEMES</div>
        </div>
      </div>

      <img src={'/img/btchyper/shoes.gif'} alt="Right Shoe" className={styles.rightShoe} />
    </section>
  );
};

export default PresaleSection;
