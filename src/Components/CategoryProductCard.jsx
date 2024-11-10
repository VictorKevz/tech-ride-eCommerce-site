import React, { useContext, useState } from "react";
import "../Styles/categoryProductCard.css";
import { Inventory, Star, ThumbUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataContext } from "../App";
import { AnimatePresence, motion } from "framer-motion";
import { productCardVariants } from "../Variants";

function CategoryProductCard({ categoryData }) {
  const { dispatchFavorites, favoritesState } = useContext(DataContext);

  return (
    <div className="product-card-grid">
      {categoryData.map((product, index) => {
        const isLast =
          categoryData.length - 1 === index && categoryData.length % 2 !== 0;
        const isSoldOut = product.stock === 0;
        const isInFavorites = favoritesState.some(
          (item) => item.id === product.id
        );

        return (
          <AnimatePresence mode="wait" key={product.id}>
            <motion.article
              className={`product-item ${isLast && "last-item"}`}
              variants={productCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              custom={index}
              exit="exit"
            >
              <div
                className={`product-bg-image ${isLast && "last-item"}`}
                style={{ backgroundImage: `url(${product?.images[0]})` }}
                alt={`Image of ${product.title}`}
              ></div>
              <div className="product-text">
                <div className="like-stock-wrapper">
                  <button
                    type="button"
                    aria-label={`Add ${product.title} to favorites`}
                    disabled={isSoldOut}
                    className={`icon-wrapper like-btn ${
                      isInFavorites && "in-cart"
                    }`}
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
                  <h3 className="product-title">{product?.title.split(" ").slice(0, 3).join(" ")}</h3>
                  <p className="product-price">${product?.price}</p>
                </div>
                <div className="extra-details">
                  <p className="rating icon-wrapper" aria-label={`Rating: ${product.rating} stars`}>
                    {product.rating}
                    <Star className="star" fontSize="large" />
                  </p>
                  <Link
                    to={`/${product.category}/${product.title}`}
                    className="product-link category"
                    aria-label={`Learn more about ${product.title}`}
                  >
                    Learn More
                  </Link>
                  <p className="icon-wrapper stock" aria-label={`${product.stock} items in stock`}>
                    {product.stock}
                    <Inventory fontSize="large" />
                  </p>
                </div>
              </div>
              {isSoldOut && (
                <div className="sold-out-overlay" aria-live="assertive">
                  <h4 className="sold-text">SOLD OUT!</h4>
                </div>
              )}
            </motion.article>
          </AnimatePresence>
        );
      })}
    </div>
  );
}

export default CategoryProductCard;
