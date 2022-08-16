import React from 'react';
import Auth from '../../components/login/Login';
import Nav from '../../components/nav/Nav';
import './dashboard.scss';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Nav />
      <Auth />
    </div>
  );
};

export default Dashboard;
