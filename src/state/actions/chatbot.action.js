import axios from "axios";
import { actions } from "../keys";

const getMessage = (msg) => async (dispatch) => {
  const res = await axios.post(`${process.env.REACT_APP_CHATBOT_API}/${msg}`);

  if (res) {
    return dispatch({
      type: actions.GET_CHAT,
      payload: res.data.message,
    });
  }
  return dispatch({
    type: actions.GET_CHAT_FAILED,
    payload: res.data.message,
  });
};

export { getMessage };
