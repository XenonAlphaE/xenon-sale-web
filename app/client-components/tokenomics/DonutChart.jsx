import React from "react";
import "./DonutChart.css";
import { useI18nSection } from "../../../redux/utils/languageUtils";

const DonutChart = () => {
  const sectionText = useI18nSection('tokenomics')
  
  const data = [
    { value: 10, color: "#F72585" }, // Pink-red
    { value: 20, color: "#3FFFA8" }, // Green
    { value: 30, color: "#FFA500" }, // Orange
    { value: 40, color: "#FF6F61" }, // Coral pink
  ];

  const total = data.reduce((acc, item) => acc + item.value, 0);
  let cumulative = 0;

  const radius = 100;
  const strokeWidth = 40;
  const viewBoxSize = 260;
  const center = viewBoxSize / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="donut-container">
      <svg
        width={viewBoxSize}
        height={viewBoxSize}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#1a1a1a"
          strokeWidth={strokeWidth}
        />
        {data.map((segment, index) => {
          const offset = circumference * (1 - cumulative / total);
          const dashArray = (segment.value / total) * circumference;
          cumulative += segment.value;

          return (
            <circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashArray} ${circumference - dashArray}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
            />
          );
        })}
        <text x={center} y={center - 5} textAnchor="middle" className="donut-value">
          45M
        </text>
        <text x={center} y={center + 15} textAnchor="middle" className="donut-label">
          {sectionText?.total}
        </text>
      </svg>
    </div>
  );
};

export default DonutChart;
