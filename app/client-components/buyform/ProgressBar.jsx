// ProgressBar.jsx or .tsx
import React from 'react';
import styles from './ProgressBar.module.css';

export const ProgressBar = ({ percentage }) => {
  return (
    <div className={styles.container}>
      <div className={styles.bar} style={{ width: `${percentage}%` }} />
      <div className={styles.text}> UNTIL PRICE INCREASE </div>
    </div>
  );
};
