import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './actualOrders.scss';
import Order from './order/Order';

const ActualOrders = () => {
  const actualOrders = useSelector((state) => state.actualOrders);

  return (
    <div className='actual-orders'>
      <h1>Orders:</h1>
      <div className='orders-table'>
        <div className='orders-table-columns'>
          <div>Order</div>
          <div>Start</div>
          <div>End</div>
          <div>Time</div>
          <div>Result</div>
        </div>
        {actualOrders.length ? (
          actualOrders.map((order, index) => (
            <Order order={order} key={index} />
          ))
        ) : (
          <p>NO ORDERS</p>
        )}
      </div>
    </div>
  );
};

export default ActualOrders;
