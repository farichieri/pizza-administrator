import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/actions';
import Loader from '../../../static/Loader/Loader';
import NoData from '../../../static/NoData/NoData';
import './actualOrders.scss';
import Order from '../order/Order';
import Pagination from '../../pagination/Pagination';
import { formatTime } from '../../../hooks/formatTime';
import DateRangePicker from '../../dateRangePicker/DateRangePicker';

const ActualOrders = () => {
  const dispatch = useDispatch();
  let actualOrders = useSelector((state) => state.actualOrders);
  actualOrders?.sort(
    (a, b) => formatTime(b.startDate) - formatTime(a.startDate)
  );
  const [filterState, setFilterState] = useState('all-orders');
  const [orders, setOrders] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    dispatch(getOrders()).then(setIsloading);
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getOrders());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    switch (filterState) {
      case 'all-orders':
        setOrders(actualOrders);
        break;
      case 'pending':
        setOrders(actualOrders?.filter((order) => order.endDate === ''));
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
    setCurrentPage(1);
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

  const handlePagesAmount = (event) => {
    event.preventDefault();
    setOrdersPerPage(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);
  const indexLastOrder = currentPage * ordersPerPage;
  const indexFirstOrder = indexLastOrder - ordersPerPage;
  const currentOrders =
    orders.length > 0 ? orders.slice(indexFirstOrder, indexLastOrder) : null;
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const dateNow = new Date().toISOString().slice(0, 10);
  const dateNowMinusSevenDays = new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const [rangeDate, setRangeDate] = useState({
    startDate: dateNowMinusSevenDays,
    endDate: dateNow,
  });

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
          <DateRangePicker rangeDate={rangeDate} setRangeDate={setRangeDate} />
          <div className='orders-per-page'>
            <p>Ordenes por página</p>
            <select onChange={handlePagesAmount}>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='30'>30</option>
            </select>
          </div>
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
          currentOrders.map((order, index) => (
            <Order order={order} key={index} />
          ))
        ) : isLoading === false ? (
          <Loader />
        ) : (
          <NoData />
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ActualOrders;
