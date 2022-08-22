import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, getProducts } from '../../redux/actions';
import './orderCreate.scss';

const Order = () => {
  const [orderInput, setOrderInput] = useState('');
  const [orderAmmount, setOrderAmmount] = useState('');
  const [orderName, setOrderName] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewOrderInput = (e) => {
    e.preventDefault();
    if (e.target.value === 'default') {
      return;
    }
    setOrderInput(e.target.value);
  };

  const handleNewOrderSubmit = (event) => {
    event.preventDefault();
    if (!!orderInput) {
      dispatch(
        createOrder({
          orderName: orderName,
          orderProduct: orderInput,
          startDate: Date.now(),
          endDate: '',
          ammount: Number(orderAmmount),
          price: orderPrice,
        })
      );
      navigate('/kitchen');
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className='order-create'>
      <h1>New order:</h1>
      <form onSubmit={handleNewOrderSubmit}>
        <input
          onChange={(e) => setOrderName(e.target.value)}
          type='text'
          placeholder='Order Name'
        />
        <select onChange={handleNewOrderInput}>
          <option value='default'>Select product</option>
          {products &&
            products.map((product) => {
              return (
                <option key={product._id} value={product.productName}>
                  {product.productName}
                </option>
              );
            })}
        </select>
        <input
          onChange={(e) => setOrderAmmount(e.target.value)}
          type='number'
          min='0'
          placeholder='ammount'
        />
        <input
          onChange={(e) => setOrderPrice(e.target.value)}
          type='number'
          min='0'
          placeholder='price'
        />
        <button>Prepair</button>
      </form>
    </div>
  );
};

export default Order;
