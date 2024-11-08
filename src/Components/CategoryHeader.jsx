import React, { useEffect, useState } from "react";
import "../Styles/categoryHeader.css";
import arrow from "../assets/images/arrow-down.gif";
function CategoryHeader({ headerInfo }) {
  const [currentImgSrc, setCurrentImgSrc] = useState(
    headerInfo.bgImage.desktop
  );

  useEffect(() => {
    const updateImageSrc = () => {
      setCurrentImgSrc(
        window.innerWidth <= 600
          ? headerInfo.bgImage.mobile
          : headerInfo.bgImage.desktop
      );
    };
    updateImageSrc();

    window.addEventListener("resize", updateImageSrc);

    return () => {
      window.removeEventListener("resize", updateImageSrc);
    };
  }, [currentImgSrc]);
  return (
    <section className="category-header-container">
      <header
        className="category-header"
        style={{ backgroundImage: `url(${currentImgSrc})` }}
      >
        <div className="header-text">
          <h1 className="header-title">{headerInfo.heading}</h1>

          <p className="header-parag">{headerInfo.parag}</p>
        </div>
        <img
          src={arrow}
          alt="An arrow Icon pointing down"
          className="arrow-img"
        />
        <div className="header-overlay"></div>
      </header>
    </section>
  );
}

export default CategoryHeader;
