import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="appnav-dropdown" ref={dropdownRef}>
      <button className="appnav-dropdown-toggle" onClick={toggleDropdown}>
        {title}<img src='/img/wienerdog/angle-down.svg ' width={18} height={18}/>
      </button>
      <div className={`appnav-dropdown-menu ${isOpen ? 'appnav-is-active' : ''}`}>
        {items.map((item, index) => (
          <a style={{fontSize: '2rem'}} key={index} href={item.href}>{item.label}</a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
