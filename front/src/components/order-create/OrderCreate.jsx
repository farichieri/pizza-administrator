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
  const [order, setOrder] = useState([]);

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
          startDate: Date.now(),
          endDate: '',
          order,
        })
      );
      navigate('/kitchen');
    }
  };

  const addProductToOrder = (event) => {
    event.preventDefault();
    setOrder([
      ...order,
      {
        orderProduct: orderInput,
        ammount: Number(orderAmmount),
        price: orderPrice,
      },
    ]);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setOrderName(event.target.value);
  };

  console.log(order);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className='order-create'>
      <h1>New order:</h1>
      <form onSubmit={addProductToOrder}>
        <input
          onChange={handleChange}
          type='text'
          placeholder='Order Name'
          defaultValue={orderName}
        />
        <select onChange={handleNewOrderInput} defaultValue={orderInput}>
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
          defaultValue={orderAmmount}
        />
        <input
          onChange={(e) => setOrderPrice(e.target.value)}
          type='number'
          min='0'
          placeholder='price'
          defaultValue={orderPrice}
        />
        <button>Add product</button>
      </form>
      {!!order && order.length > 0 && (
        <div className='orders-preview'>
          <p>{orderName}</p>
          <tr className='orders-preview-table-columns'>
            <th>Product</th>
            <th>Ammount</th>
            <th>Price</th>
          </tr>
          {order.map((product) => {
            return (
              <div className='show-order'>
                <p>{product.orderProduct}</p>
                <p>{product.ammount}</p>
                <p>$ {product.price}</p>
              </div>
            );
          })}
        </div>
      )}
      <button onClick={handleNewOrderSubmit}>Create order</button>
    </div>
  );
};

export default Order;
