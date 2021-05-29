import React from "react"
import { useState } from 'react'
import "./Carousel.css";
import SlidesContainer from "../SlidesContainer/SlidesContainer"

const Carousel = ({content}) => {
  let id = 0
  const [slides, updateSlides] = useState(content.map(slideHtml => (
    {
      className: id == 0 ? "currentSlide" : id == content.length - 1 ? "previousSlide" : id == 1 ? "nextSlide" : "",
      id: id++,
      html: slideHtml
    }
  )));



  return (
    <div className="Carousel">
      <SlidesContainer slides={slides} />
      {/* <SlidesPreviewContainer /> */}
    </div>
  );
}

export default Carousel;