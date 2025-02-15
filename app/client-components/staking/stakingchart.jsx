
'use client'; // This component will run on the client side

import React, {useState, useEffect} from 'react';
import { BarChart, Bar, ResponsiveContainer,Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { formatTokenNumber } from '../services/utils';
import './stakingchart.css';
export const StakingChart = () => {
    const [chartMargin, setChartMargin] = useState({ top: 50, right: 50, bottom: 100, left: 50 });

    // Update margins based on screen size
    const updateMargin = () => {
        if (window.innerWidth <= 768) {
        setChartMargin({ top: 20, right: 0, bottom: 100, left: 10 }); // Mobile margins
        } else {
        setChartMargin({ top: 50, right: 50, bottom: 100, left: 50 }); // Default margins
        }
    };

    useEffect(() => {
        updateMargin(); // Set the initial margin
        window.addEventListener('resize', updateMargin); // Listen for window resize
        return () => window.removeEventListener('resize', updateMargin); // Cleanup on unmount
    }, []);
    
    function getMonthlyIncrements(startDate, endDate, startValue, endValue) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let start = new Date(startDate);
        let end = new Date(endDate);
    
        let months = [];
        let current = new Date(start);
    
        // Count the number of months
        let monthsCount = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
        if (monthsCount <= 0) return []; // Invalid range
    
        let increment = (endValue - startValue) / (monthsCount - 1);
    
        for (let i = 0; i < monthsCount; i++) {
            let monthIndex = current.getMonth();
            let year = current.getFullYear();
    
            months.push({
                name: `${monthNames[monthIndex]}-${year}`,
                value: startValue + increment * i
            });
    
            // Move to the next month
            current.setMonth(current.getMonth() + 1);
        }
    
        return months;
    }

    const data = getMonthlyIncrements('2025-02-01', '2027-01-01', 18987500000, 21000000000)

    

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
            <div style={{ backgroundColor: '#555', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', color: 'white' }}>
                <p><strong>{payload[0].payload.name}</strong></p>
                <p>{formatTokenNumber(payload[0].value)}</p>
            </div>
            );
        }
        return null;
    };

      const formatYAxis = (value) => {
        if (value >= 1000000000) {
          return `${(value / 1000000000).toFixed(0)}B`; // Convert to billions with 'B'
        }
        return value; // Fallback for smaller values
      };
    const getCurrentMonthYearUTC = () => {
        const now = new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const utcMonth = monthNames[now.getUTCMonth()];
        const utcYear = now.getUTCFullYear();
        return `${utcMonth}-${utcYear}`; // Format "MMM-yyyy"
    };


    return (
        <ResponsiveContainer minHeight={500} minWidth={300}>

            <BarChart 
               
                data={data}
                margin={chartMargin}

                >

                <CartesianGrid 
                            stroke="#fff"               // Set grid line color to white
                            // strokeDasharray="5 5"        // Create dashed lines with 5px gaps
                        />
                <Tooltip content={<CustomTooltip />} />

                <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'white', 
                        fontSize: 12,
                        angle: -75, // Rotate the tick labels 50 degrees
                        textAnchor: 'end', // Align the text for proper rotation
                    }} 
                    interval={0}
                    label={{ 
                        value: 'Months', 
                        position: 'bottom', 
                        offset: 40, 
                        fill: 'white', 
                        fontSize: 24 ,
                    }} 
                    margin={{ top: 20, right: 20, bottom: 80, left: 80 }} // Adjust the bottom margin

                    />
                <YAxis 
                    tickFormatter={formatYAxis} 
                    tick={{ fill: 'white', fontSize: 12, fontWeight:900 }} // Text color and font size
                    label={{ 
                        value: 'Supply', 
                        angle: -90, 
                        position: 'insideLeft', 
                        fill: 'white', 
                        fontSize: 24 
                      }} 
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={ getCurrentMonthYearUTC() === entry.name ? " rgb(249, 186, 38)" : '#fff' } // Example condition for dynamic colors
                    />
                    ))}
                </Bar>


            </BarChart>
        </ResponsiveContainer>
    );
};