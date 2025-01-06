import React from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

export const ProgressBar = ({ percentage }) => {
  const sectionText = useI18nSection("buyForm")
  const containerStyle = {
    position: 'relative', // Position relative for absolute positioning of text
    width: '100%',
    // backgroundColor: bgColor || '',
    // borderColor:'#eee  ',
    // borderRadius: '15px',
    height: 10,
    // overflow:'hidden',
    // marginTop:"10px",
    // marginBottom:'10px',
  };

  const barStyle = {
    width: `${percentage}%`,
    height: '100%',
    background: 'linear-gradient(180deg, #ffffff80, #ffffff1a 52%, #fff0 52%, #ffffff0d), #f9a034',
    transition: 'width 0.3s ease',
    borderRadius: '6px',
  };


  const textStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width:"max-content",
    fontWeight: 500,
    transform: 'translate(-50%, -50%)',
    color: '#fff', /* Text color */
    fontSize: '14px', /* Adjust font size as needed */
  };

  return (
    <div style={containerStyle}>
      <div style={barStyle}></div>
      {/* <div style={textStyle}>{sectionText?.nextPriceAlert}</div> */}
    </div>
  );
};

