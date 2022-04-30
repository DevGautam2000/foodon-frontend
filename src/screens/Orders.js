import { Container, Stack } from "@mui/material";
import React, { useState } from "react";
import emptyOrder from "../assets/order_status.svg";
import { useSelector } from "react-redux";
import Copyright from "../components/Copyright";
import OrderItem from "../components/OrderItems";
import EmptyContainer from "../components/EmptyContainer";
import { useAction } from "../state/actions/index.action";
import { store } from "../state/store.state";

function Orders() {
  const { getOrders } = useAction();
  const { auth } = store.getState();
  const orderedItems = useSelector((state) => state?.orders?.orderedItems);

  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getOrders();

    // eslint-disable-next-line
  }, [auth]);

  React.useEffect(() => {
    const prods = [];
    let isMounted = true;
    const effect = () => {
      if (isMounted && orderedItems.length > 0)
        orderedItems
          .slice()
          .reverse()
          .forEach(({ product, timeStamp, orderId }) => {
            product.forEach((prod) => {
              const newProd = { ...prod, timeStamp, orderId };
              prods.push(newProd);
            });
          });

      setProducts(() => [...prods]);
    };
    effect();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [orderedItems]);

  return (
    <Container sx={{ paddingTop: "10vh", minHeight: "100vh", width: "42vw" }}>
      <Stack sx={{ width: "90%", margin: "0 auto" }}>
        {products.length > 0 ? (
          products.map((prod, index) => (
            <OrderItem product={prod} key={index} />
          ))
        ) : (
          <EmptyContainer
            img={emptyOrder}
            typographies={{
              message: "No order summary.",
              buttonText: "Start your order.",
            }}
          />
        )}
      </Stack>

      <Copyright />
    </Container>
  );
}

export default Orders;
