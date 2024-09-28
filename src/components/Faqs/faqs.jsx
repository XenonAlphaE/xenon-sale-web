import React from "react";
import "./Faqs.css";
import { useI18nSection } from "../../utils/languageUtils";

export const Faqs = () => {
    const sectionText = useI18nSection('answer')

    return (
        <section id="faq" className="faq">
            <div className="lottie-rocket ng-star-inserted" style={{ width: "100%", height: "646px", maxWidth: "546px", margin: "0px auto" }}>
                <img style={{width : '600px', height: '600px'}} src="img/wienerdog/gif2.gif" />
            </div>

            <div className="position-relative">
                <div className="row justify-content-center">
                    <div className="faq-wrapper w-100">
                        <h2 translate="" className="heading font-50 mb-5 text-center text-primary text-uppercase"> {sectionText?.title}</h2>
                    </div>
                    <div className="col-xs-9 col-md-6">
                        <div role="tablist" className="panel-group mb-5" style={{ display: "block" }} aria-multiselectable="true">
                            <div className="panel ng-star-inserted" style={{ display: "block" }}  >
                                <div className="panel card panel-default">
                                    <div role="tab" className="panel-heading card-header panel-enabled">
                                        <div className="panel-title">
                                            <div role="button" className="div-toggle" aria-expanded="false" data-toggle="collapse" data-target="#answ1">

                                                <div accordion-heading="" className="font-16 font-md-26 position-relative w-100 p-3 text-white" ><span className="d-flex font-md-26"> {sectionText?.q1} </span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="answ1" role="tabpanel" className="panel-collapse collapse" aria-hidden="true">
                                        <div className="panel-body card-block card-body">
                                            <div accordion-panel="" className="ng-star-inserted"><span className="font-16 text-white font-md-26">  {sectionText?.answ1}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel ng-star-inserted" style={{ display: "block" }}  >
                                <div className="panel card panel-default">
                                    <div role="tab" className="panel-heading card-header panel-enabled">
                                        <div className="panel-title">
                                            <div role="button" className="div-toggle" aria-expanded="false" data-toggle="collapse" data-target="#answ2">

                                                <div accordion-heading="" className="font-16 font-md-26 position-relative w-100 p-3 text-white" ><span className="d-flex font-md-26"> {sectionText?.q2} </span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="answ2" role="tabpanel" className="panel-collapse collapse" aria-hidden="true">
                                        <div className="panel-body card-block card-body">
                                            <div accordion-panel="" className="ng-star-inserted"><span className="font-16 text-white font-md-26">  {sectionText?.answ2}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel ng-star-inserted" style={{ display: "block" }}  >
                                <div className="panel card panel-default">
                                    <div role="tab" className="panel-heading card-header panel-enabled">
                                        <div className="panel-title">
                                            <div role="button" className="div-toggle" aria-expanded="false" data-toggle="collapse" data-target="#answ3">

                                                <div accordion-heading="" className="font-16 font-md-26 position-relative w-100 p-3 text-white" ><span className="d-flex font-md-26"> {sectionText?.q3} </span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="answ3" role="tabpanel" className="panel-collapse collapse" aria-hidden="true">
                                        <div className="panel-body card-block card-body">
                                            <div accordion-panel="" className="ng-star-inserted"><span className="font-16 text-white font-md-26">  {sectionText?.answ3}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel ng-star-inserted" style={{ display: "block" }}  >
                                <div className="panel card panel-default">
                                    <div role="tab" className="panel-heading card-header panel-enabled">
                                        <div className="panel-title">
                                            <div role="button" className="div-toggle" aria-expanded="false" data-toggle="collapse" data-target="#answ4">

                                                <div accordion-heading="" className="font-16 font-md-26 position-relative w-100 p-3 text-white" ><span className="d-flex font-md-26"> {sectionText?.q4} </span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="answ4" role="tabpanel" className="panel-collapse collapse" aria-hidden="true">
                                        <div className="panel-body card-block card-body">
                                            <div accordion-panel="" className="ng-star-inserted"><span className="font-16 text-white font-md-26">  {sectionText?.answ4}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel ng-star-inserted" style={{ display: "block" }}  >
                                <div className="panel card panel-default">
                                    <div role="tab" className="panel-heading card-header panel-enabled">
                                        <div className="panel-title">
                                            <div role="button" className="div-toggle" aria-expanded="false" data-toggle="collapse" data-target="#answ5">

                                                <div accordion-heading="" className="font-16 font-md-26 position-relative w-100 p-3 text-white" ><span className="d-flex font-md-26"> {sectionText?.q5} </span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="answ5" role="tabpanel" className="panel-collapse collapse" aria-hidden="true">
                                        <div className="panel-body card-block card-body">
                                            <div accordion-panel="" className="ng-star-inserted"><span className="font-16 text-white font-md-26">  {sectionText?.answ5}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel ng-star-inserted" style={{ display: "block" }}  >
                                <div className="panel card panel-default">
                                    <div role="tab" className="panel-heading card-header panel-enabled">
                                        <div className="panel-title">
                                            <div role="button" className="div-toggle" aria-expanded="false" data-toggle="collapse" data-target="#answ6">

                                                <div accordion-heading="" className="font-16 font-md-26 position-relative w-100 p-3 text-white" ><span className="d-flex font-md-26"> {sectionText?.q6} </span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="answ6" role="tabpanel" className="panel-collapse collapse" aria-hidden="true">
                                        <div className="panel-body card-block card-body">
                                            <div accordion-panel="" className="ng-star-inserted"><span className="font-16 text-white font-md-26">  {sectionText?.answ6}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lottie img-fluid ng-star-inserted">
                <div style={{ width: "100%", height: "321px", maxWidth: "321px", margin: "0px auto" }}>
                    <img src="img/wienerdog/gif3.gif" style={{width: '100%', height: '350px', maxWidth: '546px', margin: '0px auto'}} />
                </div>
            </div>
        </section>
    );
};
