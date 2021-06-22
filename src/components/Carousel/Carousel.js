import React from "react"
import { useState, useRef, useEffect } from 'react'
import "./Carousel.css"
import MainSlidesContainer from "../MainSlidesContainer/MainSlidesContainer"
import PreviewSlidesContainer from "../PreviewSlidesContainer/PreviewSlidesContainer"

const Carousel = ({
  mainSlideElements,
  previewSlideElements,
  width,
  height,
  previewSlidesHeightPct,
  slideBackgroundColor,
  transitions
}) => {
  const range = [...Array(mainSlideElements.length).keys()];
  const mainSlidesData = range.map(id => (
    {
      id: id,
      reactElement: mainSlideElements[id],
      reference: useRef()
    }
  ));

  const [animationFinished, setAnimationFinished] = useState(true);
  const [detailsVisibility, setDetailsVisibility] = useState(false);
  const [detailsFade, setDetailsFade] = useState(true);
  const toggleDetails = () => {
    if (animationFinished && !detailsVisibility) {
      setAnimationFinished(false);
      setDetailsVisibility(true);
      setTimeout(() => setDetailsFade(false), 1);
      setTimeout(() => setAnimationFinished(true), 601);
    } else if (animationFinished && detailsVisibility) {
      setAnimationFinished(false);
      setDetailsFade(true);
      setTimeout(() => setDetailsVisibility(false), 600);
      setTimeout(() => setAnimationFinished(true), 600);
    }
  }

  return (
    <div
      className="Carousel"
      style={{maxWidth: width, maxHeight: height}}
    >
      <MainSlidesContainer
        slidesData={mainSlidesData}
        toggleDetails={toggleDetails}
        transitions={transitions}
        navigationVisible={detailsVisibility}
        navigationFade={detailsFade}
        slideBackgroundColor={slideBackgroundColor}
      />
      <PreviewSlidesContainer
        previewSlideElements={previewSlideElements}
        visible={detailsVisibility}
        fade={detailsFade}
        // currentSlideIdx={mainSlides.reduce((accumulator, currentValue) =>
        //   (currentValue.className === "currentSlide" ? currentValue.id : accumulator), 0)}
        heightPct={previewSlidesHeightPct}
      />
    </div>
  );
}

export default Carousel;