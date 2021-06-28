import React from "react"
import { useState, useRef } from 'react'
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
  const convertToArray = (object) => {
    return !Array.isArray(object) ? [object] : object;
  }

  const toggleDetails = () => {
    if (animationFinishedRef.current && !detailsVisible) {
      animationFinishedRef.current = false;
      setDetailsVisibility(true);
      setTimeout(() => setDetailsFade(false), 0);
      setTimeout(() => {animationFinishedRef.current = true;}, 600);
    } else if (animationFinishedRef.current && detailsVisible) {
      animationFinishedRef.current = false;
      setDetailsFade(true);
      setTimeout(() => setDetailsVisibility(false), 600);
      setTimeout(() => {animationFinishedRef.current = true;}, 600);
    }
  }
  
  mainSlideElements = convertToArray(mainSlideElements);
  previewSlideElements = convertToArray(previewSlideElements);
  const range = [...Array(mainSlideElements.length).keys()];
  const mainSlidesData = range.map(id => (
    {
      id: id,
      reactElement: mainSlideElements[id],
      reference: useRef()
    }
  ));

  const [displaySlides, setDisplaySlides] = useState({
    primarySlide: {
      id: 0,
      state: "current"
    },
    secondarySlide: {
      id: 1 % mainSlidesData.length,
      state: "next"
    }
  });
  const animationFinishedRef = useRef(true);
  const [detailsVisible, setDetailsVisibility] = useState(false);
  const [detailsFade, setDetailsFade] = useState(true);

  return (
    <div
      className="Carousel"
      style={{maxWidth: width, maxHeight: height}}
    >
      <MainSlidesContainer
        slidesData={mainSlidesData}
        displaySlides={displaySlides}
        setDisplaySlides={setDisplaySlides}
        toggleDetails={toggleDetails}
        transitions={transitions}
        navigationVisible={detailsVisible}
        navigationFade={detailsFade}
        slideBackgroundColor={slideBackgroundColor}
      />
      <PreviewSlidesContainer
        previewSlideElements={previewSlideElements}
        visible={detailsVisible}
        fade={detailsFade}
        currentSlideIdx={displaySlides.primarySlide.id}
        heightPct={previewSlidesHeightPct}
      />
    </div>
  );
}

export default Carousel;