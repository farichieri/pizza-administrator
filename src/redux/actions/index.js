export const createOrder = (order) => {
  try {
    return {
      type: "CREATE_ORDER",
      payload: order,
    };
  } catch (error) {
    console.log(error);
  }
};
