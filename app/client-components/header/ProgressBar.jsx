import React from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

export const ProgressBar = ({ percentage }) => {
  const sectionText = useI18nSection("buyForm")
  const containerStyle = {
    position: 'relative', // Position relative for absolute positioning of text
    width: '100%',
    // backgroundColor: bgColor || '',
    borderColor:'#eee  ',
    border: 'solid 3px',
    borderRadius: '15px',
    height: 30,
    overflow:'hidden',
    marginTop:"10px",
    marginBottom:'10px'
  };

  const barStyle = {
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: 'rgb(245, 136, 45)',
    transition: 'width 0.3s ease',
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
      <div style={textStyle}>{sectionText?.nextPriceAlert}</div>
    </div>
  );
};

