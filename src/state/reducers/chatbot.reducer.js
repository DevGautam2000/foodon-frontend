import { actions } from "../keys";

export const reducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case actions.GET_CHAT:
      console.log("from actions: " + action.payload);
      return { message: action.payload };
    case actions.GET_CHAT_FAILED:
      return { message: action.payload };
    default:
      return state;
  }
};
