import React from 'react';
import './nav.scss';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout')) {
      localStorage.removeItem('token');
      localStorage.removeItem('isRegistered');
      window.location.reload();
    }
  };
  const { pathname } = useLocation();

  return (
    <nav className='nav'>
      <Link to='/orders'>
        <button
          className={
            pathname === '/orders' ? 'nav-button-active' : 'nav-button'
          }
        >
          Ordenes
        </button>
      </Link>
      <Link to='/ordersCreate'>
        <button
          className={
            pathname === '/ordersCreate' ? 'nav-button-active' : 'nav-button'
          }
        >
          Crear Orden
        </button>
      </Link>
      {user.isAdmin === true && (
        <Link to='/dashboard'>
          <button
            className={
              pathname === '/dashboard' ? 'nav-button-active' : 'nav-button'
            }
          >
            Dashboard
          </button>
        </Link>
      )}
      <button onClick={handleLogout} className='nav-button'>
        Deslogearse
      </button>
      <button className='nav-user'>Usuario: {user.username}</button>
    </nav>
  );
};

export default Nav;
