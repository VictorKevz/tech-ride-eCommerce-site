import React, { useContext, useState } from "react";
import "../Styles/categoryProductCard.css";
import { Inventory, Star, ThumbUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataContext } from "../App";

function CategoryProductCard({ categoryData }) {
  const { dispatchFavorites, favoritesState } = useContext(DataContext);
  return (
    <div className="product-card-grid">
      {categoryData.map((product, index) => {
        const isLast = categoryData.length - 1 === index && categoryData.length % 2 !== 0 ;
        const isSoldOut = product.stock === 0;
        const isInFavorites = favoritesState.some((item) => item.id === product.id);

        return (
          <div
            key={product.id}
            className={`product-item ${isLast && "last-item"}`}
          >
            <div
              className={`product-bg-image ${isLast && "last-item"}`}
              style={{ backgroundImage: `url(${product?.images[0]})` }}
            ></div>
            <div className="product-text">
              <div className="like-stock-wrapper">
                <button
                  type="button"
                  disabled={isSoldOut}
                  className={`icon-wrapper like-btn ${isInFavorites && "in-cart"}`}
                  onClick={() => {
                    dispatchFavorites({ type: "ADD_TO_FAVORITES", product });
                  }}
                >
                  <ThumbUp
                    className={`like-icon ${isInFavorites && "active"}`}
                    fontSize="large"
                  />
                </button>
              </div>
              <div className="product-info">
                <p className="product-brand">{product?.brand}</p>
                <h3 className="product-title">{product?.title}</h3>
                <p className="product-price">${product?.price}</p>
              </div>
              <div className="extra-details">
                <p className="rating icon-wrapper">
                  {product.rating}
                  <Star className="star" fontSize="large" />
                </p>
                <Link to={`/${product.category}/${product.title}`} className="product-link category">Order Now!</Link>
                <p className="icon-wrapper stock">
                  {product.stock}
                  <Inventory fontSize="large" />
                  
                </p>
              </div>
            </div>
            {isSoldOut && (
              <div className="sold-out-overlay">
                <h4 className="sold-text">SOLD OUT!</h4>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CategoryProductCard;
