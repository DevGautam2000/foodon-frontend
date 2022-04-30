import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function EmptyContainer({ img, typographies: { message, buttonText } }) {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "fit-content",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "gray",
        overflow: "hidden",
        marginBottom: "30px",
        fontSize: "1.5rem",
      }}
    >
      <img src={img} alt={`${img}`} width="300" height="300" />
      <Typography>{message}</Typography>

      <Button
        variant="contained"
        className="cart__button"
        sx={{
          background: "#d23f57e6",
          mt: "30px",
          textTransform: "none",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "#ffffff" }}>
          {buttonText}
        </Link>
      </Button>
    </Stack>
  );
}

export default EmptyContainer;
