import React from "react";
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';
import { useI18nSection } from "../../utils/languageUtils";
import './outmore.css'
export const OutMore = () => {
    const scrollToBuySection = () => {
        // Find the target section to scroll to
        const section = document.getElementById('intro');

        // Scroll to the section
        section.scrollIntoView({ behavior: 'smooth' });
    };
    const sectionText = useI18nSection('outMore')

    return (
        <div id="whitepaper" className="text-center" style={{ paddingTop: 10, width: '100%' }}>
            <section id="stats" className="stats">
                <div className=" my-4">
                    <div className="row" style={{margin : 0}}>
                        <div className="col-md-3  col-xs-6  text-center text-primary">
                            <div className="font-sm-18 font-18">
                                {sectionText?.info1?.title}
                            </div>
                            <div className="font-23 font-sm-32">
                                2,836,579,477
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6  text-center text-primary">
                            <div className="font-sm-18 font-18">
                                {sectionText?.info2?.title}
                            </div>
                            <div className="font-23 font-sm-32">
                                68%
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6  text-center mt-3 mt-md-0 text-primary">
                            <div className="font-sm-18 font-18">
                                {sectionText?.info3?.title}
                            </div>
                            <div className="font-23 font-sm-32">
                                365%
                            </div>
                        </div>
                        <div className="col-xs-6 col-md-3 text-center mt-3 mt-md-0 text-primary">
                            <div className="font-sm-18 font-18">
                                {sectionText?.info4?.title}
                            </div>
                            <div className="font-23 font-sm-32">
                                1,268,193,520
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="outmore-videos-wrapper mt-5 my-lg-5">
                <div className="outmore-iframe-container">
                    <div className="outmore-iframe-wrapper" style={{width: '400px'}}><iframe style={{  width: '85%', height: '200px' }} src="https://www.youtube.com/embed/r6iDh-M-Rzk?si=MASb_MUun9tf6zM1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>
                    <div className="outmore-iframe-wrapper" style={{width: '400px'}}><iframe style={{  width: '85%', height: '200px' }} src="https://www.youtube.com/embed/PG965Q584fY?si=M8Se7CQoSOrbWHnG" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>
                    <div className="outmore-iframe-wrapper" style={{width: '400px'}}><iframe style={{  width: '85%', height: '200px' }} src="https://www.youtube.com/embed/HsbE9lmM64M?si=iAgB4wmCP1izrPjm" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>
                    <div className="outmore-iframe-wrapper" style={{width: '400px'}}><iframe style={{  width: '85%', height: '200px' }} src="https://www.youtube.com/embed/dbUR_ebWLII?si=FkExmnslWdOi3fOW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div> 
                    {/* <div className="outmore-iframe-wrapper" style={{width: '400px'}}><iframe style={{  width: '85%', height: '200px' }} src="https://www.youtube.com/embed/QazM4Lpc59M?si=GdQyVlmqz0woEqa9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>  */}
                </div>
            </section>
        </div>
    );
};