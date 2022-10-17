import React from 'react';
import './ordersCreate.scss';
import Nav from '../../components/navbar/Nav';
import OrderCreate from '../../components/orders/create-order/OrderCreate';

const OrdersCreate = () => {
  return (
    <div className='ordersCreate'>
      <Nav />
      <OrderCreate />
    </div>
  );
};

export default OrdersCreate;
