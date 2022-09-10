import React from 'react';
import ActualOrders from '../../components/actual-orders/ActualOrders';
import Nav from '../../components/navbar/Nav';
import ProductCreate from '../../components/create-product/ProductCreate';
import Products from '../../components/actual-products/Products';
import './dashboard.scss';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Nav />
      <ProductCreate />
      <Products />
      <ActualOrders />
    </div>
  );
};

export default Dashboard;
