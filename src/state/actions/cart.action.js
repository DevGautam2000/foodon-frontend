import axios from "../../utils/helper";
import { cart as cartKeys } from "../keys";
import { store } from "../store.state";

const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartKeys.ADD_TO_CART_REQUEST });
      const res = await axios.post(`/cart/get`);
      if (res.status === 200) {
        const { cartItems } = res.data;
        // console.log({ getCartItems: cartItems });
        if (cartItems) {
          dispatch({
            type: cartKeys.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const addToCart = (product, newQty = 1) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();

    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty + newQty)
      : 1;
    cartItems[product._id] = {
      ...product,
      qty,
    };

    if (auth.authenticated) {
      dispatch({ type: cartKeys.ADD_TO_CART_REQUEST });

      const payload = {
        cartItems: [
          {
            product: product,
            quantity: qty,
          },
        ],
      };

      try {
        const res = await axios.post(`/cart/add`, payload);
        if (res.status === 201) {
          dispatch(getCartItems());
        }
      } catch (err) {
        console.log(err.response);
      }
    }
    // else {
    //   localStorage.setItem("cart", JSON.stringify(cartItems));
    // }
    dispatch({
      type: cartKeys.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
    // console.log("addToCart::", cartItems);
  };
};

export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartKeys.REMOVE_CART_ITEM_REQUEST });
      const res = await axios.post(`/cart/remove`, { payload });
      if (res.status === 202) {
        dispatch({ type: cartKeys.REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: cartKeys.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const updateCart = () => {
  return; //! <---------------- addded an return here
  // return async (dispatch) => {
  //   const { auth } = store.getState();
  //   let cartItems = localStorage.getItem("cart")
  //     ? JSON.parse(localStorage.getItem("cart"))
  //     : null;

  //   if (auth.authenticated) {
  //     localStorage.removeItem("cart");
  //     //dispatch(getCartItems());
  //     if (cartItems) {
  //       const payload = {
  //         cartItems: Object.keys(cartItems).map((key, index) => {
  //           return {
  //             quantity: cartItems[key].qty,
  //             product: cartItems[key]._id,
  //           };
  //         }),
  //       };
  //       if (Object.keys(cartItems).length > 0) {
  //         const res = await axios.post(`/user/cart/addtocart`, payload);
  //         if (res.status === 201) {
  //           dispatch(getCartItems());
  //         }
  //       }
  //     } else {
  //       dispatch(getCartItems());
  //     }
  //   } else {
  //     if (cartItems) {
  //       dispatch({
  //         type: cartKeys.ADD_TO_CART_SUCCESS,
  //         payload: { cartItems },
  //       });
  //     }
  //   }
  // };
};

export { getCartItems };
