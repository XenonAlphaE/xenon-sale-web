'use client';

import React, { useRef, useState, useEffect } from 'react';
import './carousel.css';

export const Carousel = () => {
  const scrollContainerRef = useRef(null);

  const items = [
    { title: 'Step 1', details: 'Latest news and updates from the crypto world.', outerClass: "carousel-card-1-outer", innerClass:"carousel-card-1-inner" },
    { title: 'Step 2', details: 'Latest news and updates from the crypto world.', outerClass: "carousel-card-2-outer", innerClass:"carousel-card-2-inner" },
    { title: 'Step 3', details: 'Latest news and updates from the crypto world.', outerClass: "carousel-card-3-outer", innerClass:"carousel-card-3-inner" },
  ];

  // Duplicate items for continuous scroll effect
  const duplicatedItems = [...items, ...items,    ...items

  ];

  const scrollAmount = 850; // Width of each item in pixels

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;

        // Scroll left smoothly
        scrollContainer.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth',
        });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;

        // Scroll right smoothly
        scrollContainer.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
      
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (!scrollContainer) return;

      const maxScrollPosition = ((2*items.length ) * scrollAmount) ;

      // Check if we are at the end of the scroll (right)
      if (scrollContainer.scrollLeft >= maxScrollPosition) {
        // Reset to the first item without jump
        scrollContainer.scrollLeft = scrollAmount * items.length;
      }
  

      // Check if we are at the beginning of the scroll (left)
      if (scrollContainer.scrollLeft === 0) {
        // Reset to the last item without jump
        scrollContainer.scrollLeft = scrollAmount * items.length;
      }
    };

    scrollContainer?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer.scrollLeft === 0) {
      // Reset to the last item without jump
      scrollContainer.scrollLeft = scrollAmount * items.length;
    }

    
  }, []);



  return (
    <div className="carousel">
      <div className="carousel-track" ref={scrollContainerRef}>
        <div className="carousel-cards">
            {duplicatedItems.map((item, index) => (
                <div key={index} className={item.outerClass}>
                  <div className={item.innerClass}>
                    <h3 className="carousel-card-header">{item.title}</h3>
                    <p className="carousel-card-details">{item.details}</p>
                  </div>
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
