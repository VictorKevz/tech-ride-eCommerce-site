import React, { useContext } from "react";
import DetailsImageSlider from "./DetailsImageSlider";
import  "../Styles/lightBox.css"
import { Close } from "@mui/icons-material";
import { DataContext } from "../App";
function LightBox({ images }) {
    const{dispatchData} = useContext(DataContext)
  return (
    <section className="lightbox-wrapper">
      <DetailsImageSlider images={images} />
      <button 
      type="button" 
      className="lightbox-btn"
      onClick={() =>  dispatchData({ type: "CLOSE_LIGHTBOX" })}

      >
        <Close fontSize="large" className="lightbox-icon"/>
      </button>
    </section>
  );
}

export default LightBox;
