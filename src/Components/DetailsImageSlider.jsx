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

  const updateIndex = (currentIndex) => setIndex(currentIndex);
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
      role="region"
      aria-label="Image Slider"
    >
      <div
        className={`thumbnails-wrapper ${isOpen && "lightbox"}`}
        role="tablist"
        aria-label="Image Thumbnails"
      >
        {images.map((image, i) => {
          const isCurrent = index === i;

          return (
            <button
              key={i}
              type="button"
              className={`navigation-img-btn ${isCurrent && "current"} ${
                !isOpen && "hide"
              }`}
              onClick={() => updateIndex(i)}
              aria-pressed={isCurrent}
              aria-selected={isCurrent}
              role="tab"
              tabIndex={0}
            >
              <img
                src={image}
                className="navigation-img"
                alt={`Thumbnail ${i + 1} of ${images.length}`}
              />
            </button>
          );
        })}
      </div>
      <div className={`main-image-wrapper ${isOpen && "lightbox"}`}>
        {!isOpen && (
          <button
            className="add-sign"
            type="button"
            aria-label="View Image in Fullscreen"
            onClick={() => !isOpen && dispatchData({ type: "OPEN_LIGHTBOX" })}
          >
            <Add fontSize="large" />
          </button>
        )}
        <AnimatePresence mode="wait">
          <motion.img
            src={images[index]}
            alt={`Main Image Slide ${index + 1} of ${images.length}`}
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
          aria-label="Previous Slide"
          tabIndex={0}
        >
          <ArrowBackIosNew fontSize="large" className="arrow-icon" />
        </button>

        <button
          type="button"
          className={`next navigation-btn ${isOpen && "show"}`}
          onClick={nextSlide}
          aria-label="Next Slide"
          tabIndex={0}
        >
          <ArrowForwardIos fontSize="large" className="arrow-icon" />
        </button>
      </div>
    </motion.div>
  );
}

export default DetailsImageSlider;
