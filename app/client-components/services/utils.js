import React, { useState, useEffect } from 'react';
import BN from "bn.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

function nearestDayDivisibleBy3(targetHour) {
  const today = new Date();
  let day = today.getUTCDate(); // Get the current day of the month in UTC
  
  // Calculate the offset to the next day divisible by 3
  let offset = (3 - (day % 3)) % 3; // Days to add to reach the next divisible-by-3 day
  if (offset === 0) {
    offset = 3; // Always ensure the day is in the future
  }
  
  const nearestDay = day + offset; // Compute the nearest future day

  // Set the nearest day with the specified target hour in UTC
  today.setUTCDate(nearestDay);
  today.setUTCHours(targetHour, 0, 0, 0); // Set the target hour in UTC

  return today.toISOString(); // Return the time in Zulu (UTC) format
}



export function shortenText(text) {
  if(!text) {
    return "";
  }
  
  if (text.length <= 10) return text; // If the text is too short, no need to modify it
  const prefix = text.slice(0, 14);    // Get the first 6 characters
  const suffix = text.slice(-4);      // Get the last 4 characters
  return `${prefix}...${suffix}`;     // Combine with '...' in the middle
}

export function customHash(hex) {
  if(!hex){
    return ""
  }
  // Define a custom character set (62 characters: A-Z, a-z, 0-9)
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Validate and clean up the hex input (with or without '0x' prefix)
  function verifyHex(hex) {
    if (hex.startsWith('0x')) {
      hex = hex.slice(2); // Remove the '0x' prefix
    }
    if (!/^[0-9a-fA-F]{40}$/.test(hex)) {
      throw new Error('Invalid hex input. Must be a 40-character hexadecimal string.');
    }
    return hex;
  }

  // Convert each two hex digits into an index for the charset
  function convertHexToCharset(hex) {
    let result = '';
    for (let i = 0; i < hex.length; i += 4) {
      const hexPair = hex.substr(i, 4); // Take two hex characters at a time
      const decimalValue = parseInt(hexPair, 16); // Convert hex pair to decimal
      const index = decimalValue % charset.length; // Map the value to the charset index
      result += charset[index];
    }
    return result;
  }

  // Verify and process the input
  const validHex = verifyHex(hex); // Validate the hex input
  const result = convertHexToCharset(validHex); // Convert to 10-character string
  return result.slice(0, 10); // Return only the first 10 characters
}

export const useCountdown = () => {
  const calculateTimeLeft = () => {
    // console.log('Future Time:', futureTime);
    const currentTime = new Date().getTime();
    // console.log('Current Time:', currentTime);
    const futureTime = new Date(nearestDayDivisibleBy3(9)).getTime()
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



export function getRandomItemFromArray(input, defaultValue = null) {
  // Check if input is undefined or null (falsy)
  if (input === undefined || input === null) {
    throw new TypeError('Input cannot be undefined or null');
  }

  // Convert input to an array (if not already)
  const list = Array.isArray(input) ? input : [input];

  // Check if the array is empty
  if (list.length === 0) {
    return defaultValue;
  }

  // Get a random index within the list length
  const randomIndex = Math.floor(Math.random() * list.length);

  // Return the item at the random index
  return list[randomIndex];
}

export function formatTokenNumber(num) {
  // Convert string to number if necessary
  const parsedNum = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;

  // Handle invalid input
  if (isNaN(parsedNum)) {
    throw new Error('Invalid input: must be a valid number or numeric string');
  }

  return parsedNum
    .toFixed(2) // Round to 2 decimal places
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas as thousand separators
}


export function roundUpToNextMillion(num) {
  const unit = 300_000;
  return Math.ceil((num + 1) / unit) * unit;
}

export function formatIntNumber(num) {
  // Convert string to number if necessary
  const parsedNum = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;

  // Handle invalid input
  if (isNaN(parsedNum)) {
    throw new Error('Invalid input: must be a valid number or numeric string');
  }

  return parsedNum
    .toFixed(0) // Round to 2 decimal places
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas as thousand separators
}


export function toPaddedSymbol(symbolStr, padChar = '_', length = 8) {
  const buf = Buffer.alloc(length, padChar);
  buf.write(symbolStr);
  return buf;
}


export function parseAmountToBN(
  text,
  decimals,
  rounding
) {
  const s = text.trim().replace(/_/g, "").replace(/,/g, "");
  if (!/^[+-]?\d*(\.\d*)?$/.test(s)) throw new Error("Invalid number format");

  const neg = s.startsWith("-");
  const [intPartRaw, fracPartRaw = ""] = s.replace(/^[+-]/, "").split(".");
  const intPart = intPartRaw === "" ? "0" : intPartRaw;
  const pow = new BN(10).pow(new BN(decimals));
  const fracPart = (fracPartRaw + "0".repeat(decimals)).slice(0, decimals);

  let n = new BN(intPart).mul(pow).add(new BN(fracPart || "0"));

  if (fracPartRaw.length > decimals && rounding !== "truncate") {
    const nextDigit = parseInt(fracPartRaw[decimals] || "0", 10);
    const hasExtraNonZero = /[1-9]/.test(fracPartRaw.slice(decimals + 1));
    if (rounding === "round" && (nextDigit > 5 || (nextDigit === 5 && hasExtraNonZero))) {
      n = n.addn(1);
    } else if (rounding === "ceil" && (nextDigit > 0 || hasExtraNonZero)) {
      n = n.addn(1);
    }
  }

  return neg ? n.neg() : n;
}

export const parseSolToLamportsBN = (text, rounding) => // "truncate"|"round"|"ceil") =>
  parseAmountToBN(text, 9, rounding);

// lamports → SOL
export function lamportsToSol(lamports) {
  return lamports / LAMPORTS_PER_SOL;
}

export function calculateRaise(
  lastestUpdated,
  lastestRaise,
  dailyRaise
) {
  const lastUpdated = new Date(lastestUpdated).getTime() / 1000; // Convert to seconds
  const currentTime = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const differenceInSeconds = currentTime - lastUpdated; // Difference in seconds
  const fullDatePortions  = Math.floor(differenceInSeconds / 86400) ;
  const portionMins = ((differenceInSeconds % 86400)  / 60 ); // 30-sec portions
  const baseIncreasePerMins = dailyRaise / 1440; // Normal increase per portion (since 2880 periods in a day)


  let totalIncrease = fullDatePortions * dailyRaise
  let sumPortions = 0;
  // ✅ 60 multipliers
  const portionMultipliers = [
    0, 0.5, 2.0, 0, 3.5, 1.2, 0.8, 4.5, 0, 1.0,
    2.5, 0, 1.3, 5.0, 0.7, 0, 6.0, 0.4, 2.0, 0,
    3.0, 1.1, 0, 4.8, 0.6, 2.2, 0, 1.5, 5.5, 0,
    0.9, 3.8, 0, 2.0, 1.4, 0, 6.0, 0.5, 1.0, 0,
    4.2, 0.8, 0, 2.6, 1.1, 0, 3.9, 0.7, 0, 5.0,
    1.2, 0, 2.0, 0.6, 4.4, 0, 1.3, 0.9, 0, 6.0
  ];

  for (let i = 0; i < portionMins; i++) {
    const mod = i % portionMultipliers.length;
    sumPortions += portionMultipliers[mod];
  }

  totalIncrease += sumPortions * baseIncreasePerMins;
  const newRaise = lastestRaise + totalIncrease;

  return {
    currentRaise: newRaise,
    nextRaise: roundUpToNextMillion(newRaise),
  };
}
