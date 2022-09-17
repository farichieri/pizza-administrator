const InitialState = {
  actualOrders: [],
  products: [],
  employees: [],
  isAdmin: false,
};

const rootReducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'GET_ORDERS':
      return {
        ...state,
        actualOrders: action.payload,
      };
    // case 'CREATE_ORDER':
    //   const newOrder = action.payload;
    //   const actualOrders = state.actualOrders;
    //   actualOrders.push(newOrder);
    //   return {
    //     ...state,
    //     actualOrders: actualOrders,
    //   };
    // case 'ORDER_READY':
    //   const actualOrders2 = state.actualOrders;
    //   const newOrders = actualOrders2?.map((order) =>
    //     order.name === action.payload.name
    //       ? { ...order, endDate: action.payload.endDate }
    //       : order
    //   );
    //   return {
    //     ...state,
    //     actualOrders: newOrders,
    //   };
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'GET_EMPLOYEES':
      return {
        ...state,
        employees: action.payload,
      };
    case 'IS_ADMIN':
      return {
        ...state,
        isAdmin: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
