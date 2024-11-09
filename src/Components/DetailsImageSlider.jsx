import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "../Styles/detailsImageSlider.css";

import { DataContext } from "../App";
import { Add, ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { detailsCheckoutVariants, sliderVariants } from "../Variants";

function DetailsImageSlider({ images }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("left");
  const { stateData, dispatchData } = useContext(DataContext);

  const isOpen = stateData?.isLightBoxOpen;

  const updateIndex = (currentIndex) => {
    setIndex(currentIndex);
  };
  const nextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setDirection("right");
  };
  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setDirection("left");
  };
  return (
    <motion.div
      className={`image-slider-wrapper ${isOpen && "lightbox"}`}
      variants={detailsCheckoutVariants}
      initial="hidden"
      animate="visible"
      custom="left"
    >
      <div className={`thumbnails-wrapper ${isOpen && "lightbox"}`}>
        {images.map((image, i) => {
          const isCurrent = index === i;

          return (
            <button
              key={i}
              type="button"
              className={`navigation-img-btn ${isCurrent && "current"} ${
                !isOpen && "hide"
              }`}
              onClick={() => {
                updateIndex(i);
              }}
            >
              <img
                src={image}
                className="navigation-img"
                alt={`Image for Slide ${index + 1}`}
              />
            </button>
          );
        })}
      </div>
      <div className={`main-image-wrapper ${isOpen && "lightbox"}`}>
        {!isOpen && (
          <span className="add-sign">
            <Add fontSize="large" />
          </span>
        )}
        <AnimatePresence mode="wait">
          <motion.img
            
            src={images[index]}
            alt={`Main Image for Slide ${index + 1}`}
            className={`main-img ${isOpen && "lightbox"}`}
            onClick={() => !isOpen && dispatchData({ type: "OPEN_LIGHTBOX" })}
            key={images[index]}
            variants={sliderVariants(direction)}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        </AnimatePresence>

        <button
          type="button"
          className={`prev navigation-btn ${isOpen && "show"}`}
          onClick={prevSlide}
        >
          <ArrowBackIosNew fontSize="large" className="arrow-icon" />
        </button>

        <button
          type="button"
          className={`next navigation-btn ${isOpen && "show"}`}
          onClick={nextSlide}
        >
          <ArrowForwardIos fontSize="large" className="arrow-icon" />
        </button>
      </div>
    </motion.div>
  );
}

export default DetailsImageSlider;
