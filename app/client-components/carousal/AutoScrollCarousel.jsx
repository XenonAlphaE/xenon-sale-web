'use client';

import React from 'react';
import styles from './AutoScrollCarousel.module.css';

const AutoScrollCarousel = ({ slides, renderSlide }) => {
  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.trackWrapper}>
        <div className={styles.track}>
          {[...slides, ...slides, ...slides, ...slides].map((slide, i) => (
            <div className={styles.slide} key={i}>
              {renderSlide(slide, i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
