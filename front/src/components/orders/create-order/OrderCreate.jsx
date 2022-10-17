import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../../../hooks/formatMoney';
import { createOrder, getProducts } from '../../../redux/actions';
import './orderCreate.scss';
import { v4 as uuid } from 'uuid';

const Order = () => {
  const [orderInput, setOrderInput] = useState('');
  const [orderAmmount, setOrderAmmount] = useState('');
  const [orderName, setOrderName] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const userCreator = useSelector((state) => state.user.username);

  const handleNewOrderInput = (e) => {
    e.preventDefault();
    if (e.target.value === 'default') {
      setOrderInput('');
      return;
    } else {
      setOrderInput(e.target.value);
    }
  };

  const handleNewOrderSubmit = (event) => {
    event.preventDefault();
    if (order.length) {
      if (window.confirm('¿Crear orden?')) {
        dispatch(
          createOrder({
            orderName: orderName,
            startDate: new Date().toISOString(),
            endDate: '',
            order,
            userCreator: userCreator,
          })
        );
        navigate('/orders');
      }
    }
  };

  const addProductToOrder = (event) => {
    event.preventDefault();
    if (orderInput && orderAmmount && orderName && orderPrice) {
      const newId = uuid();
      setOrder([
        ...order,
        {
          unique_id: newId,
          orderProduct: orderInput,
          ammount: Number(orderAmmount),
          price: orderPrice,
        },
      ]);
      setOrderInput('');
      setOrderAmmount('');
      setOrderPrice('');
    } else {
      alert('Ingrese todas las opciones necesarias para agregar el producto');
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setOrderName(event.target.value);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const id = event.target.id;
    setOrder(order.filter((product) => product.unique_id !== id));
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className='order-create-container'>
      <div className='order-create'>
        <form onSubmit={addProductToOrder}>
          <input
            onChange={handleChange}
            type='text'
            placeholder='Nombre de la orden'
            value={orderName}
          />
          <select onChange={handleNewOrderInput} value={orderInput}>
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
            value={orderAmmount}
            className='amount'
          />
          <input
            onChange={(e) => setOrderPrice(e.target.value)}
            type='number'
            min='0'
            placeholder='Precio'
            value={orderPrice}
            className='price'
          />
          <button className='create'>Agregar producto</button>
        </form>
        {/* {!!order && order.length > 0 && ( */}
        <div className='orders-preview'>
          <p className='orders-preview-orderName'>
            {orderName ? orderName : '-'}
          </p>
          <tr className='orders-preview-table-columns'>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Eliminar</th>
          </tr>
          {order.map((product) => {
            return (
              <div key={product.unique_id} className='show-order'>
                <p>{product.orderProduct}</p>
                <p>{product.ammount}</p>
                <p>{formatMoney(product.price)}</p>
                <p>
                  <button
                    id={product.unique_id}
                    onClick={handleDelete}
                    className='delete-product-order'
                  >
                    x
                  </button>
                </p>
              </div>
            );
          })}
          <button onClick={handleNewOrderSubmit} className='create'>
            Crear la orden
          </button>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Order;
