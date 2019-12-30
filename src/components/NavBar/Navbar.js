import React from 'react';
import './navbar.css';

const Navbar = ({ title }) => (
  <div className='bg-white text-primary p-3 header'>
    <h3><i className="fas fa-tasks"></i>{title}</h3>
  </div>
)

export default Navbar;