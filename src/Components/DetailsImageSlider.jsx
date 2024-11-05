import React, { useContext, useState } from "react";
import "../Styles/detailsImageSlider.css";
import { DataContext } from "../App";
import { Add, ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { span } from "framer-motion/client";

function DetailsImageSlider({ images }) {
  const [index, setIndex] = useState(0);
  const { stateData, dispatchData } = useContext(DataContext);

  const isOpen = stateData?.isLightBoxOpen;

  const updateIndex = (currentIndex) => {
    setIndex(currentIndex);
  };
  const nextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className={`image-slider-wrapper ${isOpen && "lightbox"}`}>
      <div className={`thumbnails-wrapper ${isOpen && "lightbox"}`}>
        {images.map((image, i) => {
          const isCurrent = index === i;

          return (
            <button
              key={i}
              type="button"
              className={`navigation-img-btn ${isCurrent && "current"}`}
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
      <div
        className={`main-image-wrapper ${isOpen && "lightbox"}`}
        onClick={() => !isOpen && dispatchData({ type: "OPEN_LIGHTBOX" })}
      >
        {!isOpen && <span className="add-sign">
          <Add fontSize="large"/>
          </span>}
        <img
          src={images[index]}
          alt={`Main Image for Slide ${index + 1}`}
          className={`main-img ${isOpen && "lightbox"}`}
        />
        {isOpen && (
          <button
            type="button"
            className="prev navigation-btn"
            onClick={prevSlide}
          >
            <ArrowBackIosNew fontSize="large" />
          </button>
        )}
        {isOpen && (
          <button
            type="button"
            className="next navigation-btn"
            onClick={nextSlide}
          >
            <ArrowForwardIos fontSize="large" />
          </button>
        )}
      </div>
    </div>
  );
}

export default DetailsImageSlider;
