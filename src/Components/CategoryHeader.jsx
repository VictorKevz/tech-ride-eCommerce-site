import React from "react";
import "../Styles/categoryHeader.css";
import arrow from "../assets/images/arrow-down.gif";
function CategoryHeader({ headerInfo }) {
  return (
    <section className="category-header-container">
      <header
        className="category-header"
        style={{ backgroundImage: `url(${headerInfo.bgImage})` }}
      >
        <div className="header-text">
          <h1 className="header-title">{headerInfo.heading}</h1>

          <p className="header-parag">{headerInfo.parag}</p>
        </div>
        {/* <div className="header-overlay"></div> */}
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
