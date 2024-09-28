import React from "react";

export const Featured = () => {
  return (
    <div class="container text-center">
      <h1 className="setion_title text-center">Featured In</h1>
      <div class="row justify-content-center d-none d-lg-flex block-top">
        <div class="col-sm-3 text-center">
          <img src="img/feature1.svg" alt="Logo 1" class="img-fluid" />
        </div>
        <div class="col-sm-3 text-center">
          <img src="img/feature2.svg" alt="Logo 2" class="img-fluid" />
        </div>
        <div class="col-sm-3 text-center">
          <img src="img/feature3.svg" alt="Logo 3" class="img-fluid" />
        </div>
        <div class="col-sm-3 text-center">
          <img src="img/feature4.svg" alt="Logo 4" class="img-fluid" />
        </div>
      </div>
      <div className="row block-bottom">
        <div class="col-sm-4 text-center">
          <img src="img/feature5.svg" alt="Logo 5" class="img-fluid" />
        </div>
        <div class="col-sm-4 text-center">
          <img src="img/feature6.svg" alt="Logo 6" class="img-fluid" />
        </div>
        <div class="col-sm-4 text-center">
          <img src="img/feature7.svg" alt="Logo 7" class="img-fluid" />
        </div>
      </div>
    </div>
  );
};
