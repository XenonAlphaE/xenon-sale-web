import React from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import { Display } from 'react-bootstrap-icons';

export const ProgressBar = ({ percentage }) => {
  const sectionText = useI18nSection("buyForm")
  const containerStyle = {
    position: 'relative', // Position relative for absolute positioning of text
    width: '100%',
    // backgroundColor: bgColor || '',
    // borderColor:'#eee  ',
    height: 12,
    overflow:'hidden',
    display:"flex",
    alignItems:"center",
    borderRadius: '18px',
    background: 'linear-gradient(#454545f0, #333335c4), url(/img/solx/snow-bg.gif) no-repeat 0 0 / 800px',
    // padding:"0px 4px"

  };

  const barStyle = {
    width: `${percentage}%`,
    height: '100%',
    borderRadius:"18px",
    transition: 'width 0.3s ease',
    background: 'linear-gradient(#03cdeff0, #8077fbc4), url(/img/solx/snow-bg.gif) no-repeat 0 0 / 800px'
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
      {/* <div style={textStyle}>{sectionText?.nextPriceAlert}</div> */}
    </div>
  );
};

