import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { timeDiffCalc } from '../../../hooks/timeDiffCalc';
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

  const formatMoney = (money) => {
    return money.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      useGrouping: true,
      maximumSignificantDigits: 3,
    });
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
      <div className='subOrders'>
        {order.order &&
          order.order.map((subOrder, index) => {
            return (
              <div
                key={index}
                className={
                  order.order.length > 1 ? 'multiple-subOrder' : 'subOrder'
                }
              >
                <div style={{ width: '100%' }}>
                  <p>- {subOrder.orderProduct}</p>
                </div>
                <div>
                  <p>{subOrder.ammount}</p>
                </div>
                <div>
                  <p>{formatMoney(subOrder.price)}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div>
        <p className='date-text'>{formatDate(order.startDate)}</p>
      </div>
      <div>
        <p className='date-text'>
          {order.endDate ? formatDate(order.endDate) : 'Prepairing'}
        </p>
      </div>
      <div className='passed-time'>
        {order.endDate ? (
          <p>{timeDiffCalc(order.endDate, order.startDate)}</p>
        ) : (
          <p>{timeDiffCalc(Date.now(), order.startDate)}</p>
        )}
      </div>
      <div>
        {!order.endDate ? (
          <button className='ready-button' onClick={() => handleReady(order)}>
            LISTA
          </button>
        ) : (
          <p className='done-text'>DONE</p>
        )}
      </div>
    </section>
  );
};

export default Order;
