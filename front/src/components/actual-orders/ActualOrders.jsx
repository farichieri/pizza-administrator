import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions';
import './actualOrders.scss';
import Order from './order/Order';

const ActualOrders = () => {
  const dispatch = useDispatch();
  let actualOrders = useSelector((state) => state.actualOrders.orders);
  actualOrders?.sort((a, b) => b.startDate - a.startDate);
  const [filterState, setFilterState] = useState('all-orders');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    switch (filterState) {
      case 'all-orders':
        setOrders(actualOrders);
        break;
      case 'pending':
        setOrders(actualOrders?.filter((order) => order.endDate === null));
        break;
      case 'done':
        setOrders(actualOrders?.filter((order) => order.endDate));
        break;
      default:
        break;
    }
  }, [filterState, actualOrders]);

  const handleFilterOrders = (event) => {
    event.preventDefault();
    setFilterState(event.target.value);
  };

  console.log(actualOrders);

  return (
    <div className='actual-orders'>
      <div className='actual-orders-header'>
        <h1>Ordenes:</h1>
        <select onChange={handleFilterOrders}>
          <option value='all-orders'>Todas</option>
          <option value='pending'>En preparación</option>
          <option value='done'>Entregadas</option>
        </select>
      </div>
      <div className='orders-table'>
        <tr className='orders-table-columns'>
          <th>Orden</th>
          <th style={{ width: '100%' }}>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Empezó</th>
          <th>Terminó</th>
          <th>Tiempo</th>
          <th>Estado</th>
        </tr>
        {orders?.length ? (
          orders.map((order, index) => <Order order={order} key={index} />)
        ) : (
          <p>NO ORDERS</p>
        )}
      </div>
    </div>
  );
};

export default ActualOrders;
