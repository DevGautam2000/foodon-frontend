import axios from "axios";
import { actions } from "../keys";

const getProducts = () => async (dispatch) => {
  const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/products`);
  // const res = await axios.get(
  //   `${process.env.REACT_APP_BACKEND_API}/api/products`
  // );
  if (res)
    return dispatch({
      type: actions.GET_PRODUCTS,
      payload: res.data.products,
    });

  dispatch({
    type: actions.GET_PRODUCTS_FAILED,
    payload: res.data.products,
  });
};

export { getProducts };
