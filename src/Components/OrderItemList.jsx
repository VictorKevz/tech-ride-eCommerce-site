import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import { Add, Delete, OpenInNew, Remove } from "@mui/icons-material";
import "../Styles/orderItemList.css";
import { Link } from "react-router-dom";

function OrderItemList() {
  const { cartState, dispatchCart } = useContext(DataContext);

  const total = cartState?.cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalQty = cartState?.cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const totalFreight = totalQty * cartState.delivery.cost;

  const grandTotal = total + totalFreight
  return (
    <section className="order-items-wrapper">
      {cartState.cartItems.map((product) => {
        const isNameLong = product?.title.length > 25;
        const productTitle = 
           product.title.split(" ").slice(0, 3).join(" ")
          

        return (
          <div key={product.id} className="order-item">
            <div className="thumbnail-qty-wrapper">
              <Link
                to={`/${product?.category}/${product?.title}`}
                onClick={() =>
                  dispatchCart({
                    type: "TOGGLE_CART",
                    payload: { cartOpen: false },
                  })
                }
                className="thumbnail-link"
              >
                <img
                  src={product?.images[0]}
                  alt={`Thumbnail of ${product.title}`}
                  className="thumbnail-img"
                />
                <OpenInNew fontSize="large" className="link-icon" />
              </Link>
              <div className="text-qty-wrapper">
                <h2 className="cart-item-title">{productTitle}</h2>
                <p className="brand cart">
                   {product?.sku}
                </p>
                <div className="qty-btn-wrapper cart">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() =>
                      dispatchCart({
                        type: "DECREMENT_QUANTITY",
                        payload: { id: product?.id },
                      })
                    }
                  >
                    <Remove fontSize="large" />
                  </button>
                  <span className="qty-num">{product?.quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() =>
                      dispatchCart({
                        type: "INCREMENT_QUANTITY",
                        payload: { id: product?.id },
                      })
                    }
                  >
                    <Add fontSize="large" />
                  </button>
                </div>
              </div>
            </div>
            <div className="price-delete-wrapper">
              <button
                type="button"
                className="delete-btn"
                onClick={() =>
                  dispatchCart({
                    type: "DELETE_ITEM",
                    payload: { id: product?.id },
                  })
                }
              >
                <Delete fontSize="large" />
              </button>
              <p className="cart-price">
                ${product.price.toLocaleString("en-US")}
              </p>
            </div>
          </div>
        );
      })}
      <ul className="order-cost-summary">
      <li className="service-item">
          <p className="service">Items-Total</p>
          <span className="value">${total?.toLocaleString("en-US")}</span>
        </li>
        <li className="service-item">
          <p className="service">
            Delivery ({cartState?.delivery?.method}) (
            {cartState?.delivery?.method === "standard"
              ? "FREE"
              : `$${cartState?.delivery?.cost} / item`}
            )
          </p>
          <span className="value">${totalFreight}</span>
        </li>
       
        <li className="service-item">
          <p className="service total">Total (Delivery inclussive)</p>
          <span className="value total">${grandTotal?.toLocaleString("en-US")}</span>
        </li>
        {cartState.isCartOpen && (
          <div className="checkout-btn-wrapper">
            <Link
              to="/checkout"
              className="buyNow-btn cart"
              onClick={() =>
                dispatchCart({
                  type: "TOGGLE_CART",
                  payload: { cartOpen: false },
                })
              }
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </ul>
    </section>
  );
}

export default OrderItemList;
