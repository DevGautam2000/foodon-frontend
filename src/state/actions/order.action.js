import axios from "../../utils/helper";
import makeId from "../../utils/logic";
import { order as orderKeys } from "../keys";
import { store } from "../store.state";

export const getOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderKeys.ADD_TO_ORDER_REQUEST });
      const res = await axios.post(`/order/get`);
      if (res.status === 200) {
        const { orderedItems } = res.data;
        // console.log({ getOrders: orderedItems });
        if (orderedItems) {
          dispatch({
            type: orderKeys.ADD_TO_ORDER_SUCCESS,
            payload: { orderedItems },
          });
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const addToOrders = (product) => {
  return async (dispatch) => {
    const {
      orders: { orderedItems },
      auth,
    } = store.getState();

    if (auth.authenticated) {
      dispatch({ type: orderKeys.ADD_TO_ORDER_REQUEST });

      const payload = {
        orderedItems: [
          {
            orderId: makeId(),
            product: product,
            timeStamp: new Date().toISOString(),
          },
        ],
      };

      try {
        const res = await axios.post(`/order/add`, payload);
        // console.log(res);
        if (res.status === 201) {
          dispatch(getOrders());
        }
      } catch (err) {
        console.log(err.response);
      }
    }
    // else {
    //   localStorage.setItem("cart", JSON.stringify(cartItems));
    // }
    dispatch({
      type: orderKeys.ADD_TO_ORDER_SUCCESS,
      payload: { orderedItems },
    });
    // console.log("addToCart::", cartItems);
  };
};

export const removeOrder = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderKeys.REMOVE_ORDER_ITEM_REQUEST });
      const res = await axios.post(`/order/remove`, { payload });
      if (res.status === 202) {
        dispatch({ type: orderKeys.REMOVE_ORDER_ITEM_SUCCESS });
        dispatch(getOrders());
      } else {
        const { error } = res.data;
        dispatch({
          type: orderKeys.REMOVE_ORDER_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const updateOrder = () => {
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
  //         type: orderKeys.ADD_TO_ORDER_SUCCESS,
  //         payload: { cartItems },
  //       });
  //     }
  //   }
  // };
};
