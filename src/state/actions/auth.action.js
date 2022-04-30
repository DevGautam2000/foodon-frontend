import { auth, cart } from "../keys";
import axios from "../../utils/helper";

// new update signup action
export const signup = (user) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch({ type: auth.SIGNUP_REQUEST });
      res = await axios.post(`/signup`, user);
      if (res.status === 200) {
        dispatch({ type: auth.SIGNUP_SUCCESS });
        const { token, user, message } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: auth.LOGIN_SUCCESS,
          payload: {
            token,
            user,
            message,
          },
        });
      } else {
        const { message } = res.data;
        dispatch({ type: auth.SIGNUP_FAILURE, payload: { message } });
      }
    } catch (error) {
      const { message } = error.response.data;
      dispatch({
        type: auth.SIGNUP_FAILURE,
        payload: { message: message },
      });
    }
  };
};

export const signin = (user) => {
  return async (dispatch) => {
    dispatch({ type: auth.LOGIN_REQUEST });

    let res;
    try {
      res = await axios.post(`/signin`, {
        ...user,
      });
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: auth.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      }
    } catch (err) {
      // console.log(err.response);
      dispatch({
        type: auth.LOGIN_FAILURE,
        payload: { message: err.response.data.message },
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: auth.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: auth.LOGIN_FAILURE,
        payload: { message: "Failed to signin" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: auth.LOGOUT_REQUEST });
    // localStorage.removeItem('user');
    localStorage.clear();
    dispatch({ type: auth.LOGOUT_SUCCESS });
    dispatch({ type: cart.RESET_CART });
    //const res = await axios.post(`/admin/signout`);
    // if(res.status === 200){

    // }else{
    //     dispatch({
    //         type: auth.LOGOUT_FAILURE,
    //         payload: { error: res.data.error }
    //     });
    // }
  };
};
