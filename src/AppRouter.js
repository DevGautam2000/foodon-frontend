import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAction } from "./state/actions/index.action";
import Cart from "./screens/Cart";
import SignIn from "./screens/Signin";
import SignUp from "./screens/Signup";
import Home from "./screens/Home";
import NavBar from "./components/Navbar";
import SideBar from "./components/Sidebar";
import Orders from "./screens/Orders";
import Payments from "./screens/Payments";

function App() {
  const auth = useSelector((state) => state.auth);
  const { isUserLoggedIn, getCartItems, getOrders } = useAction();
  React.useEffect(() => {
    if (!auth.authenticated) {
      isUserLoggedIn();
    } else {
      getCartItems();
      getOrders();
    }

    // eslint-disable-next-line
  }, [auth.authenticated]);

  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
  };

  return (
    <>
      <NavBar toggleDrawer={toggleDrawer} drawerState={state} />
      <SideBar toggleDrawer={toggleDrawer} drawerState={state} />

      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </>
  );
}

export default App;
