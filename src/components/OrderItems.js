import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "../context/context";
import { useAction } from "../state/actions/index.action";

function OrderItem({ product }) {
  const navigate = useNavigate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const { image, name, price, desc, qty, timeStamp, orderId } = product;
  const { productsToCheckout, setProductsToCheckout } = useContextSelector();
  const { removeOrder, getOrders } = useAction();
  const timeLimitForCancellingOrder = 10; //in minutes
  const [isDisabled, setisDisabled] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    const effect = () => {
      const interval = setInterval(() => {
        if (
          Math.floor(((new Date() - new Date(timeStamp)) / 36e5) * 60) >
            timeLimitForCancellingOrder &&
          isMounted
        )
          setisDisabled(() => true);
      }, 1000);
      if (isDisabled) clearInterval(interval);
    };

    effect();
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, [getOrders]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "210px",
        boxShadow: "0 0 10px #3333",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        marginBottom: "30px",
      }}
    >
      <Stack
        sx={{
          height: "100%",
          background: "#d23f57 ",
          flex: 0.4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={image} alt={name} width="100px" height="100px" />
      </Stack>
      <Stack
        sx={{
          height: "100%",
          flex: 1,
          display: "flex",
          // alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
          padding: "10px 2rem",
          position: "relative",
        }}
      >
        <Typography sx={{ color: "#d23f57", fontSize: "1.1rem" }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
          {desc}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: "80px",
              flex: 1,
            }}
          >
            ₹ {+price * qty}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: "80px",
              flex: 1,
            }}
          >
            {qty} nos.
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="info"
            className="orderitem__orderagainbutton"
            sx={{
              textTransform: "none",
              flex: 1,
            }}
            onClick={() => {
              const finalProduct = { ...product };
              const copy = [...productsToCheckout];

              setProductsToCheckout(() => [...copy, finalProduct]);
              navigate("/payments");
            }}
          >
            Order again
          </Button>
          <Button
            className="orderitem__button"
            variant="contained"
            sx={{
              textTransform: "none",
              background: "#d23f57",
              flex: 1,
            }}
            onClick={() => {
              removeOrder(orderId);
            }}
            disabled={isDisabled} //if diff btwn order time and current time is more than timeLimitForCancellingOrder then order cannot be cancelled
          >
            Cancel
          </Button>
        </Stack>

        <Stack direction="row">
          <Stack direction="row">
            <Typography sx={{ color: "#333", fontSize: "0.5rem" }}>
              Ordered AT {Math.abs(new Date(Date.parse(timeStamp)).getHours())}{" "}
              : {Math.abs(new Date(Date.parse(timeStamp)).getMinutes())} :{" "}
              {Math.abs(new Date(Date.parse(timeStamp)).getSeconds())} ON{" "}
              {Math.abs(new Date(Date.parse(timeStamp)).getDate())}{" "}
              {months[Math.abs(new Date(Date.parse(timeStamp)).getMonth())]}{" "}
              {Math.abs(new Date(Date.parse(timeStamp)).getFullYear())}
            </Typography>
            <Box
              sx={{ width: "10px", display: "inline-block", height: "100%" }}
            ></Box>
            <Typography sx={{ color: "#333", fontSize: "0.5rem" }}>
              OrderID : {orderId.substring(orderId.length - 6, orderId.length)}
            </Typography>
          </Stack>
          {!isDisabled ? (
            <Typography
              sx={{ color: "#d23f57", fontSize: "0.5rem", marginLeft: "auto" }}
            >
              Cancel before {timeLimitForCancellingOrder} minutes
            </Typography>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
}

export default OrderItem;
