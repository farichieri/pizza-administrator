import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions';
import './products.scss';

const Products = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // const getProducts = () => {
  //   fetch('http://localhost:5000/api/products').then((response) =>
  //     response
  //       .json()
  //       .then((data) => setProducts(data.products))
  //       .catch((error) => console.log(error.message))
  //   );
  // };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <section className='products'>
      <h1>Actual Products:</h1>
      {products &&
        products.map((product) => {
          return (
            <div className='product' key={product._id}>
              {product.productName}
            </div>
          );
        })}
    </section>
  );
};

export default Products;
