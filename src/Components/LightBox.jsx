import React, { useContext,useEffect } from "react";
import DetailsImageSlider from "./DetailsImageSlider";
import "../Styles/lightBox.css";
import { Close } from "@mui/icons-material";
import { DataContext } from "../App";
import FocusTrap from "focus-trap-react";
function LightBox({ images }) {
  const { dispatchData } = useContext(DataContext);

  // Close Lightbox on "Escape" key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        dispatchData({ type: "CLOSE_LIGHTBOX" });
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [dispatchData]);

  return (
    <FocusTrap>
      <section className="lightbox-wrapper">
        <DetailsImageSlider images={images} />
        <button
          type="button"
          className="lightbox-btn"
          onClick={() => dispatchData({ type: "CLOSE_LIGHTBOX" })}
        >
          <Close fontSize="large" className="lightbox-icon" />
        </button>
      </section>
    </FocusTrap>
  );
}

export default LightBox;
