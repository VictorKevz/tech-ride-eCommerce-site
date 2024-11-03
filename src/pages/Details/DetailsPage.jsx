import React, { useContext,useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../App";
import "../../Styles/detailsPage.css";
import DetailsImageSlider from "./DetailsImageSlider";
import Tabs from "./Tabs"
import {
  Add,
  Check,
  CheckCircleOutlineOutlined,
  Remove,
  ReviewsRounded,
  ShoppingBag,
  Star,
} from "@mui/icons-material";
function DetailsPage() {
  const[quantity,setQuantity] = useState(1)
  const { category, productName } = useParams();
  const { stateData, cartState, dispatchCart } = useContext(DataContext);

  const productObj = stateData?.[category].find(
    (product) => product.title === productName
  );
  const images = productObj ? productObj?.images : [];

  const rating = Math.round(productObj?.rating);
  const unit = category === "motorcycle" ? "Inches" : "mm";
  const weightUnit = category === "smartphones" ? "gramms" : "Kgs";

  const decrementQuantity = () => {
    setQuantity(prevQty => Math.max(1, prevQty - 1))
  }
  const incrementQuantity = () => {
    setQuantity(prevQty => prevQty + 1)
  }
  return (
    <section className="details-page-wrapper">
      <header className="details-page-header">
        <Link className="details-link" to={`/`}>
          Home{` /`}
        </Link>
        <Link
          className="details-link"
          to={`/${category}`}
        >{`${category} /`}</Link>
        <p className="link-name">{productName}</p>
      </header>
      <div className="details-slider-info-wrapper">
        <DetailsImageSlider images={images} />

        <div className="details-text-wrapper">
          <h1 className="details-product-name">{productName}</h1>
          <div className="details-rating-reviews-stock-wrapper">
            <div className="details-star-wrapper">
              {Array.from({ length: 5 }, (_, index) => {
                const isFilled = index < rating;
                return (
                  <Star
                    key={index}
                    fontSize="large"
                    className={`star-icon ${isFilled && "filled"}`}
                  />
                );
              })}
              <span className="details-rating">
                {productObj?.rating.toFixed(1)}
              </span>
              <span className="dot"></span>
            </div>

            <div className="reviews-wrapper">
              <ReviewsRounded fontSize="large" />
              {productObj?.reviews?.length} Reviews
              <span className="dot"></span>
            </div>
            <div className="stock-wrapper">
              <Check fontSize="large" />
              {productObj?.stock} In Stock
            </div>
          </div>
          <p className="product-price details">${productObj?.price}</p>
          <span className="price-caption">Price per item, Includes VAT</span>
          <div className="qty-addToCart-buyNow-wrapper">
            <div className="qty-addToCart-wrapper">
              <div className="qty-btn-wrapper">
                <button
                 type="button" 
                 className="qty-btn"
                 onClick={decrementQuantity}
                 >
                  <Remove fontSize="large" />
                </button>
                <span className="qty-num">{quantity}</span>
                <button type="button" 
                className="qty-btn"
                onClick={incrementQuantity}
                >
                  <Add fontSize="large" />
                </button>
              </div>
              <button
                type="button"
                className="addToCart-btn"
                onClick={() => {
                  dispatchCart({
                    type: "ADD_TO_CART",
                    payload: { productObj,quantity }
                  });
                  setQuantity(1)
                }}
              >
                <ShoppingBag fontSize="large" /> Add To Cart
              </button>
            </div>
            <button type="button" className="buyNow-btn">
              Buy Now
            </button>
          </div>
          <ul className="mini-specs-wrapper">
            <li className="spec">
              <CheckCircleOutlineOutlined
                fontSize="large"
                className="spec-icon"
              />
              {`Dimensions: ${productObj?.dimensions?.width} x ${productObj?.dimensions?.height} x ${productObj?.dimensions?.depth} `}
              {unit}
            </li>
            <li className="spec">
              <CheckCircleOutlineOutlined
                fontSize="large"
                className="spec-icon"
              />
              {`Weight: ${productObj?.weight} `}
              {weightUnit}
            </li>
            <li className="spec">
              <CheckCircleOutlineOutlined
                fontSize="large"
                className="spec-icon"
              />
              {`SKU: ${productObj?.sku} `}
            </li>
            <li className="spec">
              <CheckCircleOutlineOutlined
                fontSize="large"
                className="spec-icon"
              />
              {`Brand: ${productObj?.brand} `}
            </li>
          </ul>
        </div>
      </div>
      <Tabs productObj={productObj}/>
    </section>
  );
}

export default DetailsPage;
