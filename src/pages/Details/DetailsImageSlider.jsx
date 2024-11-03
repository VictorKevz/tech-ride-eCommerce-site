import React,{useState} from "react";
import "../../Styles/detailsImageSlider.css"
function DetailsImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  const updateIndex = (currentIndex) => {
setIndex(currentIndex)
  }
  return (
    <div className="image-slider-wrapper">
      <div className="thumbnails-wrapper">
        
        {images.slice(0,3).map((image,i) => {
            const isCurrent = index === i
          return (
            <button key={i} type="button" className={`navigation-img-btn ${isCurrent && "current"}`} onClick={()=>{updateIndex(i)}}>
              <img src={image} className="navigation-img" alt={`Image for Slide ${index + 1}`} />
            </button>
          );
        })}
      </div>
      <div className="main-image-wrapper">
        <img
          src={images[index]}
          alt={`Main Image for Slide ${index + 1}`}
          className="main-img"
        />
      </div>
    </div>
  );
}

export default DetailsImageSlider;
