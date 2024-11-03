import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import { Add, Delete, Remove } from "@mui/icons-material";
import "../Styles/orderItemList.css";

function OrderItemList() {
  const { cartState, dispatchCart } = useContext(DataContext);

  return (
    <section className="order-items-wrapper">
      {cartState.cartItems.map((product) => {
        const isNameLong = product?.title.length > 25;
        const productTitle = isNameLong
          ? product.title.split(" ").slice(0, 3).join(" ")
          : product.title;

        return (
          <div key={product.id} className="order-item">
            <div className="thumbnail-qty-wrapper">
              <img
                src={product.thumbnail}
                alt={`Thumbnail of ${product.title}`}
                className="thumbnail"
              />
              <div className="text-qty-wrapper">
                <h2 className="cart-item-title">{productTitle}</h2>
                <p className="brand cart">
                  {product?.brand} / {product?.sku}
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
              <button type="button" className="delete-btn" 
              onClick={() =>
                      dispatchCart({
                        type: "DELETE_ITEM",
                        payload: { id: product?.id },
                      })
                    }>
                <Delete fontSize="large" />
              </button>
              <p className="cart-price">
                ${product.price.toLocaleString("en-US")}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default OrderItemList;
