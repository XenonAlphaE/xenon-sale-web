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
    height: 30,
    background: '#fff',
    boxShadow: '-1.619px -1.619px #fff inset, 1.619px 1.619px gray inset, -3.237px -3.237px #c1c1c1 inset, 3.237px 3.237px #000 inset',
    overflow:'hidden',
    display:"flex",
    boxSizing:'border-box',

    alignItems:"center",
    padding:"1px 1px"

  };

  const barStyle = {
    width: `${percentage}%`,
    height: '100%',
    boxSizing:'border-box',
    transition: 'width 0.3s ease',
    background: '#000040'
  };

  const textStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width:"max-content",
    fontWeight: 500,
    transform: 'translate(-50%, -50%)',
    color: 'rgb(0, 0, 64)', /* Text color */
    fontSize: '12px', /* Adjust font size as needed */
  };

  return (
    <div style={containerStyle}>
      <div style={barStyle}></div>
    </div>
  );
};

