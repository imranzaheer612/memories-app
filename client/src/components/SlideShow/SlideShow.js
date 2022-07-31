import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./slideShow.scss";

export default function SlideShow({ images }) {
  const properties = {
    duration: 5000,
    autoplay: false,
    transitionDuration: 500,
    infinite: true,
    easing: "ease",
  };

  return (
    <div className="slide-container">
      <Slide {...properties}>
        {images.map((imageSlide, index) => (
          <div key={index}>
            <div className="each-slide">
              <img src={imageSlide} />
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
