import React from 'react';
import ActualOrders from '../../components/actual-orders/ActualOrders';
import Nav from '../../components/navbar/Nav';
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
