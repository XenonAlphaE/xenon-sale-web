'use client';

import React, { useEffect, useRef, useState } from 'react';
import './carousel.css';

export const Carousel = () => {
  const scrollContainerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);


  const items = [
    { title: 'Coingape', details: 'Latest news and updates from the crypto world.' },
    { title: 'Coinpedia', details: 'Comprehensive insights on cryptocurrencies and blockchain.' },
    { title: 'Cryptonews', details: 'Stay informed with the latest in cryptocurrency.' },
    { title: 'InsideBitcoin', details: 'Exploring bitcoin and blockchain technology.' },
    { title: 'Techopedia', details: 'Guides and articles on tech and blockchain.' },
  ];

  // Duplicate items for continuous scroll effect
  const duplicatedItems = [...items, ...items];

  const scrollAmount = 700; // Width of each item in pixels

  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,  // Correct direction for left scroll
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,  // Scroll right by the amount
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="carousel">
      <div className="carousel-track" ref={scrollContainerRef}>
        <div className='carousel-cards'>
          {duplicatedItems.map((item, index) => (
            <div key={index} className="carousel-card">
              <h3 className="carousel-card-header">{item.title}</h3>
              <p className="carousel-card-details">{item.details}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button onClick={scrollLeft} className="carousel-button">◀</button>
        <button onClick={scrollRight} className="carousel-button">▶</button>
      </div>
    </div>
  );
};
