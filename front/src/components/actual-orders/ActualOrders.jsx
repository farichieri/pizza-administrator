import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions';
import './actualOrders.scss';
import Order from './order/Order';

const ActualOrders = () => {
  const actualOrders = useSelector((state) => state.actualOrders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

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
        {actualOrders?.length ? (
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
