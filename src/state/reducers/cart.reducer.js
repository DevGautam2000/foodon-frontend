import { cart } from "../keys";

const initState = {
  cartItems: {
    // 123: {
    //     _id: 123,
    //     name: 'Food',
    //     img: 'some.jpg',
    //     price: 200,
    //     qty: 1,
    // }
  },
  updatingCart: false,
  error: null,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case cart.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        updatingCart: true,
      };
      break;
    case cart.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false,
      };
      break;
    case cart.ADD_TO_CART_FAILURE:
      state = {
        ...state,
        updatingCart: false,
        error: action.payload.error,
      };
      break;
    case cart.RESET_CART:
      state = {
        ...initState,
      };
      break;
    default:
      return state;
  }
  return state;
};
