import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions';
import './productCreate.scss';

const ProductCreate = () => {
  const [productName, setProductName] = useState();
  const dispatch = useDispatch();

  const createProduct = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/api/create_product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName }),
    });
    const data = await response.json();
    if (data) {
      alert('Product created successfully');
    } else {
      alert('Error creating product');
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <form onSubmit={createProduct}>
        <input
          type='text'
          placeholder='Product name'
          onChange={(e) => setProductName(e.target.value)}
        />
        <button>Create new product</button>
      </form>
    </div>
  );
};

export default ProductCreate;
