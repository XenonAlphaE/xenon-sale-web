// File: SolanaLabel.js
import React from "react";
import styles from "./SolanaLabel.module.css";

function SolanaLabel({ label = "Solana", onClick, className = "" }) {
  const rootCls = [
    styles.container,

    onClick ? styles.clickable : "",
    className
  ].filter(Boolean).join(" ");

  return (
    <div
      className={rootCls}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      aria-label={`${label}`}
    >
        
      <div className={styles.icon} aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="8" width="20" height="3" rx="1.5" fill="url(#g)"/>
          <rect x="2" y="13" width="20" height="3" rx="1.5" fill="url(#g)"/>
          <defs>
            <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#00FFA3"/>
            <stop offset="33%" stopColor="#03E1FF"/>
            <stop offset="66%" stopColor="#9945FF"/>
            <stop offset="100%" stopColor="#FF0080"/>
            </linearGradient>
         </defs>
        </svg>
      </div>
      <div>
      <a href="/solana">
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <div className={styles.symbol}>{label}</div>
        </div>
      </a>  
      </div>
    </div>
  );
}

export default SolanaLabel;

// Usage:
// import SolanaLabel from './SolanaLabel';
// <SolanaLabel label="Solana" symbol="SOL" />
