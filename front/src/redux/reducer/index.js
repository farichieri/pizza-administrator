const InitialState = {
  actualOrders: [],
  products: [],
  employees: [],
  user: {},
  report: [],
};

const rootReducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'GET_ORDERS':
      return {
        ...state,
        actualOrders: action.payload,
      };
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
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_ORDERS_BETWEEN_DATES':
      return {
        ...state,
        report: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
