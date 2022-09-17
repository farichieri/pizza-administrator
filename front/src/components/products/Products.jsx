import React from 'react';
import ActualProducts from './actual-products/ActualProducts';
import CreateProduct from './create-product/CreateProduct';
import './products.scss';

const Products = () => {
  return (
    <div className='products-container'>
      <CreateProduct />
      <ActualProducts />
    </div>
  );
};

export default Products;
