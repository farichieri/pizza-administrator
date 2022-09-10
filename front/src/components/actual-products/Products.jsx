import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../redux/actions';
import './products.scss';

const Products = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm('¿Seguro queres borrarlo man?')) {
      dispatch(deleteProduct(event.target.value)).then((response) => {
        alert(response.data.message);
        dispatch(getProducts());
      });
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <section className='products-container'>
      <h1>Actual Products:</h1>
      {products &&
        products.map((product) => {
          return (
            <div className='product' key={product._id}>
              <p>{product.productName}</p>
              <button value={product._id} onClick={handleDelete}>
                x
              </button>
            </div>
          );
        })}
    </section>
  );
};

export default Products;
