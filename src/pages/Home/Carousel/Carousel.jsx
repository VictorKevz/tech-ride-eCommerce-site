import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import arrowGif from "../../../assets/images/arrow-down.gif";

import { carouselData } from "./carouselData";
import "./carousel.css";

function Carousel() {
  const [index, setIndex] = useState(1);
  const { headingText, parag, imgSrc, path } = carouselData[index];

  useEffect(() => {
    const startSlideInterval = () => {
      return setInterval(() => {
        setIndex((prevIndex) =>
          prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
        );
      }, 3500);
    };

    const slideInterval = startSlideInterval();

    return () => clearInterval(slideInterval);
  }, [index]);
  return (
    <div
      className="carousel-wrapper"
      style={{ backgroundImage: `url(${imgSrc})` }}
    >
      <div className="home-text-wrapper">
        <h1 className="home-title">{headingText}</h1>
        <p className="home-parag">{parag}</p>
        <Link to={path} className="home-cta">
          Shop now
        </Link>
      </div>

      <div className="indicators-wrapper">
        {carouselData.map((indicator) => {
          const isActive = indicator.id === index;
          return (
            <button
              key={indicator.id}
              type="button"
              className={`indicator-btn ${isActive && "current-slide"}`}
              onClick={() => setIndex(indicator.id)}
            ></button>
          );
        })}
      </div>
      <div className="gif-wrapper">
        <img src={arrowGif} alt="An animated arrow pointing down" />
      </div>    </div>
  );
}

export default Carousel;
