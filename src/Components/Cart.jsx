import React, { useContext, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FocusTrap from "focus-trap-react";
import emptyCart from "../assets/images/empty-cart.svg";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../Styles/cart.css";
import { DataContext } from "../App";
import OrderItemList from "./OrderItemList";
import { cartVariants } from "../Variants";

function Cart() {
  const { cartState, dispatchCart } = useContext(DataContext);
  const cartCount = cartState?.cartItems ? cartState.cartItems.length : 0;
  const closeButtonRef = useRef(null);

  const handleCloseCart = useCallback(() => {
    dispatchCart({
      type: "TOGGLE_CART",
      payload: { cartOpen: false },
    });
  }, [dispatchCart]);

  // Close Cart on "Escape" key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        handleCloseCart();
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [handleCloseCart]);

 // Set initial focus to the close button when the cart opens
 useEffect(() => {
  if (cartState.cartOpen && closeButtonRef.current) {
    closeButtonRef.current.focus();
  }
}, [cartState.cartOpen]);

  return (
    <>
      <FocusTrap>
        <motion.section
          className="cart-wrapper"
          variants={cartVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-labelledby="cart-title"
          aria-modal="true"
          tabIndex="-1" // To make the whole section focusable
        >
          <header className="cart-header">
            <h1 id="cart-title" className="cart-main-title">
              Your Cart ({cartCount})
            </h1>
            <button
              ref={closeButtonRef}
              type="button"
              className="close-cart-btn"
              onClick={handleCloseCart}
              aria-label="Close cart"
            >
              <Close fontSize="large" />
            </button>
          </header>

          {cartCount === 0 ? (
            <div className="cart-empty-wrapper">
              <div className="cart-empty">
                <h2 className="empty-title">Your cart is empty</h2>
                <img
                  src={emptyCart}
                  alt="Illustration of an empty shopping cart"
                  className="empty-img cart"
                />
                <Link
                  className="empty-link"
                  to="/"
                  onClick={handleCloseCart}
                  aria-label="Continue shopping"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="cart-filled" aria-live="polite">
              <OrderItemList />
            </div>
          )}
        </motion.section>
        </FocusTrap>
      <div
        className="cart-mask"
        aria-hidden="true"
        onClick={handleCloseCart}
      />
    </>
  );
}

export default Cart;
