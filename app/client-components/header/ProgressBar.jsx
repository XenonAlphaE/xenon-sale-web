import React from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import { Display } from 'react-bootstrap-icons';

export const ProgressBar = ({ percentage }) => {
  const sectionText = useI18nSection("buyForm")
  const containerStyle = {
    position: 'relative', // Position relative for absolute positioning of text
    width: '100%',
    // backgroundColor: bgColor || '',
    borderColor:'#eee  ',
    backgroundImage: `url('/img/wepe/progress-bar.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize:"100% 100%",
    height: 36,
    overflow:'hidden',
    display:"flex",
    alignItems:"center",
    padding:"0px 4px"

  };

  const barStyle = {
    width: `${percentage}%`,
    height: '66%',
    borderRadius:"4px",
    backgroundColor: 'rgb(1, 255, 26)',
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
    fontSize: '12px', /* Adjust font size as needed */
  };

  return (
    <div style={containerStyle}>
      <div style={barStyle}></div>
      <div style={textStyle}>{sectionText?.nextPriceAlert}</div>
    </div>
  );
};

