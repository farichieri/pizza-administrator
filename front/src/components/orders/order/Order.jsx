import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { formatMoney } from '../../../hooks/formatMoney';
import { formatTime } from '../../../hooks/formatTime';
import { timeDiffCalc } from '../../../hooks/timeDiffCalc';
import { getOrders, orderReady } from '../../../redux/actions';
import './order.scss';

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const startDateMs = formatTime(order.startDate);
  const [orderTime, setOrderTime] = useState(Date.now() - startDateMs);

  const handleReady = (order) => {
    if (window.confirm('¿Seguro que está lista?')) {
      dispatch(
        orderReady({ ...order, endDate: new Date().toISOString() })
      ).then((response) => {
        if (response) {
          dispatch(getOrders());
        }
      });
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('es-AR', {
      dateStyle: 'short',
      timeStyle: 'medium',
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderTime(Date.now() - startDateMs);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <section className={!order.endDate ? 'order' : 'order-done'}>
      <div className='orderName'>
        <p>
          <strong>{order.orderName}</strong>
        </p>
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
        <p className='date-text'>{formatDate(startDateMs)}</p>
      </div>
      <div>
        <p className='date-text'>
          {order.endDate ? formatDate(order.endDate) : 'Prepairing'}
        </p>
      </div>
      <div className='passed-time'>
        {order.endDate ? (
          <p>{timeDiffCalc(formatTime(order.endDate), startDateMs)}</p>
        ) : (
          <p>{timeDiffCalc(Date.now(), startDateMs)}</p>
        )}
      </div>
      <div>
        {!order.endDate ? (
          <button className='ready-button' onClick={() => handleReady(order)}>
            LISTA
          </button>
        ) : (
          <p className='done-text'>ENTREGADA</p>
        )}
      </div>
    </section>
  );
};

export default Order;
