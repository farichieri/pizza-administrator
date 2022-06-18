const InitialState = {
  actualOrders: [],
};

const rootReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "CREATE_ORDER":
      const newOrder = action.payload;
      const actualOrders = state.actualOrders;
      actualOrders.push(newOrder);
      return {
        ...state,
        actualOrders: actualOrders,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
