import React from 'react';
import Nav from '../../components/nav/Nav';
import ProductCreate from '../../components/product-create/ProductCreate';
import Products from '../../components/products/Products';
import './dashboard.scss';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Nav />
      <ProductCreate />
      <Products />
    </div>
  );
};

export default Dashboard;
