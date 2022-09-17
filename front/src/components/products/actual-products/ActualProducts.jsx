import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../../redux/actions';
import Loader from '../../../static/Loader/Loader';
import NoData from '../../../static/NoData/NoData';
import './actualProducts.scss';

const ActualProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [isLoading, setIsloading] = useState(false);

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
    dispatch(getProducts()).then(setIsloading);
  }, [dispatch]);

  return (
    <section className='products-container'>
      <h1>Productos actuales:</h1>
      <div className='products-container-table'>
        {products.length ? (
          products.map((product) => {
            return (
              <div className='product' key={product._id}>
                <p>{product.productName}</p>
                <button value={product._id} onClick={handleDelete}>
                  x
                </button>
              </div>
            );
          })
        ) : isLoading === false ? (
          <Loader />
        ) : (
          <NoData />
        )}
      </div>
    </section>
  );
};

export default ActualProducts;
