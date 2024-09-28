import React from "react";
import {useI18nSection} from "../../utils/languageUtils";


export const Featured = () => {
  const sectionText = useI18nSection('features')

  return (
    <div className=" text-center pd-top-100">
      <h1 className="setion_title text-center text-while">{sectionText.title}</h1>
      <div className="row justify-content-center d-none d-lg-flex block-top">
        <div className="col-sm-2 text-center">
          <img src="img/wienerdog//finbold.png" alt="Logo 1" className="img-fluid" />
        </div>
        <div className="col-sm-2 text-center">
          <img src="img/wienerdog/bitcoin.png" alt="Logo 2" className="img-fluid" />
        </div>
        <div className="col-sm-2 text-center">
          <img src="img/wienerdog/newsbtc.png" alt="Logo 3" className="img-fluid" />
        </div>
        <div className="col-sm-2 text-center">
          <img src="img/wienerdog/cyptonews.png" alt="Logo 4" className="img-fluid" />
        </div>
        <div className="col-sm-2 text-center">
          <img src="img/wienerdog/inside.png" alt="Logo 5" className="img-fluid" />
        </div>
        <div className="col-sm-2 text-center">
          <img src="img/wienerdog/techno.png" alt="Logo 6" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};
