import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getOrdersBetweenDates } from '../../../redux/actions';
import Loader from '../../../static/Loader/Loader';
import NoData from '../../../static/NoData/NoData';
import './actualOrders.scss';
import Order from '../order/Order';
import Pagination from '../../pagination/Pagination';
import { formatTime } from '../../../hooks/formatTime';
import DateRangePicker from '../../dateRangePicker/DateRangePicker';

const ActualOrders = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let actualOrders = useSelector((state) => state.report);
  actualOrders?.sort(
    (a, b) => formatTime(b.startDate) - formatTime(a.startDate)
  );
  const [filterState, setFilterState] = useState('all-orders');
  const [orders, setOrders] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const dateNow = new Date().toISOString().slice(0, 10);
  const dateNowMinusDays = (days) => {
    return new Date(new Date() - days * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
  };

  const [rangeDate, setRangeDate] = useState({
    startDate:
      location.pathname === '/orders'
        ? dateNowMinusDays(2)
        : dateNowMinusDays(7),
    endDate: dateNow,
  });

  const arStartDate = new Date(
    new Date(rangeDate.startDate).setHours(
      new Date(rangeDate.startDate).getHours() - 3
    )
  ).toISOString();
  const arEndDate = new Date(
    new Date(rangeDate.endDate).setUTCHours(20, 59, 59, 999)
  ).toISOString();

  useEffect(() => {
    dispatch(getOrdersBetweenDates(arStartDate, arEndDate)).then(setIsloading);
  }, [rangeDate.endDate, rangeDate.startDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getOrdersBetweenDates());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ordersFiltered;
    switch (filterState) {
      case 'all-orders':
        ordersFiltered = actualOrders;
        break;
      case 'pending':
        ordersFiltered = actualOrders?.filter((order) => order.endDate === '');
        break;
      case 'done':
        ordersFiltered = actualOrders?.filter((order) => order.endDate);
        break;
      default:
        break;
    }
    if (filterState.length > 0) {
      setOrders(
        ordersFiltered.filter((order) =>
          order.orderName.toLowerCase().includes(input.toLowerCase())
        )
      );
    }
  }, [filterState, actualOrders, input]);

  const handleFilterOrders = (event) => {
    event.preventDefault();
    setFilterState(event.target.value);
    setCurrentPage(1);
  };

  const searchOrder = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const handlePagesAmount = (event) => {
    event.preventDefault();
    setOrdersPerPage(event.target.value);
    localStorage.setItem('orders-per-page', event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(
    localStorage.getItem('orders-per-page') || 5
  );
  const indexLastOrder = currentPage * ordersPerPage;
  const indexFirstOrder = indexLastOrder - ordersPerPage;
  const currentOrders =
    orders.length > 0 ? orders.slice(indexFirstOrder, indexLastOrder) : null;
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className='actual-orders'>
      <div className='actual-orders-container'>
        <div className='actual-orders-header'>
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
            {location.pathname === '/dashboard' && (
              <DateRangePicker
                rangeDate={rangeDate}
                setRangeDate={setRangeDate}
              />
            )}
            <div className='orders-per-page'>
              <p>Ordenes por página</p>
              <select onChange={handlePagesAmount} value={ordersPerPage}>
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
          <div className='orders-table-content'>
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
        </div>
      </div>
      <div className='actual-orders-pagination'>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ActualOrders;
