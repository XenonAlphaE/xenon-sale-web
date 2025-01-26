
'use client'; // This component will run on the client side

import React, {useState, useEffect} from 'react';
import { BarChart, Bar, ResponsiveContainer,Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { formatViewNumber } from '../services/utils';
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
    
    const data = [
        {name: 'Sep-2024', value: 97500000000},
        {name: 'Oct-2024', value: 99000000000},
        {name: 'Nov-2024', value: 100500000000},
        {name: 'Dec-2024', value: 102000000000},
        {name: 'Jan-2025', value: 103500000000},
        {name: 'Feb-2025', value: 105000000000},
        {name: 'Mar-2025', value: 106500000000},
        {name: 'Apr-2025', value: 108000000000},
        {name: 'May-2025', value: 109500000000},
        {name: 'Jun-2025', value: 111000000000},
        {name: 'Jul-2025', value: 112500000000},
        {name: 'Aug-2025', value: 114000000000},
        {name: 'Sep-2025', value: 115500000000},
        {name: 'Oct-2025', value: 117000000000},
        {name: 'Nov-2025', value: 118500000000},
        {name: 'Dec-2025', value: 120000000000},
        {name: 'Jan-2026', value: 121500000000},
        {name: 'Feb-2026', value: 123000000000},
        {name: 'Mar-2026', value: 124500000000},
        {name: 'Apr-2026', value: 126000000000},
        {name: 'May-2026', value: 127500000000},
        {name: 'Jun-2026', value: 129000000000},
        {name: 'Jul-2026', value: 130500000000},
        {name: 'Aug-2026', value: 132000000000}];


    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
            <div style={{ backgroundColor: '#555', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', color: 'white' }}>
                <p><strong>{payload[0].payload.name}</strong></p>
                <p>{formatViewNumber(payload[0].value)}</p>
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
                            stroke="#ddd"               // Set grid line color to white
                            // strokeDasharray="5 5"        // Create dashed lines with 5px gaps
                        />
                <Tooltip content={<CustomTooltip />} />

                <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'black', 
                        fontSize: 12,
                        angle: -90, // Rotate the tick labels 50 degrees
                        textAnchor: 'end', // Align the text for proper rotation
                    }} 
                    interval={0}
                    label={{ 
                        value: 'Months', 
                        position: 'bottom', 
                        offset: 40, 
                        fill: 'black', 
                        fontSize: 24 ,
                    }} 
                    margin={{ top: 20, right: 20, bottom: 80, left: 80 }} // Adjust the bottom margin

                    />
                <YAxis 
                    tickFormatter={formatYAxis} 
                    tick={{ fill: 'black', fontSize: 12, fontWeight:900 }} // Text color and font size
                    label={{ 
                        value: 'Supply', 
                        angle: -90, 
                        position: 'insideLeft', 
                        fill: 'black', 
                        fontSize: 24 
                      }} 
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={ getCurrentMonthYearUTC() === entry.name ? "rgb(255, 199, 0)" : 'rgba(135, 135, 135, 0.7)' } // Example condition for dynamic colors
                    />
                    ))}
                </Bar>


            </BarChart>
        </ResponsiveContainer>
    );
};