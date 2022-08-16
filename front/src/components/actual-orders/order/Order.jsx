import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { orderReady } from '../../../redux/actions';
import './order.scss';

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const [orderTime, setOrderTime] = useState(Date.now() - order.startTime);

  const handleReady = (order) => {
    dispatch(orderReady({ ...order, endDate: Date.now() }));
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
      setOrderTime(Date.now() - order.startTime);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <section className={!order.endDate ? 'order' : 'order-done'}>
      <div>
        <p>{order.name}</p>
      </div>
      <div>
        <p>{formatDate(order.startTime)}</p>
      </div>
      <div>
        <p>{order.endDate ? formatDate(order.endDate) : 'Prepairing'}</p>
      </div>
      <div>
        {order.endDate ? (
          <p>{formatTime(order.endDate - order.startTime)}</p>
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
