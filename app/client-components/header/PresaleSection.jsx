// components/PresaleSection.jsx
import { useI18nSection } from '../../../redux/utils/languageUtils';
import styles from './PresaleSection.module.css';

const PresaleSection = () => {
    const sectionText = useI18nSection('header')
  
  return (
    <section className={styles.container}>
      <div className={styles.leftPart}>
        <h2 className={styles.headline}>{sectionText?.headline}</h2>
        <h2 className={styles.headline1}>{sectionText?.headline1}</h2>
        <p className={styles.description}>

{sectionText?.description}
        </p>
        <p className={styles.description  }>
{sectionText?.description1}
        </p>
        <div className={styles.bannerList}>
          <div className={styles.bannerListItem}>
            {/* <img className={styles.bannerListImg} src="/img/pepenode/buy-icon.webp" alt="banner" /> */}
            <span> {sectionText?.tag} </span> 
          </div>
          <div className={styles.bannerListItem}>
            {/* <img className={styles.bannerListImg} src="/img/pepenode/upgrade-icon.webp" alt="banner" /> */}
            <span> {sectionText?.tag1} </span> 
          </div>
          <div className={styles.bannerListItem}>
            {/* <img className={styles.bannerListImg} src="/img/pepenode/meme-icon.webp" alt="banner" /> */}
            <span> {sectionText?.tag2} </span> 
          </div>
        </div>
        <div className={styles.rewards}>
          <p >4573%</p>
          <p > {sectionText?.staking} </p>
        </div>
        <div className={styles.buynow}>
              {sectionText?.buynow}
        </div>
        <p className={styles.bonus}>
              {sectionText?.bonus}
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
