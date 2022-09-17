import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, getProducts } from '../../../redux/actions';
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

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className='order-create-container'>
      <div className='order-create'>
        <h1>Crear una nueva orden:</h1>
        <form onSubmit={addProductToOrder}>
          <input
            onChange={handleChange}
            type='text'
            placeholder='Nombre de la orden'
            defaultValue={orderName}
          />
          <select onChange={handleNewOrderInput} defaultValue={orderInput}>
            <option value='default'>Producto</option>
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
            placeholder='Cantidad'
            defaultValue={orderAmmount}
          />
          <input
            onChange={(e) => setOrderPrice(e.target.value)}
            type='number'
            min='0'
            placeholder='Precio'
            defaultValue={orderPrice}
          />
          <button>Agregar producto</button>
        </form>
        {!!order && order.length > 0 && (
          <div className='orders-preview'>
            <p>{orderName}</p>
            <tr className='orders-preview-table-columns'>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
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
        <button onClick={handleNewOrderSubmit} className='create-button'>
          Crear la orden
        </button>
      </div>
    </div>
  );
};

export default Order;
