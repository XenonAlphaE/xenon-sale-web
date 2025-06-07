import React from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import { Border, Display } from 'react-bootstrap-icons';

export const ProgressBar = ({ percentage }) => {
  const sectionText = useI18nSection("buyForm")
  const containerStyle = {
    position: 'relative', // Position relative for absolute positioning of text
    width: '100%',
    // backgroundColor: bgColor || '',
    // borderColor:'#eee  ',
    height: 20,
    overflow:'hidden',
    display:"flex",
    alignItems:"center",
    borderRadius: '10px',
    background: '#535660',
    padding:"1px 1px"

  };

  const barStyle = {
    width: `${percentage}%`,
    height: '100%',
    borderRadius: '10px',
    boxSizing:'border-box',
    border:'solid 2px white',
    transition: 'width 0.3s ease',
    background: 'rgb(247, 148, 29)'
  };

  const textStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width:"max-content",
    fontWeight: 500,
    transform: 'translate(-50%, -50%)',
    color: 'white', /* Text color */
    fontSize: '12px', /* Adjust font size as needed */
  };

  return (
    <div style={containerStyle}>
      <div style={barStyle}></div>
      <div style={textStyle}>{sectionText?.nextPriceAlert}</div>
    </div>
  );
};

