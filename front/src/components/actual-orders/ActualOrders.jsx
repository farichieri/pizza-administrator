import React from 'react';
import { useSelector } from 'react-redux';
import './actualOrders.scss';
import Order from './order/Order';

const ActualOrders = () => {
  const actualOrders = useSelector((state) => state.actualOrders);

  return (
    <div className='actual-orders'>
      <h1>Orders:</h1>
      <div className='orders-table'>
        <tr className='orders-table-columns'>
          <th>Order</th>
          <th>Start</th>
          <th>End</th>
          <th>Time</th>
          <th>Result</th>
        </tr>
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
