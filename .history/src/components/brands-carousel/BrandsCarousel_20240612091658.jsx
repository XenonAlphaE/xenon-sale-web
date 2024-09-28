import React from "react";
import "./brands.css";
import { useI18nSection, useLanguage, useSetLanguage } from "../../utils/languageUtils";

export const BrandsCarousel = () => {
    const sectionText = useI18nSection('staking')
    return (
        <div className="brands-carosuel">
            <div className="dashboard">
                <div className="container">
                    <div className="row d-flex align-items-center pt-4">
                        <div className="col-lg-7 col-12">
                            <h1 translate="" className="text-white pb-3 heading m-0 text-uppercase pe-2 text-start">{sectionText.header}</h1>
                            <p translate="" className="font-21 sub-head text-white">{sectionText.subTitle}</p>
                        </div>
                        <div className="col-lg-5 col-12 justify-content-md-end d-flex">
                            <div className="d-flex">
                                <button disabled={true} translate="" className="btn btn-primary w-100">{sectionText.btnWithdraw}</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-12 mt-4">
                            <div className="box-wrap">
                                <div className="boxCustom">
                                    <div  >
                                        <span translate="" className="title font-20 text-uppercase mb-1 d-inline-block text-white">{sectionText.stakedBalance}</span>
                                        <h2 className="font-30 mt-2 text-white d-flex align-items-start">0 <span translate="" className="d-inline-block ms-2 font-12 fw-bold text-white">{sectionText.symbol}</span></h2>
                                    </div>
                                    <div  >
                                        <span translate="" className="title font-20 text-uppercase mb-1 d-inline-block text-white">{sectionText.yourBalance} </span>
                                        <h2 className="font-30 mt-2 text-white d-flex align-items-start">0 <span translate="" className="d-inline-block ms-2 font-12 fw-bold text-white">{sectionText.symbol}</span></h2>
                                    </div>

                                </div>
                                <div className="boxCustom">
                                    <div className="w-100">
                                        <div className="d-flex align-items-center justify-content-between"><span translate="" className="title font-20 text-uppercase mb-1 d-inline-block text-white">l{sectionText.ofPool} </span>
                                            <img src="/assets/images/svg-icons/info-icon.svg" alt="" className="img-fluid cursor-pointer" /></div>
                                        <h2 className="font-30 mt-2 text-white">0%</h2>
                                        <div  >
                                            <span translate="" className="title font-20 text-uppercase mb-1 d-inline-block text-white">{sectionText.totalStaked}</span>
                                            <h2 className="font-30 mt-2 text-white d-flex align-items-start">3,264,008,620 <span translate="" className="d-inline-block ms-2 font-12 fw-bold">{sectionText.symbol}</span></h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="boxCustom">
                                    <div  >
                                        <span translate="" className="title font-20 text-uppercase mb-1 d-inline-block text-white">{sectionText.estimatedRewards}</span>
                                        <h2 className="font-30 mt-2 text-break text-white">317% <sup translate="" className="d-inline-block ms-1 font-12 fw-bold">p/a</sup></h2>
                                    </div>
                                    <ul className="p-0 mt-3 mb-0">
                                        <li translate=""><img src="/img/wienerdog/ani-arrow.svg" height="8px" alt="" className="me-1 text-white" /> {sectionText.estimatedRewardsTitle1}</li>
                                        <li translate=""><img src="/img/wienerdog/ani-arrow.svg" height="8px" alt="" className="me-1 text-white" />{sectionText.estimatedRewardsTitle2}</li>
                                        <li translate=""><img src="/img/wienerdog/ani-arrow.svg" height="8px" alt="" className="me-1 text-white" />{sectionText.estimatedRewardsTitle3}</li>
                                    </ul>
                                </div>
                                <div className="boxCustom">
                                    <div  >
                                        <span translate="" className="title font-20 text-uppercase mb-1 d-inline-block text-white">{sectionText.currentRewards}</span>
                                        <h2 className="font-30 mt-2 d-flex align-items-start text-white">3938<span translate="" className="d-inline-block ms-2 font-12 fw-bold text-white">{sectionText.currentRewardsTitle}</span></h2>
                                    </div>
                                </div>
                                <div className="boxCustom">
                                    <div  >
                                        <span translate="" className="title font-20 text-uppercase mb-1 d-inline-block text-white">{sectionText.totalRewards}</span>
                                        <h2 className="font-30 mt-2 d-flex align-items-start text-white">0<span translate="" className="d-inline-block ms-2 font-12 fw-bold text-white">{sectionText.symbol}</span></h2>
                                    </div>
                                    <button disabled={true} translate="" className="btn btn-primary rounded-1 w-100"> <a href="/" className="text-decoration-n text-white" >{sectionText.claimRewards}</a> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 align-items-center justify-content-between">
                        <div className="col-lg-8 mb-3">
                            <div className="chart-wrapper">
                                <div className="d-flex justify-content-center px-3 align-items-center">
                                    <h4 translate="" className="mt-3 mb-md-5 text-center text-white fw-semibold" >{sectionText.totalSupply}</h4>
                                </div>
                                <div className="row">
                                    <div className="col graph-parent">
                                        <div className="ngx-charts-outer" >
                                            <svg className="ngx-charts">
                                                <g className="bar-chart chart" transform="translate(116 , 10)">
                                                    <g ngx-charts-x-axis="" className="ng-star-inserted">
                                                        <g className="x axis" transform="translate(0,294)">
                                                            <g ngx-charts-x-axis-ticks="" className="ng-star-inserted">
                                                                <g>
                                                                    <g className="tick ng-star-inserted" transform="translate(11.854166666666666,10)">
                                                                        <title className="ng-star-inserted">Mar-2024</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Mar-2024
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(43.5625,10)">
                                                                        <title className="ng-star-inserted">Apr-2024</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Apr-2024
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(75.27083333333333,10)">
                                                                        <title className="ng-star-inserted">May-2024</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            May-2024
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(106.97916666666667,10)">
                                                                        <title className="ng-star-inserted">Jun-2024</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Jun-2024
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(138.6875,10)">
                                                                        <title className="ng-star-inserted">Jul-2024</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Jul-2024
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(170.39583333333331,10)">
                                                                        <title className="ng-star-inserted">Aug-2024</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Aug-2024
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(202.10416666666666,10)">
                                                                        <title className="ng-star-inserted">Sep-2024</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Sep-2024
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(233.81249999999997,10)">
                                                                        <title className="ng-star-inserted">Oct-2024</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Oct-2024
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(265.5208333333333,10)">
                                                                        <title className="ng-star-inserted">Nov-2024</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Nov-2024
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(297.2291666666667,10)">
                                                                        <title className="ng-star-inserted">Dec-2024</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Dec-2024
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(328.9375,10)">
                                                                        <title className="ng-star-inserted">Jan-2025</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Jan-2025
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(360.6458333333333,10)">
                                                                        <title className="ng-star-inserted">Feb-2025</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Feb-2025
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(392.3541666666667,10)">
                                                                        <title className="ng-star-inserted">Mar-2025</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Mar-2025
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(424.0625,10)">
                                                                        <title className="ng-star-inserted">Apr-2025</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Apr-2025
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(455.7708333333333,10)">
                                                                        <title className="ng-star-inserted">May-2025</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            May-2025
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(487.4791666666667,10)">
                                                                        <title className="ng-star-inserted">Jun-2025</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Jun-2025
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(519.1875,10)">
                                                                        <title className="ng-star-inserted">Jul-2025</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Jul-2025
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(550.8958333333333,10)">
                                                                        <title className="ng-star-inserted">Aug-2025</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Aug-2025
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(582.6041666666666,10)">
                                                                        <title className="ng-star-inserted">Sep-2025</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Sep-2025
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(614.3124999999999,10)">
                                                                        <title className="ng-star-inserted">Oct-2025</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Oct-2025
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(646.0208333333333,10)">
                                                                        <title className="ng-star-inserted">Nov-2025</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Nov-2025
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(677.7291666666666,10)">
                                                                        <title className="ng-star-inserted">Dec-2025</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Dec-2025
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(709.4374999999999,10)">
                                                                        <title className="ng-star-inserted">Jan-2026</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Jan-2026
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(741.1458333333333,10)">
                                                                        <title className="ng-star-inserted">Feb-2026</title>
                                                                        <text strokeWidth="0.01" fontSize="12px" textAnchor="end" transform="rotate(-60)" className="ng-star-inserted">
                                                                            Feb-2026
                                                                        </text>

                                                                    </g>

                                                                </g>
                                                                <g transform="translate(11.854166666666666,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(43.5625,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(75.27083333333333,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(106.97916666666667,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(138.6875,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(170.39583333333331,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(202.10416666666666,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(233.81249999999997,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(265.5208333333333,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(297.2291666666667,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(328.9375,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(360.6458333333333,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(392.3541666666667,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(424.0625,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(455.7708333333333,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(487.4791666666667,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(519.1875,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(550.8958333333333,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(582.6041666666666,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(614.3124999999999,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(646.0208333333333,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(677.7291666666666,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(709.4374999999999,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>
                                                                <g transform="translate(741.1458333333333,10)" className="ng-star-inserted">
                                                                    <g transform="translate(0,-15)" className="ng-star-inserted">
                                                                        <line y2="0" className="gridline-path gridline-path-vertical" y1="-289"></line>
                                                                    </g>

                                                                </g>

                                                            </g>

                                                            <g ngx-charts-axis-label="" className="ng-star-inserted">
                                                                <text strokeWidth="0.01" x="376.5" y="86" textAnchor="middle" transform=""> Months </text>
                                                            </g>

                                                        </g>
                                                    </g>

                                                    <g ngx-charts-y-axis="" className="ng-star-inserted">
                                                        <g className="y axis" transform="translate(-5 , 0)">
                                                            <g ngx-charts-y-axis-ticks="" className="ng-star-inserted">
                                                                <g>
                                                                    <g className="tick ng-star-inserted" transform="translate(0,289)">
                                                                        <title className="ng-star-inserted">0M</title>
                                                                        <text strokeWidth="0.01" dy=".32em" x="-9" textAnchor="end" className="ng-star-inserted font-12">
                                                                            0M
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(0,206.42857142857144)">
                                                                        <title className="ng-star-inserted">10,000M</title>
                                                                        <text strokeWidth="0.01" dy=".32em" x="-9" textAnchor="end" className="ng-star-inserted font-12">
                                                                            10,000M
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(0,165.14285714285714)">
                                                                        <title className="ng-star-inserted">20,000M</title>
                                                                        <text strokeWidth="0.01" dy=".32em" x="-9" textAnchor="end" className="ng-star-inserted font-12">
                                                                            20,000M
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(0,123.85714285714286)">
                                                                        <title className="ng-star-inserted">30,000M</title>
                                                                        <text strokeWidth="0.01" dy=".32em" x="-9" textAnchor="end" className="ng-star-inserted font-12">
                                                                            30,000M
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(0,82.57142857142857)">
                                                                        <title className="ng-star-inserted">40,000M</title>
                                                                        <text strokeWidth="0.01" dy=".32em" x="-9" textAnchor="end" className="ng-star-inserted font-12">
                                                                            40,000M
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(0,41.2857142857143)">
                                                                        <title className="ng-star-inserted">50,000M</title>
                                                                        <text strokeWidth="0.01" dy=".32em" x="-9" textAnchor="end" className="ng-star-inserted font-12">
                                                                        50,000M
                                                                        </text>

                                                                    </g>
                                                                    <g className="tick ng-star-inserted" transform="translate(0,0)">
                                                                        <title className="ng-star-inserted">60,000M</title>
                                                                        <text strokeWidth="0.01" dy=".32em" x="-9" textAnchor="end" className="ng-star-inserted font-12">
                                                                            60,000M
                                                                        </text>

                                                                    </g>

                                                                </g>

                                                                <g transform="translate(0,289)" className="ng-star-inserted">
                                                                    <g transform="translate(5,0)" className="ng-star-inserted">
                                                                        <line x1="0" className="gridline-path gridline-path-horizontal ng-star-inserted" x2="753"></line>

                                                                    </g>

                                                                </g>
                                                                <g transform="translate(0,247.71428571428572)" className="ng-star-inserted">
                                                                    <g transform="translate(5,0)" className="ng-star-inserted">
                                                                        <line x1="0" className="gridline-path gridline-path-horizontal ng-star-inserted" x2="753"></line>

                                                                    </g>

                                                                </g>
                                                                <g transform="translate(0,206.42857142857144)" className="ng-star-inserted">
                                                                    <g transform="translate(5,0)" className="ng-star-inserted">
                                                                        <line x1="0" className="gridline-path gridline-path-horizontal ng-star-inserted" x2="753"></line>

                                                                    </g>

                                                                </g>
                                                                <g transform="translate(0,165.14285714285714)" className="ng-star-inserted">
                                                                    <g transform="translate(5,0)" className="ng-star-inserted">
                                                                        <line x1="0" className="gridline-path gridline-path-horizontal ng-star-inserted" x2="753"></line>

                                                                    </g>

                                                                </g>
                                                                <g transform="translate(0,123.85714285714286)" className="ng-star-inserted">
                                                                    <g transform="translate(5,0)" className="ng-star-inserted">
                                                                        <line x1="0" className="gridline-path gridline-path-horizontal ng-star-inserted" x2="753"></line>

                                                                    </g>

                                                                </g>
                                                                <g transform="translate(0,82.57142857142857)" className="ng-star-inserted">
                                                                    <g transform="translate(5,0)" className="ng-star-inserted">
                                                                        <line x1="0" className="gridline-path gridline-path-horizontal ng-star-inserted" x2="753"></line>

                                                                    </g>

                                                                </g>
                                                                <g transform="translate(0,41.2857142857143)" className="ng-star-inserted">
                                                                    <g transform="translate(5,0)" className="ng-star-inserted">
                                                                        <line x1="0" className="gridline-path gridline-path-horizontal ng-star-inserted" x2="753"></line>

                                                                    </g>

                                                                </g>
                                                                <g transform="translate(0,0)" className="ng-star-inserted">
                                                                    <g transform="translate(5,0)" className="ng-star-inserted">
                                                                        <line x1="0" className="gridline-path gridline-path-horizontal ng-star-inserted" x2="753"></line>

                                                                    </g>

                                                                </g>

                                                            </g>

                                                            <g ngx-charts-axis-label="" className="ng-star-inserted">
                                                                <text strokeWidth="0.01" x="-144.5" y="-86" textAnchor="middle" transform="rotate(270)"> Rewards </text>
                                                            </g>

                                                        </g>
                                                    </g>

                                                    <g ngx-charts-series-vertical="" className="ng-tns-c2512716207-0 ng-star-inserted">
                                                        <g className="ng-tns-c2512716207-0 ng-star-inserted">
                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M5,67.43333333402143h14a5,5 0 0 1 5,5v211v5h-5h-14h-5v-5v-211a5,5 0 0 1 5,-5z" aria-label="Mar-2024 107,333,333,333" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M36.70833333333333,62.61666666597856h14a5,5 0 0 1 5,5v216v5h-5h-14h-5v-5v-216a5,5 0 0 1 5,-5z" aria-label="Apr-2024 109,666,666,667" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M68.41666666666666,57.79999999999999h14a5,5 0 0 1 5,5v221v5h-5h-14h-5v-5v-221a5,5 0 0 1 5,-5z" aria-label="May-2024 112,000,000,000" fill="#9022FF"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M100.125,52.983333334021445h14a5,5 0 0 1 5,5v226v5h-5h-14h-5v-5v-226a5,5 0 0 1 5,-5z" aria-label="Jun-2024 114,333,333,333" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M131.83333333333331,48.16666666597858h14a5,5 0 0 1 5,5v230v5h-5h-14h-5v-5v-230a5,5 0 0 1 5,-5z" aria-label="Jul-2024 116,666,666,667" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M163.54166666666666,43.35000000000001h14a5,5 0 0 1 5,5v235v5h-5h-14h-5v-5v-235a5,5 0 0 1 5,-5z" aria-label="Aug-2024 119,000,000,000" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M195.25,38.53333333402143h14a5,5 0 0 1 5,5v240v5h-5h-14h-5v-5v-240a5,5 0 0 1 5,-5z" aria-label="Sep-2024 121,333,333,333" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M226.95833333333331,33.71666666597857h14a5,5 0 0 1 5,5v245v5h-5h-14h-5v-5v-245a5,5 0 0 1 5,-5z" aria-label="Oct-2024 123,666,666,667" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M258.66666666666663,28.899999999999995h14a5,5 0 0 1 5,5v250v5h-5h-14h-5v-5v-250a5,5 0 0 1 5,-5z" aria-label="Nov-2024 126,000,000,000" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M290.375,24.083333334021418h14a5,5 0 0 1 5,5v254v5h-5h-14h-5v-5v-254a5,5 0 0 1 5,-5z" aria-label="Dec-2024 128,333,333,333" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M322.0833333333333,19.26666666597856h14a5,5 0 0 1 5,5v259v5h-5h-14h-5v-5v-259a5,5 0 0 1 5,-5z" aria-label="Jan-2025 130,666,666,667" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M353.79166666666663,14.450000000000014h14a5,5 0 0 1 5,5v264v5h-5h-14h-5v-5v-264a5,5 0 0 1 5,-5z" aria-label="Feb-2025 133,000,000,000" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M385.5,13.245833334021423h14a5,5 0 0 1 5,5v265v5h-5h-14h-5v-5v-265a5,5 0 0 1 5,-5z" aria-label="Mar-2025 133,583,333,333" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M417.2083333333333,12.041666665978584h14a5,5 0 0 1 5,5v266v5h-5h-14h-5v-5v-266a5,5 0 0 1 5,-5z" aria-label="Apr-2025 134,166,666,667" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M448.91666666666663,10.837499999999993h14a5,5 0 0 1 5,5v268v5h-5h-14h-5v-5v-268a5,5 0 0 1 5,-5z" aria-label="May-2025 134,750,000,000" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M480.625,9.633333334021435h14a5,5 0 0 1 5,5v269v5h-5h-14h-5v-5v-269a5,5 0 0 1 5,-5z" aria-label="Jun-2025 135,333,333,333" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M512.3333333333333,8.429166665978565h14a5,5 0 0 1 5,5v270v5h-5h-14h-5v-5v-270a5,5 0 0 1 5,-5z" aria-label="Jul-2025 135,916,666,667" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M544.0416666666666,7.225000000000007h14a5,5 0 0 1 5,5v271v5h-5h-14h-5v-5v-271a5,5 0 0 1 5,-5z" aria-label="Aug-2025 136,500,000,000" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M575.75,6.020833334021416h14a5,5 0 0 1 5,5v272v5h-5h-14h-5v-5v-272a5,5 0 0 1 5,-5z" aria-label="Sep-2025 137,083,333,333" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M607.4583333333333,4.816666665978577h14a5,5 0 0 1 5,5v274v5h-5h-14h-5v-5v-274a5,5 0 0 1 5,-5z" aria-label="Oct-2025 137,666,666,667" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M639.1666666666666,3.6124999999999874h14a5,5 0 0 1 5,5v275v5h-5h-14h-5v-5v-275a5,5 0 0 1 5,-5z" aria-label="Nov-2025 138,250,000,000" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M670.875,2.408333334021429h14a5,5 0 0 1 5,5v276v5h-5h-14h-5v-5v-276a5,5 0 0 1 5,-5z" aria-label="Dec-2025 138,833,333,333" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M702.5833333333333,1.204166665978558h14a5,5 0 0 1 5,5v277v5h-5h-14h-5v-5v-277a5,5 0 0 1 5,-5z" aria-label="Jan-2026 139,416,666,667" fill="#E4E4E4"></path>
                                                            </g>

                                                            <g ngx-charts-bar="" ngx-tooltip="" className="ng-tns-c2512716207-0 ng-trigger ng-trigger-animationState ng-star-inserted">

                                                                <path stroke="none" role="img" tabIndex="-1" className="bar" d="M734.2916666666666,0h14a5,5 0 0 1 5,5v279v5h-5h-14h-5v-5v-279a5,5 0 0 1 5,-5z" aria-label="Feb-2026 140,000,000,000" fill="#E4E4E4"></path>
                                                            </g>

                                                        </g>

                                                    </g>
                                                </g>
                                            </svg>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div translate="" className="stake-text mt-2"><span className="text-white">Staking powered by</span><a href="https://web3paymentsolutions.io/" target="_blank"><img src="./img/wienerdog/W3P_Black.svg" alt="Web3Payments" /></a></div>
                        </div>
                        <div className="col-lg-4 mx-auto d-flex align-items-center justify-content-center"><img src="./img/wienerdog/logo.svg" alt="" width="500px" className="img-fluid bitcoin-img-sm d-block d-flex justify-content-end" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
