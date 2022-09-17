import axios from 'axios';

export const createOrder = (order) => {
  return async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/orders',
        order
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const orderReady = (order) => {
  return async () => {
    try {
      const response = await axios.put(
        'http://localhost:5000/api/orders/' + order._id,
        order
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
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
    return async (dispatch) => {
      fetch('http://localhost:5000/api/products').then((response) =>
        response.json().then((products) =>
          dispatch({
            type: 'GET_PRODUCTS',
            payload: products,
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
        'http://localhost:5000/api/products/' + _id
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      return dispatch({
        type: 'GET_ORDERS',
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getEmployees = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      return dispatch({
        type: 'GET_EMPLOYEES',
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postEmployee = (payload) => {
  console.log(payload);
  return async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users',
        payload
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};
