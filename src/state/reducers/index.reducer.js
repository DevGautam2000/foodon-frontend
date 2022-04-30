import { combineReducers } from "redux";
import { reducer as productReducer } from "./products.reducer";
import { reducer as chatbotReducer } from "./chatbot.reducer";
import { reducer as authReducer } from "./auth.reducer";
import { reducer as cartReducer } from "./cart.reducer";
import { reducer as orderReducer } from "./order.reducer";

export const reducers = combineReducers({
  products: productReducer,
  chatbot: chatbotReducer,
  auth: authReducer,
  cart: cartReducer,
  orders: orderReducer,
});
