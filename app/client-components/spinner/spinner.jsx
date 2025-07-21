
'use client'; // This component will run on the client side

import React from 'react';

import './spinner.css';

export const AppSpinner = () => {
    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
            <div className='spinner'></div>
        </div>
    )
}