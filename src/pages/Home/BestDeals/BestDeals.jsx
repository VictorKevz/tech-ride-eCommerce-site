import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../App";
import { Star } from "@mui/icons-material";
import "../BestDeals/bestDeals.css";
import { Link } from "react-router-dom";
function BestDeals() {
  const { stateData, isLoading, error, categories } = useContext(DataContext);

  const dealsProducts = categories
    .map((category) => stateData[category]?.[0])
    .filter(Boolean);
  return (
    <section className="best-deals-wrapper">
      <h2 className="deals-title">Discover Today's Best Deals</h2>

      <div className="best-deals-container">
        <div className="best-deals-grid">
          {dealsProducts.map((product) => (
            <div key={product.id} className="best-deal-card">
              <div className="top-tags">
              <span className="tag discount">15% OFF</span>
              <span className="tag sale">ON SALE</span>
              </div>
              <div className="product-image-wrapper"
              style={{background:`url(${product.images[2]}) no-repeat center`,
              backgroundSize:"70%",
              
            }}
              >
               
              </div>
              <div className="product-details-text">
                <p className="product-brand">{product.brand}</p>
                <h3 className="product-title">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
                <p className="new-price">
                <span className="old-price">{`$${product.price}`}</span>

                  {`$${product.price - (product.price * 0.15).toFixed(1)}`}
                  
                </p>

              </div>
              <div className="extra-detals">
                <p className="product-stock">{product?.stock} left</p>
                <p className="product-rating">
                  {product?.rating}
                  <Star fontSize="large" className="star" />
                </p>
              </div>
              <Link to={`/${product.category}/${product.title}`} className="product-link">Buy Now!</Link>
            </div>
          ))}
        </div>
        <div className="overlay"></div>
      </div>
    </section>
  );
}

export default BestDeals;
