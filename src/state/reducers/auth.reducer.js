import { auth } from "../keys.js";

const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticated: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case auth.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case auth.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        message: action.payload.message,
        authenticated: true,
        authenticating: false,
      };
      break;
    case auth.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case auth.LOGOUT_SUCCESS:
      state = {
        ...initState,
        message: action?.payload?.message || "",
      };
      break;
    case auth.LOGIN_FAILURE:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case auth.SIGNUP_REQUEST:
      break;
    case auth.SIGNUP_SUCCESS:
      break;
    case auth.SIGNUP_FAILURE:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    default:
      //do nothing
      break;
  }

  return state;
};
