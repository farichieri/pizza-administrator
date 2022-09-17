import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/actions';
import Loader from '../../../static/Loader/Loader';
import NoData from '../../../static/NoData/NoData';
import './actualOrders.scss';
import Order from '../order/Order';

const ActualOrders = () => {
  const dispatch = useDispatch();
  let actualOrders = useSelector((state) => state.actualOrders);
  actualOrders?.sort((a, b) => b.startDate - a.startDate);
  const [filterState, setFilterState] = useState('all-orders');
  const [orders, setOrders] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    dispatch(getOrders()).then(setIsloading);
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
    setInput('');
  };

  const searchOrder = (event) => {
    event.preventDefault();
    setInput(event.target.value);
    setOrders(
      actualOrders.filter((order) =>
        order.orderName.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className='actual-orders'>
      <div className='actual-orders-header'>
        <h1>Ordenes:</h1>
        <div className='actual-orders-filter'>
          <div className='filter-by-state'>
            <p>Estado:</p>
            <select onChange={handleFilterOrders}>
              <option value='all-orders'>Todas</option>
              <option value='pending'>En preparación</option>
              <option value='done'>Entregadas</option>
            </select>
          </div>
          <input
            type='text'
            placeholder='Buscar Orden'
            value={input}
            onChange={searchOrder}
          />
        </div>
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
        ) : isLoading === false ? (
          <Loader />
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default ActualOrders;
