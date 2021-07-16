import React from "react"
import "./MainSlidesContainer.css"
import MainSlideContainer from "../MainSlideContainer/MainSlideContainer"

const MainSlidesContainer = ({
  slidesData,
  displaySlides,
  primarySlideRef,
  secondarySlideRef,
  transitions,
  slideBackgroundColor,
  mainSlidesContainterRef,
  handleInteractionStart
}) => {
  
  return (
    <div
      className="MainSlidesContainer"
      ref={mainSlidesContainterRef}
    >
      <MainSlideContainer
        key={slidesData.length === 1 ? slidesData.length : displaySlides.primarySlide.id}
        slideData={slidesData[displaySlides.primarySlide.id]}
        state={displaySlides.primarySlide.state}
        transitions={transitions}
        handleInteractionStart={handleInteractionStart}
        backgroundColor={slideBackgroundColor}
        reference={primarySlideRef}
      />  
      <MainSlideContainer
        key={displaySlides.secondarySlide.id}
        slideData={slidesData[displaySlides.secondarySlide.id]}
        state={displaySlides.secondarySlide.state}
        transitions={transitions}
        handleInteractionStart={handleInteractionStart}
        backgroundColor={slideBackgroundColor}
        reference={secondarySlideRef}
      />
    </div>
  )
}

export default MainSlidesContainer