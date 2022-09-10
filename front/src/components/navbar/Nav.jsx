import React from 'react';
import './nav.scss';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Nav = () => {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout')) {
      localStorage.removeItem('token');
      window.location.reload();
    }
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
          Ordenes
        </button>
      </Link>
      <Link to='/cashier'>
        <button
          className={
            pathname === '/cashier' ? 'nav-button-active' : 'nav-button'
          }
        >
          Crear Orden
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
        Deslogearse
      </button>
    </nav>
  );
};

export default Nav;
