import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store.state";
import { ContextProvider  } from "./context/context";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ContextProvider>
          <AppRouter />
        </ContextProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
