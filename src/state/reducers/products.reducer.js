import { actions } from "../keys";

export const reducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case actions.GET_PRODUCTS:
      return { products: action.payload };
    case actions.GET_PRODUCTS_FAILED:
      return { products: action.payload };
    default:
      return state;
  }
};
