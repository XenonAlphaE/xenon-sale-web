import React, { useState, useEffect } from 'react';

export const useCountdown = (futureTime) => {
  const calculateTimeLeft = () => {
    // console.log('Future Time:', futureTime);
    const currentTime = new Date().getTime();
    // console.log('Current Time:', currentTime);
    
    const difference = futureTime - currentTime;
    // console.log('Difference:', difference);
    let timeLeft = {days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

    return timeLeft;
};
