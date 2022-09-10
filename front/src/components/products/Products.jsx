import React from 'react';
import ActualProducts from './actual-products/ActualProducts';
import CreateProduct from './create-product/CreateProduct';

const Products = () => {
  return (
    <div>
      <CreateProduct />
      <ActualProducts />
    </div>
  );
};

export default Products;
