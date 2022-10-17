import React from 'react';
import Nav from '../../components/navbar/Nav';
import ActualOrders from '../../components/orders/actual-orders/ActualOrders';
import './orders.scss';

const Orders = () => {
  return (
    <div className='orders'>
      <Nav />
      <ActualOrders />
    </div>
  );
};

export default Orders;
