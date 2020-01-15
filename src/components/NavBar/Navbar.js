import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import './navbar.css';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ title, logOut }) => {
  const userid = localStorage.getItem('UserID');
  console.log(userid);
  return (
    <div className='bg-info text-white p-3 header'>
      <h3><FontAwesomeIcon icon={faTasks} />&nbsp;{title}&nbsp;</h3>
      {userid === null ? <h4><Link to='/' >&nbsp;<h5>Sign In</h5></Link></h4> : <h4><Link to='/' onClick={() => logOut()}>&nbsp;<h5>Sign Out</h5>&nbsp;<FaSignOutAlt className='text-light' /></Link></h4>}
    </div>
  )
}

export default Navbar;