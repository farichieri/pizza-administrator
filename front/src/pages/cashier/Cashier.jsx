import React from 'react';
import './cashier.scss';
import Nav from '../../components/navbar/Nav';
import OrderCreate from '../../components/orders/create-order/OrderCreate';

const Cashier = () => {
  return (
    <div className='cashier'>
      <Nav />
      <OrderCreate />
    </div>
  );
};

export default Cashier;
