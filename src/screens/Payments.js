import { Alert, Button, Container, Snackbar, Stack } from "@mui/material";
import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FakeCard from "../components/FakeCard";
import { useNavigate } from "react-router-dom";
import { useAction } from "../state/actions/index.action";
import { useContextSelector } from "../context/context";

function Payments() {
  const [value, setValue] = useState("CARD");
  const [isCOD, setIsCOD] = useState(true);
  const navigate = useNavigate();
  const [message, setmessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const { addToOrders, removeCartItem } = useAction();
  const { productsToCheckout, setProductsToCheckout } = useContextSelector();
  var sum = 0;

  if (productsToCheckout.length > 0) {
    productsToCheckout.forEach(({ qty, price }) => {
      sum += qty * price;
    });
  }

  function RadioForm() {
    const StyledFormControlLabel = styled((props) => (
      <FormControlLabel {...props} />
    ))(({ theme, checked }) => ({
      ".MuiFormControlLabel-label": checked && {
        color: theme.palette.primary.main,
      },
    }));

    function MyFormControlLabel(props) {
      const radioGroup = useRadioGroup();

      let checked = false;

      if (radioGroup) {
        checked = radioGroup.value === props.value;
      }

      return <StyledFormControlLabel checked={checked} {...props} />;
    }

    MyFormControlLabel.propTypes = {
      /**
       * The value of the component.
       */
      value: PropTypes.any,
    };

    function UseRadioGroup() {
      return (
        <RadioGroup
          name="use-radio-group"
          defaultValue="CARD"
          onChange={(e) => setValue(() => e.target.value)}
        >
          <hr />
          <MyFormControlLabel
            value="CARD"
            label="Card"
            className="payments__formlabel"
            control={<Radio />}
          />
          <MyFormControlLabel
            value="COD"
            className="payments__formlabel"
            label="Cash On Delivery"
            control={<Radio />}
          />
        </RadioGroup>
      );
    }

    return UseRadioGroup();
  }
  class Stripe {
    static CHCEKOUT_KEY = `${process.env.REACT_APP_STRIPE_API_KEY}`;

    static handleToken = (token) => {
      if (token) {
        console.log(token);
        addToOrders(productsToCheckout);

        productsToCheckout?.forEach((product) => {
          removeCartItem(product._id);
        });

        setTimeout(() => {
          setProductsToCheckout(() => []);
          navigate("/orders");
        }, 1000);
      }
    };

    static Component = (price) => {
      return (
        <StripeCheckout
          stripeKey={this.CHCEKOUT_KEY}
          name={"FoodOn"}
          amount={+price * 100} //price is divided by 100 so we multiply by 100
          currency="INR"
          billingAddress //gets auto filled
          shippingAddress //gets auto filled
          token={this.handleToken}
        />
      );
    };
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

      <Container sx={{ paddingTop: "10vh", minHeight: "100vh", width: "40vw" }}>
        {isCOD ? (
          <Stack
            sx={{
              background: "#ffffff",
              boxShadow: "0 0 10px #3333",
              padding: "0.9rem 2rem",
              borderRadius: "10px",
              minHeight: "180px",
            }}
            spacing={4}
          >
            <RadioForm />

            <Button
              className="cartitem__button"
              variant="contained"
              sx={{
                textTransform: "none",
                background: "#d23f57",
              }}
              onClick={() => {
                if (value === "COD") {
                  setmessage(() => "Order placed");
                  setSeverity(() => "success");
                  setOpen(() => true);

                  addToOrders(productsToCheckout);

                  productsToCheckout?.forEach((product) => {
                    removeCartItem(product._id);
                  });

                  setTimeout(() => {
                    setOpen(() => false);
                    setProductsToCheckout(() => []);
                    navigate("/orders");
                  }, 2000);
                } else {
                  setIsCOD(() => false);
                }
              }}
            >
              Proceed
            </Button>
          </Stack>
        ) : (
          <Stack
            sx={{
              minWidth: "10vw",
              pt: "6rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {Stripe.Component(sum)}
            <FakeCard />
          </Stack>
        )}
      </Container>
    </>
  );
}

export default Payments;
