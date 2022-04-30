import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        p: 1,
        borderRadius: 1,
        textAlign: "center",
        fontSize: "1rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

function Body() {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="body">
      <Box
        sx={{
          display: "flex",
          height: "90vh",
          background:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlubmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
          }}
          className="body__banner"
        >
          <div
            style={{
              width: "60%",
            }}
          >
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "normal",
                textAlign: "center",
                color: "#fff",
              }}
            >
              Search Your Taste
            </h1>
            <Divider sx={{ borderColor: "#fff" }} />

            {!auth.authenticated ? (
              <Box
                sx={{
                  width: "20%",
                  margin: "30px auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="body__bannerbox"
              >
                <Link to="/signin" style={{ textDecoration: "none" }}>
                  <Button
                    style={{
                      border: "1px solid #fff",
                      color: "#fff",
                      minWidth: "90px",
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="error">
                    Sign Up
                  </Button>
                </Link>
              </Box>
            ) : null}
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default Body;
