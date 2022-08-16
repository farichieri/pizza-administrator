import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../redux/actions';
import './orderCreate.scss';

const Order = () => {
  const [orderInput, setOrderInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewOrderInput = (e) => {
    e.preventDefault();
    setOrderInput(e.target.value);
  };

  const handleNewOrderSubmit = () => {
    dispatch(
      createOrder({ name: orderInput, startTime: Date.now(), endDate: '' })
    );
    navigate('/kitchen');
  };

  return (
    <div className='order-create'>
      <h1>New order:</h1>
      <form onSubmit={handleNewOrderSubmit}>
        <input onChange={handleNewOrderInput} type='text' />
        <button>Prepair</button>
      </form>
    </div>
  );
};

export default Order;
