import axios from 'axios';

export const createOrder = (order) => {
  console.log(order);
  try {
    return {
      type: 'CREATE_ORDER',
      payload: order,
    };
  } catch (error) {
    console.log(error);
  }
};

export const orderReady = (order) => {
  try {
    return {
      type: 'ORDER_READY',
      payload: order,
    };
  } catch (error) {
    console.log(error);
  }
};

export const login = (payload) => {
  try {
    console.log(payload);
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = () => {
  try {
    return (dispatch) => {
      fetch('http://localhost:5000/api/products').then((response) =>
        response.json().then((products) =>
          dispatch({
            type: 'GET_PRODUCTS',
            payload: products.products,
          })
        )
      );
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (_id) => {
  return async () => {
    try {
      const response = await axios.delete(
        'http://localhost:5000/api/product/' + _id
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};
