import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../App";
import "../../Styles/detailsPage.css";
import DetailsImageSlider from "../../Components/DetailsImageSlider";
import Tabs from "./Tabs/Tabs";
import {
  Add,
  Check,
  CheckCircleOutlineOutlined,
  Facebook,
  Instagram,
  Remove,
  ReviewsRounded,
  Share,
  ShoppingBag,
  Star,
  X,
} from "@mui/icons-material";
import LightBox from "../../Components/LightBox";
import { detailsCheckoutVariants } from "../../Variants";
function DetailsPage() {
  const [quantity, setQuantity] = useState(1);
  const { category, productName } = useParams();
  const { stateData, dispatchCart } = useContext(DataContext);

  const productObj = stateData?.[category].find(
    (product) => product.title === productName
  );
  const images = productObj ? productObj?.images.slice(0, 3) : [];

  const rating = Math.round(productObj?.rating);
  const unit = category === "motorcycle" ? "Inches" : "mm";
  const weightUnit = category === "smartphones" ? "gramms" : "Kgs";

  const decrementQuantity = () => {
    setQuantity((prevQty) => Math.max(1, prevQty - 1));
  };
  const incrementQuantity = () => {
    setQuantity((prevQty) => prevQty + 1);
  };
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
        <p className="link-name">
          {productName.split(" ").slice(0, 3).join(" ")}
        </p>
      </header>
      <div className="details-slider-info-wrapper">
        <DetailsImageSlider images={images} />
        <AnimatePresence mode="wait">
          <motion.div
            className="details-text-wrapper"
            variants={detailsCheckoutVariants}
            initial="hidden"
            animate="visible"
            custom="right"
          >
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

            <p className="product-price details">
              ${productObj?.price.toLocaleString("en-US")}
            </p>
            <span className="price-caption">Price per item, Includes VAT</span>
            <div className="qty-addToCart-buyNow-wrapper">
              <div className="qty-addToCart-wrapper">
                <div className="qty-btn-wrapper">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={decrementQuantity}
                    aria-label="Decrease quantity"
                  >
                    <Remove fontSize="large" />
                  </button>
                  <span className="qty-num" aria-label={`Quantity is ${quantity}`}>{quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={incrementQuantity}
                    aria-label="Increase quantity"
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
                      payload: { productObj, quantity, openCart: true },
                    });
                    setQuantity(1);
                  }}
                  aria-label={`Add ${productObj?.title} to cart`}
                >
                  <ShoppingBag fontSize="large" /> Add To Cart
                </button>
              </div>
              <Link
                to="/checkout"
                className="buyNow-btn"
                onClick={() => {
                  dispatchCart({
                    type: "ADD_TO_CART",
                    payload: { productObj, quantity, openCart: false },
                  });
                  setQuantity(1);
                }}
                aria-label={`Add ${productObj?.title} to cart and go to the checkout page`}
              >
                Buy Now
              </Link>
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
            <ul className="share-socials-wrapper">
              <li className="share-item">
                <h3 className="share-title">
                  Share: <Share fontSize="large" />
                </h3>
              </li>
              <li className="share-item">
                <a
                  href="https://www.x.com"
                  target="_blank"
                  className="share-link"
                >
                  <X fontSize="large" />
                </a>
              </li>
              <li className="share-item">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  className="share-link"
                >
                  <Facebook fontSize="large" />
                </a>
              </li>
              <li className="share-item">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  className="share-link"
                >
                  <Instagram fontSize="large" />
                </a>
              </li>
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
      <Tabs productObj={productObj} category={category} images={images} />
      {stateData?.isLightBoxOpen && <LightBox images={images} />}
    </section>
  );
}

export default DetailsPage;
