// Toast.js
import React, { useEffect, useState } from 'react';
import './Toast.css'; // You can add your own styles for the toast

const Toast = ({ message, duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose(); // Call the onClose function to notify parent to remove toast
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className="toast">
            {message}
        </div>
    );
};

export default Toast;
