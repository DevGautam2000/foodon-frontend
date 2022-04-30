import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers/index.reducer";

export const store = createStore(reducers, {}, applyMiddleware(thunk));
