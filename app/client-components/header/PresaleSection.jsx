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

          {sectionText?.description}
        </p>
        <p className={styles.description}>
          {sectionText?.description1}
        </p>
        <p className={styles.description}>
          {sectionText?.tagline1} <br/>
          {sectionText?.tagline2} <br/>
          {sectionText?.tagline3}
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
