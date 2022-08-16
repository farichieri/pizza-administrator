export const createOrder = (order) => {
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
