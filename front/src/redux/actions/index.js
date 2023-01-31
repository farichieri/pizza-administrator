import axios from 'axios';

export const createOrder = (order) => {
  return async () => {
    try {
      const response = await axios.post('/api/orders', order);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const orderReady = (order) => {
  return async () => {
    try {
      const response = await axios.put('/api/orders/' + order._id, order);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/products');
      console.log('response', response);
      return dispatch({
        type: 'GET_PRODUCTS',
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProduct = (_id) => {
  return async () => {
    try {
      const response = await axios.delete('/api/products/' + _id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/orders');
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
      const response = await axios.get('/api/users');
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
  return async () => {
    try {
      const response = await axios.post('/api/users', payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginUser = (username, password) => {
  const body = { username, password };
  return async () => {
    try {
      const response = await axios.post('/api/login', body);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (_id) => {
  return async () => {
    try {
      const response = await axios.delete('/api/users/' + _id);
      return response.data.message;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrdersBetweenDates = (start, end) => {
  if (!localStorage.getItem('between-dates')) {
    localStorage.setItem(
      'between-dates',
      JSON.stringify({ startDate: start, endDate: end })
    );
  }
  const { startDate, endDate } = JSON.parse(
    localStorage.getItem('between-dates')
  );
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/api/reports/dates?startDate=${startDate}&endDate=${endDate}`
      );
      return dispatch({
        type: 'GET_ORDERS_BETWEEN_DATES',
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
