import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCartAction,
  removeItemsFromCartAction,
} from "../../store/actions/cartActions";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantityHandler = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemsToCartAction(id, newQty));
  };

  const decreaseQuantityHandler = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) return;
    dispatch(addItemsToCartAction(id, newQty));
  };

  const removeItemHandler = (productId) => {
    dispatch(removeItemsFromCartAction(productId));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      <MetaData title="Empty Bag ---Blink-Buy" />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>You Bag Is Empty</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <MetaData title="Your Bag ---Blink-Buy" />
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} removeItem={removeItemHandler} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantityHandler(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantityHandler(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹ ${cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}> CheckOut</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
