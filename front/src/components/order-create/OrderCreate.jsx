import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, getProducts } from '../../redux/actions';
import './orderCreate.scss';

const Order = () => {
  const [orderInput, setOrderInput] = useState('');
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
        createOrder({ name: orderInput, startTime: Date.now(), endDate: '' })
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
        <button>Prepair</button>
      </form>
    </div>
  );
};

export default Order;
