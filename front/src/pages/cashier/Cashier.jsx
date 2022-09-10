import React from 'react';
import './cashier.scss';
import OrderCreate from '../../components/create-order/OrderCreate';
import Nav from '../../components/navbar/Nav';

const Cashier = () => {
  return (
    <div className='cashier'>
      <Nav />
      <OrderCreate />
    </div>
  );
};

export default Cashier;
