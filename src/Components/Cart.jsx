import React, { useContext } from "react";
import emptyCart from "../assets/images/empty-cart.svg";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../Styles/cart.css";
import { DataContext } from "../App";
import OrderItemList from "./OrderItemList";
function Cart() {
  const { cartState, dispatchCart } = useContext(DataContext);
  const cartCount = cartState?.cartItems ? cartState?.cartItems.length : 0;
  return (
    <>
      <section className="cart-wrapper">
        <header className="cart-header">
          <h1 className="cart-main-title">Your Cart({cartCount})</h1>
          <button
            type="button"
            className="close-cart-btn"
            onClick={() => dispatchCart({ type: "TOGGLE_CART",payload:{cartOpen:false} })}
          >
            <Close fontSize="large" />
          </button>
        </header>
        {cartState?.cartItems.length <= 0 && (
           <div className="cart-empty-wrapper"> 
          <div className="cart-empty">
            <h2 className="empty-title">Your cart is empty</h2>
            <img
              src={emptyCart}
              alt="Empty cart illustration"
              className="empty-img cart"
            />
            <Link
              className="empty-link"
              to="/"
              onClick={() => dispatchCart({ type: "TOGGLE_CART",payload:{cartOpen:false} })}
            >
              Continue Shopping
            </Link>
          </div>
          </div>
        )}
        {cartState?.cartItems.length > 0 && (
          <div className="cart-filled">
            <OrderItemList />
            
          </div>
        )}
      </section>
      <div className="cart-mask"></div>
    </>
  );
}

export default Cart;
