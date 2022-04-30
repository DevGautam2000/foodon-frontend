import React from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import {
  AddCircle,
  RemoveCircle,
  CloseRounded as CloseIcon,
} from "@mui/icons-material";
import { useAction } from "../state/actions/index.action";
import { useContextSelector } from "../context/context";
import { useNavigate } from "react-router-dom";

function CartItem({ product }) {
  const { image, name, price, desc, _id } = product;
  const [quantity, setQuantity] = React.useState(1);
  const navigate = useNavigate();
  const { removeCartItem } = useAction();
  const { localCart } = useContextSelector();

  const helper = () => {
    const prod = localCart[_id];
    const newProd = { ...prod, qty: quantity };
    localCart[_id] = newProd;
  };

  React.useEffect(() => {
    return helper();

    // eslint-disable-next-line
  }, [quantity]);

  const { cartLength, setCartLength, setProductsToCheckout } =
    useContextSelector();
  const removeFromCartHandler = () => {
    setCartLength(() => cartLength - 1);
    removeCartItem(_id);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "150px",
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
          flex: 0.3,
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
        <IconButton
          aria-label="close"
          onClick={removeFromCartHandler}
          sx={{
            position: "absolute",
            right: 8,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography sx={{ color: "#d23f57", fontSize: "1.1rem" }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
          {desc}
        </Typography>
        <Stack direction="row" spacing={3}>
          <Typography
            sx={{ display: "flex", alignItems: "center", minWidth: "80px" }}
          >
            ₹ {+price * quantity}
          </Typography>

          <Stack direction="row" spacing={2}>
            <IconButton
              onClick={() => {
                setQuantity(() => (quantity > 1 ? quantity - 1 : 1));
              }}
            >
              <RemoveCircle />
            </IconButton>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                minWidth: "30px",
                justifyContent: "center",
              }}
            >
              {quantity}
            </Typography>
            <IconButton
              onClick={() => {
                setQuantity(() => (quantity < 10 ? quantity + 1 : 10));
              }}
            >
              <AddCircle />
            </IconButton>
          </Stack>

          <Button
            className="cartitem__button"
            variant="contained"
            sx={{
              textTransform: "none",
              background: "#d23f57",
              flex: 1,
              position: "relative",
              // left: "18px",
            }}
            onClick={() => {
              const prods = [];
              Object.values(localCart).forEach((key) => {
                prods.push(key);
              });
              setProductsToCheckout(() => [...prods]);
              navigate("/payments");
            }}
          >
            Place order
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default CartItem;
