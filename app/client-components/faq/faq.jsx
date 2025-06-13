'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import styles from './faq.module.css';
import { AppSpinner } from '../spinner/spinner';

const infoContents = [
  {
    number: "1",
    title: "What is Bitcoin Hyper?",
    contents: [
      { text: "The first true Bitcoin Layer 2 network. It enables fast, low-cost BTC transactions and unlocks staking, decentralized finance (DeFi), and applications built on-chain (dApps). Powered by a high-throughput virtual machine (SVM), BTC Hyper not only redefines what’s possible on Bitcoin, it is also the best crypto presale of 2025." }
    ]
  },
  {
    number: "2",
    title: "What is $HYPER?",
    contents: [
      { text: "$HYPER is the native token of the Bitcoin Hyper network – used for transactions, staking, and governance. The token is currently available in the earliest price stages in what is widely recognized as the best crypto presale to buy now, facilitated by Web3Toolkit payments and staking technology." }
    ]
  },
  {
    number: "3",
    title: "Why is Bitcoin Hyper important?",
    contents: [
      { text: "Bitcoin Hyper fixes Bitcoin’s slow transaction speed and high fees while maintaining Bitcoin-grade security. With BTC Hyper, users can send, receive, and interact with Bitcoin in near real-time, with minimal costs, and participate in the emerging Bitcoin-based DeFi economy." }
    ]
  },
  {
    number: "4",
    title: "How do I buy BTC Hyper?",
    contents: [
      { label: "Step 1:", text: "Get some crypto from an exchange. If you don’t yet have a wallet, consider Metamask. It allows you to easily enter the best crypto presales." },
      { label: "Step 2:", text: "Top up with crypto and you’ll be able to join the $HYPER crypto presale. Click Buy or Connect Wallet to start the purchase process." },
      { label: "Step 3:", text: "Select the amount of $HYPER tokens you wish to purchase. To stake in the same transaction, choose the Buy and Stake option." },
    ]
  },
  {
    number: "5",
    title: "How does Bitcoin Hyper work?",
    contents: [
      { label: "1. Bridge", text: "" },
      { text: "Send BTC to a designated Bitcoin address monitored by the Bitcoin Hyper Canonical Bridge." },
      { text: "The Bitcoin Relay Program (an SVM smart contract) verifies Bitcoin block headers and transaction proofs." },
      {text: "Once verified, an equivalent amount of BTC is minted trustlessly on Bitcoin Hyper Layer 2." },

      { label: "2. Layer 2 Operation", text: "" },
      { text: "Users can send, receive, and interact with BTC on Layer 2 with near-instant finality." },
      { text: "Supports complex functions like staking, decentralized trading, and more." },
      {text: "Built on an SVM architecture for speed and scalability." },

      { label: "3. Settlement and Security", text: "" },
      { text: "Transactions on Layer 2 are batched and compressed." },
      { text: "Zero-knowledge (ZK) proofs ensure validity." },
      {text: "The Layer 2 state is periodically committed to Bitcoin’s Layer 1, preserving Bitcoin-grade security." },

      { label: "4. Withdrawal to Layer 1", text: "" },
      { text: "Users can withdraw BTC back to Layer 1 by initiating a withdrawal request." },
      { text: "A proof is generated and submitted to the Canonical Bridge." },
      {text: "Upon validation, the BTC is released to the user’s original Bitcoin address." },

    ]
  },
  {
    number: "6",
    title: "When does the $HYPER crypto presale end?",
    contents: [
      { text: "The BTC Hyper ICO is limited and may end early based on demand. Follow our official channels for updates so you don't miss out on the best crypto presale of the year." },
    ]
  },
];


function FaqCard({ cardClass, title, contents }) {
  return (
    <div className={cardClass}>
      <div className={styles.cardNumber}></div>
      <div className={styles.cardTitle}>{title}</div>

      <ul className={styles.cardContent}>
        {contents.map((content, i) => (
          <li key={i}>
            <strong>{content.label}</strong> {content.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const FAQ = () => {
  const sectionText = useI18nSection('faqs')
  const currentLanguage = useLanguage()
  const [selectedIdx, setSelectedIdx] = useState();

  const scrollToBuySection = () => {
    // Find the target section to scroll to
    let section = null;

    section = document.getElementById('intro');

    if (!section) {
      window.location = `/${currentLanguage}`
      return
    }
    // Scroll to the section
    section.scrollIntoView({ behavior: 'smooth' });
  };


  const handleSelectSection = (idx) => {
    if (selectedIdx === idx) {
      setSelectedIdx("")
    } else {
      setSelectedIdx(idx)
    }
  }
  return (

    <section id="faqs" className={styles.container}>
      <h1 className={styles.title}>
        Bitcoin Hyper FAQ
      </h1>

      <div className={styles.mainContent}>
          <div className={styles.imgWrapper}>
              <img src="/img/btchyper/faq.gif" className={styles.imgGraphic}/>
          </div>

          <div  className={styles.cards}>
              <FaqCard cardClass={styles.card} title={infoContents[0].title} contents={infoContents[0].contents} />
              <FaqCard cardClass={styles.card} title={infoContents[1].title} contents={infoContents[1].contents} />
              <FaqCard cardClass={styles.card} title={infoContents[2].title} contents={infoContents[2].contents} />
              <FaqCard cardClass={styles.card} title={infoContents[3].title} contents={infoContents[3].contents} />
              <FaqCard cardClass={styles.card} title={infoContents[4].title} contents={infoContents[4].contents} />
          </div>

      </div>
    </section>
  );
};
