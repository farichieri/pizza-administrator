import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { orderReady } from '../../../redux/actions';
import './order.scss';

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const [orderTime, setOrderTime] = useState(Date.now() - order.startTime);
  let time = Date.now();

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
    return new Date(date).getMinutes() + ':' + new Date(date).getSeconds();
  };

  useEffect(() => {
    setInterval(() => {
      setOrderTime(Date.now() - order.startTime);
    }, 1000);
  });

  return (
    <section className='order'>
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
