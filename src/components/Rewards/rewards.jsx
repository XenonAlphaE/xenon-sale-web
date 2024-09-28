import React, { useState } from 'react';
import Decimal from 'decimal.js';
import { useI18nSection } from "../../utils/languageUtils";


export const Rewards = () => {
  const rewardsSection = useI18nSection('rewards')
  const [progress, setProgress] = useState(40);
  const [inputValue, setInputValue] = useState(1000000);
  const [iBuy, setIBuy] = useState(1000000 * 0.00022);

  const scrollToBuySection = () => {
    // Find the target section to scroll to
    const section = document.getElementById('intro');

    // Scroll to the section
    section.scrollIntoView({ behavior: 'smooth' });
  };


  const handleChange = (event) => {
    setInputValue(event.target.value);
    const inputNumber = new Decimal(event.target.value);
    const result = inputNumber.times(0.00022);
    setIBuy(result.toString());
  };

  const handleKeyPress = (event) => {
    setInputValue(event.target.value);
    const inputNumber = new Decimal(event.target.value);
    const result = inputNumber.times(0.00022);
    setIBuy(result.toString());
  };

  // const handleChangePropressBar = (event) => {
  //   setProgress(parseInt(event.target.value)); // Cập nhật giá trị tiến trình khi người dùng thay đổi
  // };

  return (
    <div>
      <section id="story" className="story">
        <div className="wrapper d-flex justify-content-center align-items-center position-relative">
          <div className="text-center story-content text-white">
            <h2 translate="" className="font-lg-50">{rewardsSection?.title1}</h2>
            <h2 translate="" className="font-lg-50 pb-3">{rewardsSection?.title2}</h2>
            <p translate="" className="font-16 pb-3 px-lg-0"> {rewardsSection?.description}</p>
            <div className="d-flex justify-content-center align-items-center"><button className="btn btn-story px-5"><a href="/whitepaper.pdf" target="_blank"><span translate="" className="text-uppercase font-16">{rewardsSection?.button}</span></a></button></div>
          </div>
        </div>
      </section>
    </div>
  );
};
