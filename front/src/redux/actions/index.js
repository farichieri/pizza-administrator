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

export const loginUser = (username, password) => {
  return async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (_id) => {
  return async () => {
    try {
      const response = await axios.delete(
        'http://localhost:5000/api/users/' + _id
      );
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
        `http://localhost:5000/api/report/dates?startDate=${startDate}&endDate=${endDate}`
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
