const InitialState = {
  orders: [],
};

const rootReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "CREATE_ORDER":
      const newOrder = [action.payload];
      const actualOrders = state.orders;
      actualOrders.push(newOrder);
      return {
        ...state,
        orders: actualOrders,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
