import React from "react";
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';

export const OutMore = () => {
  const scrollToBuySection = () => {
    // Find the target section to scroll to
    const section = document.getElementById('intro');

    // Scroll to the section
    section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="features" className="text-center" style={{paddingTop:100}}>
      <div>
        <div className="btn-whitepaper">
          <h1 className="setion_title">OUR DOGE JUST GOT MORE REWARDING</h1>
          <img src="img/about_line.svg" class=" line justify-content-center mx-auto" style={{maxWidth: '100%'}}></img>
          <p class="text-secondary-header">Prepare for the ultimate Doge upgrade! We're sending Elon's fave towards a more sustainable future. Stake DOGE20 today to start earning eco-friendly rewards.</p>
          <a type="button" className="btn-primary text-decoration-n" href="./img/whitepaper.pdf" target="_blank"> Whitepaper 
            <img style={{'margin-left': '5px'}} src="/img/go-right.svg" />
          </a>
          <a type="button" className="btn-purple text-decoration-n" href="https://coinsult.net/projects/dogecoin20/" target="_blank"> Audit</a>
        </div>
        <div className="row" style={{margin:0}}>
          <div className="about-image col-xs-12 col-md-6  d-flex justify-content-center">
            <img src="/img/about1.png" className="about-image-size" />
          </div>
          <div className="col-xs-12 col-md-6  setion_header d-flex flex-column justify-content-center align-items-center">
            <h1 class="setion_title body-title-header">Good Boy Staking!</h1>
            <p class="text-secondary"> Utilising smart contracts powered by Ethereum, DOGE20 is much more than a meme coin and brings passive earning potential to the community. Harness the power of your DOGE20 tokens by staking and earning rewards, making your tokens work for you. </p>
            <a type="button" className="btn-primary btn-left" onClick={scrollToBuySection} > BUY NOW <img src="/img/go-right.svg" /></a>
          </div>
        </div>
        <div className="row" style={{margin:0}}>
          <div className="col-12 col-md-6 setion_header d-flex flex-column justify-content-center align-items-center">
            <h1 class="setion_title body-title-header">CONVENIENT WALLET!</h1>
            <p class="text-secondary"> There’s no need to worry about complicated wallets and custody of your tokens. DOGE20 is built on Ethereum, meaning you automatically gain more flexibility with your ERC-20 tokens. Use what you already have. </p>
            <a type="button" className="btn-primary btn-left" onClick={scrollToBuySection}>  BUY NOW <img src="/img/go-right.svg" /></a>
          </div>
          <div className="about-image col-12 col-md-6 d-flex justify-content-center">
            <img src="/img/about2.png" className="about-image-size"
            />
          </div>
        </div>
        <div className="row" style={{ marginTop: "60px", marginBottom: "60px" , marginLeft:0, marginRight: 0}}>
          <div className="about-image col-xs-12 col-md-6 d-flex justify-content-center">
            <img src="/img/about3.png" className="about-image-size"
            />
          </div>
          <div className="col-xs-12 col-md-6 setion_header  d-flex flex-column justify-content-center align-items-center">
            <h1 class="setion_title body-title-header">NO MORE INFLATION!</h1>
            <p class="text-secondary"> Dogecoin is a beloved token but has been limited in its potential future worth because it has an infinite supply that will always emit more tokens into the market. DOGE20 fixes this with a fixed supply, allowing for unhindered upwards pressure on the token price. </p>
            <a type="button" className="btn-primary btn-left" onClick={scrollToBuySection} > BUY NOW <img src="/img/go-right.svg" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};