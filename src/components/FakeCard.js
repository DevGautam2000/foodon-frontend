import React, { useState } from "react";
import style from "../styles/payments.module.css";
import visa from "../assets/visa_icon.svg";
import { store } from "../state/store.state";

function FakeCard() {
  const { auth } = store.getState();
  const [isNumcopied, setIsNumcopied] = useState(false);
  const [isDatecopied, setIsDatecopied] = useState(false);
  const [isCvccopied, setIsCvccopied] = useState(false);

  React.useEffect(() => {
    const effect = () => {
      setTimeout(() => {
        setIsNumcopied(false);
        setIsDatecopied(false);
        setIsCvccopied(false);
      }, 2000);
    };
    return effect();
  }, [isNumcopied, isDatecopied, isCvccopied]);
  return (
    <>
      <div
        style={{
          fontSize: "1.2rem",
          width: "100%",
          textAlign: "center",
          margin: "2rem 0",
        }}
      >
        Use The Card Details Below To Checkout
      </div>
      <div className={style.card}>
        <div className={style.foreground}>
          <img src={visa} className={style.visa} alt="visa"></img>
          <p className={style.number}>
            4242 4242 4242 4242{" "}
            <span>
              <svg
                onClick={() => {
                  navigator.clipboard.writeText("4242 4242 4242 4242");
                  setIsNumcopied(true);
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-clipboard-minus ${style.clipboard}`}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
                />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>

              {isNumcopied && <small> Copied!</small>}
            </span>
          </p>
          <div className={style.name}>
            {auth.user
              ? `${auth.user.firstName} ${auth.user.lastName}`
              : "Customer Name"}
          </div>
          <div className={style.date}>
            Valid Upto:
            <div>
              {" "}
              08/
              {Number(new Date().getFullYear().toString().substring(2, 4)) +
                1}{" "}
              <span>
                <svg
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `08/${
                        Number(
                          new Date().getFullYear().toString().substring(2, 4)
                        ) + 1
                      }`
                    );
                    setIsDatecopied(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi bi-clipboard-minus ${style.clipboard}`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
                  />
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                </svg>
                {isDatecopied && <small> Copied!</small>}
              </span>
            </div>
          </div>
        </div>
        <div className={style.background}>
          <div className={style.wrapper}>
            <div className={style.stripe}></div>
            <span className={style.cvc}>
              <i>123</i>
              <span>
                <svg
                  onClick={() => {
                    navigator.clipboard.writeText("123");
                    setIsCvccopied(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi bi-clipboard-minus ${style.clipboard}`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
                  />
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                </svg>
                {isCvccopied && <small> Copied!</small>}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default FakeCard;
