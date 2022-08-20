import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOrders, orderReady } from '../../../redux/actions';
import './order.scss';

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const [orderTime, setOrderTime] = useState(Date.now() - order.startDate);

  const handleReady = (order) => {
    dispatch(orderReady({ ...order, endDate: Date.now() })).then((response) => {
      if (response) {
        dispatch(getOrders());
      }
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('es-AR', {
      dateStyle: 'short',
      timeStyle: 'medium',
    });
  };

  const formatTime = (date) => {
    return (
      String(new Date(date).getMinutes()).padStart(2, '0') +
      ':' +
      String(new Date(date).getSeconds()).padStart(2, '0')
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderTime(Date.now() - order.startDate);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <section className={!order.endDate ? 'order' : 'order-done'}>
      <div>
        <p>{order.orderName}</p>
      </div>
      <div>
        <p>{formatDate(order.startDate)}</p>
      </div>
      <div>
        <p>{order.endDate ? formatDate(order.endDate) : 'Prepairing'}</p>
      </div>
      <div>
        {order.endDate ? (
          <p>{formatTime(order.endDate - order.startDate)}</p>
        ) : (
          <p>{formatTime(orderTime)}</p>
        )}
      </div>
      <div>
        {!order.endDate ? (
          <button className='ready-button' onClick={() => handleReady(order)}>
            READY
          </button>
        ) : (
          <p>DONE</p>
        )}
      </div>
    </section>
  );
};

export default Order;
