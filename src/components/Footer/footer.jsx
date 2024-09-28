import React, { useState, useEffect } from 'react';

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Adjust the breakpoint as needed
    };

    handleResize(); // Check initial viewport width
    window.addEventListener('resize', handleResize); // Add event listener for window resize

    return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
  }, []);


  return (
    <div id="team" style={{ 'background-color': '#171717' }} >
      <img src="img/footer.svg" style={{ 'width': '100%' }} />
      <div className="container" >
        <div class="row" style={{ 'padding-top': '50px' }}>
          <div className="col-md-6 d-flex flex-column ng-star-inserted">
            <div className="footer-logo">
              <img src="./img/token.svg" alt="" width="240px" className="d-block footer-logo text-center" />
              <h3 className="text-uppercase footer-heading my-lg-4 font-18">Dogecoin20</h3>
              <a href='https://playdoges.io'>PlayDoge PreSale</a>
              <a href='https://pepeunchaineds.com'>Pepe Unchained PreSale</a>
              <a href='https://wienedog.com'>WienerDog PreSale</a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-sm-12 col-md-4 d-flex flex-column text-align-left">
                <div className="my-md-3">
                  <a className="footer-a d-block text-tertiary text-uppercase footer-nav font-14 ng-star-inserted" title="about">About</a>
                  <a className="footer-a d-block text-tertiary text-uppercase footer-nav font-14 ng-star-inserted" title="roadmap">ROADMAP</a>
                  <a className="footer-a d-block text-tertiary text-uppercase footer-nav font-14 ng-star-inserted" title="returns">Rewards</a>
                  <a className="footer-a d-block text-tertiary text-uppercase footer-nav font-14 ng-star-inserted" title="faqs">FAQ</a>
              </div>
              </div>
              <div className="col-sm-12 col-md-4 d-flex flex-column text-align-left">
                <div className="my-md-3">
                  <a className="footer-a footer-nav text-tertiary d-block text-uppercase font-14 ng-star-inserted" href="/assets/documents/Dogecoin20- Privacy Policy.pdf">Privacy Policy</a>
                  <a className="footer-a footer-nav text-tertiary d-block text-uppercase font-14 ng-star-inserted" href="/assets/documents/Dogecoin20- Cookies Policy.pdf">Cookies</a>
                  <a className="footer-a footer-nav text-tertiary d-block text-uppercase font-14 ng-star-inserted" href="/assets/documents/Dogecoin20- Terms of Service.pdf">Terms &amp; Conditions</a>
                </div>
              </div>
              {!isMobile && <div className="col-md-4 address-div text-align-right d-sm-none">
                <div className="my-md-3 footer-nav text-md-end">
                  <p className="font-16 text-tertiary footer-address">4th Floor</p>
                  <p className="font-16 text-tertiary footer-address">Woofer Street</p>
                  <p className="font-16 text-tertiary footer-address">Doge Trade Center</p>
                  <p className="font-16 text-tertiary footer-address">Panama</p>
                  <a className="text-lowercase text-tertiary footer-address text-decoration-underline fw-bold email">marketing@dogecoin20.io</a>
                </div>
              </div>}
            </div>
            <div className="row padding-bot">
              <div className="col-12">
                <div className="social-icons d-flex align-items-center justify-content-start justify-content-md-end">
                  <a href="https://twitter.com/DOGE_COIN20" className="mx-1 border-0 footer-a"><img src="./img/twitter-light.svg" /></a>
                  <a href="https://t.me/DOGE_COIN20" className="mx-1 border-0 footer-a"><img src="./img/telegram-light.svg" /></a>
                </div>
                <div className="font-15 text-tertiary fw-regular text-md-end text-align-right">2024 Dogecoin20. All Rights Reserved.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
