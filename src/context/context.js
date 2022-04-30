import React, { useContext, useState } from "react";
import AppRouter from "../AppRouter";

const Context = React.createContext();

const ContextProvider = () => {
  const [cartLength, setCartLength] = useState(0);
  const [productsToCheckout, setProductsToCheckout] = useState([]);
  const [localCart, setLocalCart] = useState([]);
  return (
    <Context.Provider
      value={{
        cartLength,
        setCartLength,
        productsToCheckout,
        setProductsToCheckout,
        localCart,
        setLocalCart,
      }}
    >
      <AppRouter />
    </Context.Provider>
  );
};

const useContextSelector = () => {
  return useContext(Context);
};

export { ContextProvider, useContextSelector };
