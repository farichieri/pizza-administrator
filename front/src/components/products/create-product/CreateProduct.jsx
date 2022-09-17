import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../../redux/actions';
import './createProduct.scss';
import '../../../layout/button/button.scss';

const CreateProduct = () => {
  const [productName, setProductName] = useState();
  const dispatch = useDispatch();

  const createProduct = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName }),
    });
    const data = await response.json();
    if (data) {
      alert('Product created successfully');
      dispatch(getProducts());
      setProductName('');
    } else {
      alert('Error creating product');
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className='productCreate-container'>
      <h1>Crear un nuevo producto:</h1>
      <form onSubmit={createProduct}>
        <input
          value={productName}
          type='text'
          placeholder='Product name'
          onChange={(e) => setProductName(e.target.value)}
        />
        <button className='create'>Crear</button>
      </form>
    </div>
  );
};

export default CreateProduct;
