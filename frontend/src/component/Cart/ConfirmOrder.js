import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./ConfirmOrder.css";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 100;
  const tax = subtotal * 0.16;
  const totalPrice = subtotal + shippingCharges + tax;

  const proceedToPaymentHandler = () => {
    const orderData = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(orderData));
    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Conform Order -- Blink-Buy" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShipping">
            <Typography>Shipping Details</Typography>
            <div className="confirmShippingBox">
              <div>
                <p> Name: </p>
                <span>{user.name}</span>
              </div>
              <div>
                <p> Phone: </p>
                <span>{shippingInfo.phoneNumber}</span>
              </div>
              <div>
                <p> Address: </p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirmCartItems">
            <Typography>Your Bag Items </Typography>
            <div className="confirmcartItemsContainer">
              {cartItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="product" />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <span>
                    {item.quantity} X ₹{item.price} ={" "}
                    <b> ₹{item.price * item.quantity} </b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography> Order Summary </Typography>
            <div>
              <div>
                <p> Subtotal: </p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p> Shipping Charges: </p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p> GST: </p>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total: </b>
              </p>
              <span> ₹{totalPrice}</span>
            </div>
            <button onClick={proceedToPaymentHandler}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
