import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import './navbar.css';

const Navbar = ({ title }) => (
  <div className='bg-info text-white p-3 header'>
    <h3><FontAwesomeIcon icon={faTasks} />&nbsp;{title}</h3>
  </div>
)

export default Navbar;