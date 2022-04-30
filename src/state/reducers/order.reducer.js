import { order } from "../keys";

const initState = {
  orderedItems: {
    // 123: {
    //     _id: 123,
    //     name: 'Food',
    //     img: 'some.jpg',
    //     price: 200,
    //     qty: 1,
    // }
  },
  updatingOrders: false,
  error: null,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case order.ADD_TO_ORDER_REQUEST:
      state = {
        ...state,
        updatingOrders: true,
      };
      break;
    case order.ADD_TO_ORDER_SUCCESS:
      state = {
        ...state,
        orderedItems: action.payload.orderedItems,
        updatingOrders: false,
      };
      break;
    case order.ADD_TO_ORDER_FAILURE:
      state = {
        ...state,
        updatingOrders: false,
        error: action.payload.error,
      };
      break;
    case order.RESET_ORDER:
      state = {
        ...initState,
      };
      break;
    default:
      return state;
  }
  return state;
};
