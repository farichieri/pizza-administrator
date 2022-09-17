import React from 'react';
import Nav from '../../components/navbar/Nav';
import ActualOrders from '../../components/orders/actual-orders/ActualOrders';
import './kitchen.scss';

const Kitchen = () => {
  return (
    <div className='kitchen'>
      <Nav />
      <ActualOrders />
    </div>
  );
};

export default Kitchen;
