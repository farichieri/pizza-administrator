import React from 'react';
import './nav.scss';
import { Link } from 'react-router-dom';

const Nav = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className='nav'>
      <Link to='/'>
        <button>Home</button>
      </Link>
      <Link to='/kitchen'>
        <button>Orders</button>
      </Link>
      <Link to='/cashier'>
        <button>Create Order</button>
      </Link>
      <Link to='/dashboard'>
        <button>Dashboard</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Nav;
