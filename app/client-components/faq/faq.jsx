'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import './faq.css';
import './faq.mobile.css';
import { Footer } from '../footer/footer';
import { AppSpinner } from '../spinner/spinner';


export const FAQ = () => {
  const sectionText = useI18nSection('faqs')
  const currentLanguage = useLanguage()
  const [selectedIdx , setSelectedIdx] = useState();

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

  const sections = [
    {
      title:"What is BTC Bull Token?",
      desc:"BTC Bull Token is a meme coin built to champion Bitcoin’s charge to $250,000 and beyond. The BTC Bull is not intimidated by any forces that would try to stop its rise to become the best investment asset in the world. Join us in this momentous crypto presale for the ride of a lifetime as we leave all historical opposition behind, gather millions of new supporters, and aim for the No.1 asset spot in the world above gold!"
    },
    {
      title:"Why should I buy the $BTCBULL crypto presale?",
      desc:"BTC Bull is the ultimate play for the next massive bull cycle that’s coming for Bitcoin (BTC), likely making $BTCBULL the best crypto presale to buy in 2025. $BTCBULL is a meme coin with a passionate community charged with championing the bull in all of us. What this means is, even $150K BTC is FUD – you are not bullish enough. Here we grow the BTC Bull community, we rise as BTC rises, and we finally reap the rewards of the best asset class in the world."
    },
    {
      title:"Can I really earn free Bitcoin airdrops?",
      desc:"Does a bull ever stutter? Yes! Hold $BTCBULL tokens in Your wallet and you’ll earn BTC airdrops when Bitcoin’s price reaches $150,000 and $200,000. Your BTC airdrops will be sent to your BTC address in Your wallet, and the amount will be weighted according to the number of $BTCBULL tokens you bought in the Community Sale."
    },
    {
      title:"Is this a free Bitcoin faucet or Bitcoin airdrop?",
      desc:"Not exactly. A free Bitcoin faucet allows people to redeem some free BTC at certain intervals. BTC Bull is offering free Bitcoin airdrops to holders of the $BTCBULL token. All you need to do is hold your tokens in Your wallet, or import the wallet you used to purchase $BTCBULL tokens into Your wallet, to be eligible."
    },
    {
      title:"What is the BTC Bull social media and support?",
      desc:`Follow BTC Bull on X (Twitter) and Telegram to join all your fellow Bitcoin Bulls and celebrate the ascension of BTC. Here you can also stay up to date with all project news and announcements.`
    },
    {
      title:"How does $BTCBULL staking work?",
      desc:"BTC Bull is built on Ethereum and secured by smart contracts, with staking powered by Web3Toolkit technology. An allocation of $BTCBULL tokens is set aside for staking rewards. Therefore, sending your $BTCBULL tokens to the staking contract allows you to earn variable APY and locks them up until the end of the Community Sale. Staked tokens can be withdrawn 7 days after claiming goes live."
    },
    {
      title:"When will I receive my $BTCBULL tokens?",
      desc:"Buying $BTCBULL in the Community Sale guarantees your allocation through the secure Web3Payments widget. These tokens can be claimed via the official website once the Community Sale is finished. If you purchase $BTCBULL through the Your wallet mobile app, you’ll enjoy full integration benefits such as direct token claiming, access to your token balance and live prices throughout the token sale, and immediate DEX trading upon launch."
    },
  ]
  
  const handleSelectSection = (idx) => {
    if(selectedIdx === idx){
      setSelectedIdx("")
    }else{
      setSelectedIdx(idx)
    }
  }
  return (
    <div id='faqs' className="faq-container">
        <div className='faq-content'>
        <h3 className="faq-heading">BTC Bull <span style={{color:"white"}}> FAQs </span> </h3>
        <div className='faq-list'>
                {sections.map((sec,idx) => {
                  return(
                    <div key={idx} className='faq-list-item-container'>
                        <div className='faq-list-item'>
                          <div className='faq-list-item-title' onClick={() => handleSelectSection(idx)}> {sec?.title} </div>
                          <img src="/img/btcbull/angle-down.svg" alt="arrow" style={{height:19}}/>
                        </div>
                        <p className={`faq-list-item-content  ${selectedIdx===idx ? 'active' : ''}`}> {sec?.desc}
                        </p>
                    </div>
                  )
                })}
              
            </div>
        </div>

        <Footer/>
    </div>
  );
};
