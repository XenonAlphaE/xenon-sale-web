
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
    
    const data = [
        {name: 'Sep-2024', value: 9750000000},
        {name: 'Oct-2024', value: 9900000000},
        {name: 'Nov-2024', value: 10050000000},
        {name: 'Dec-2024', value: 10200000000},
        {name: 'Jan-2025', value: 10350000000},
        {name: 'Feb-2025', value: 10500000000},
        {name: 'Mar-2025', value: 10650000000},
        {name: 'Apr-2025', value: 10800000000},
        {name: 'May-2025', value: 10950000000},
        {name: 'Jun-2025', value: 11100000000},
        {name: 'Jul-2025', value: 11250000000},
        {name: 'Aug-2025', value: 11400000000},
        {name: 'Sep-2025', value: 11550000000},
        {name: 'Oct-2025', value: 11700000000},
        {name: 'Nov-2025', value: 11850000000},
        {name: 'Dec-2025', value: 12000000000},
        {name: 'Jan-2026', value: 12150000000},
        {name: 'Feb-2026', value: 12300000000},
        {name: 'Mar-2026', value: 12450000000},
        {name: 'Apr-2026', value: 12600000000},
        {name: 'May-2026', value: 12750000000},
        {name: 'Jun-2026', value: 12900000000},
        {name: 'Jul-2026', value: 13050000000},
        {name: 'Aug-2026', value: 13200000000}];


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
                            stroke="#ddd"               // Set grid line color to white
                            // strokeDasharray="5 5"        // Create dashed lines with 5px gaps
                        />
                <Tooltip content={<CustomTooltip />} />

                <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'white', 
                        fontSize: 12,
                        angle: -90, // Rotate the tick labels 50 degrees
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
                        fill={ getCurrentMonthYearUTC() === entry.name ? " rgb(249, 186, 38)" : 'rgba(135, 135, 135, 0.7)' } // Example condition for dynamic colors
                    />
                    ))}
                </Bar>


            </BarChart>
        </ResponsiveContainer>
    );
};