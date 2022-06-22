import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
// import "./styles.css";



export default function SlideShow({images}) {
  return (
    <div className="slide-container">
      <Fade>
        {images.map((fadeImage, index)=> (
            <div key={index}>
              <div className="each-slide">
                <img src={fadeImage}/>
              </div>
            </div>
        ))} 
      </Fade>
    </div>
  );
}
