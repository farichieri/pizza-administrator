import React from 'react';
import './nav.scss';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Nav = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  const { pathname } = useLocation();

  useEffect(() => {}, []);

  return (
    <nav className='nav'>
      <Link to='/'>
        <button
          className={pathname === '/' ? 'nav-button-active' : 'nav-button'}
        >
          Home
        </button>
      </Link>
      <Link to='/kitchen'>
        <button
          className={
            pathname === '/kitchen' ? 'nav-button-active' : 'nav-button'
          }
        >
          Orders
        </button>
      </Link>
      <Link to='/cashier'>
        <button
          className={
            pathname === '/cashier' ? 'nav-button-active' : 'nav-button'
          }
        >
          Create Order
        </button>
      </Link>
      <Link to='/dashboard'>
        <button
          className={
            pathname === '/dashboard' ? 'nav-button-active' : 'nav-button'
          }
        >
          Dashboard
        </button>
      </Link>
      <button onClick={handleLogout} className='nav-button'>
        Logout
      </button>
    </nav>
  );
};

export default Nav;
