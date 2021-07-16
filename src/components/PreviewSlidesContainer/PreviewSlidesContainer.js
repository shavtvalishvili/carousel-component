import React from "react"
import "./PreviewSlidesContainer.css"
import { useEffect, useRef } from "react";
import PreviewSlideContainer from "../PreviewSlideContainer/PreviewSlideContainer";
import * as K from "../../utilities/constants"

const PreviewSlidesContainer = ({
  slidesData,
  visible,
  fade,
  currentSlideIdx,
  heightPct,
  jumpToSlide
}) => {
  const wrapperReference = useRef();
  const containerReference = useRef();

  const previewSlideWidthRef = useRef("");
  const containerScrollRef = useRef(0);

  const swipeDetectedRef = useRef(false);
  const containerGrabInitialScrollRef = useRef(0);
  const containerGrabStartRef = useRef(0);

  const wrapperStyle = { height: `${heightPct}%`, opacity: fade ? 0 : 1};
  if (!visible) wrapperStyle.display = "none";
  
  useEffect(() => {
    containerReference.current.style.scrollBehavior = "unset";
    containerReference.current.scrollLeft = containerScrollRef.current;
  }, [fade])

  useEffect(() => {
    adjustSlideWidths();
  })

  useEffect(() => {
    scrollToSelectedSlide()
  }, [currentSlideIdx])

  const adjustSlideWidths = () => {
    previewSlideWidthRef.current = `${wrapperReference.current.clientHeight}px`;
    containerReference.current.style.bottom = 
      `${containerReference.current.clientHeight - containerReference.current.offsetHeight}px`;
    containerReference.current.style.height =
      `calc(100% - ${containerReference.current.clientHeight - containerReference.current.offsetHeight}px)`;
  }

  const scrollToSelectedSlide = () => {
    containerReference.current.style.scrollBehavior = "smooth";
    const slideWidth = containerReference.current.scrollWidth / slidesData.length;
    const selectedPosition = currentSlideIdx * slideWidth;

    if (selectedPosition - containerReference.current.scrollLeft < 0) {
      containerReference.current.scrollLeft = selectedPosition;
      containerScrollRef.current = selectedPosition;
    } else if (selectedPosition - containerReference.current.scrollLeft + slideWidth > wrapperReference.current.clientWidth) {
      containerReference.current.scrollLeft = selectedPosition - wrapperReference.current.clientWidth + slideWidth;
      containerScrollRef.current = selectedPosition - wrapperReference.current.clientWidth + slideWidth;
    }
  }

  const handleContainerGrabStart = (event) => {
    containerReference.current.style.scrollBehavior = "unset";
    containerGrabInitialScrollRef.current = containerReference.current.scrollLeft;
    containerGrabStartRef.current = event.clientX;

    window.addEventListener("mousemove", handleContainerGrabMove);
    window.addEventListener("mouseup", handleContainerGrabEnd);
  }

  const handleContainerGrabMove = (event) => {
    const grabLength = event.clientX - containerGrabStartRef.current;
    if (!swipeDetectedRef.current && Math.abs(grabLength) < K.SWIPE_DETECION_THRESHOLD) return;
    if (!swipeDetectedRef.current && Math.abs(grabLength) > K.SWIPE_DETECION_THRESHOLD) swipeDetectedRef.current = true;

    swipeDetectedRef.current = true;
    if (grabLength > 0) {
      containerScrollRef.current =
        Math.max(containerGrabInitialScrollRef.current - grabLength, 0);
    } else {
      containerScrollRef.current =
        Math.min(containerGrabInitialScrollRef.current - grabLength, containerReference.current.scrollWidth - wrapperReference.current.clientWidth);
    }
    containerReference.current.scrollLeft = containerScrollRef.current;
  }

  const handleContainerGrabEnd = (event) => {
    containerReference.current.style.scrollBehavior = "smooth";
    const grabLength = event.clientX - containerGrabStartRef.current;
    const initialContainerX = 
      containerGrabInitialScrollRef.current + containerGrabStartRef.current - wrapperReference.current.getBoundingClientRect().left;

    if (swipeDetectedRef.current
        && (containerGrabInitialScrollRef.current - grabLength < 0
        || containerGrabInitialScrollRef.current - grabLength > containerReference.current.scrollWidth - wrapperReference.current.clientWidth)
        && Math.floor(initialContainerX / wrapperReference.current.clientHeight) !== Math.floor((containerReference.current.scrollLeft + event.clientX - wrapperReference.current.getBoundingClientRect().left) / wrapperReference.current.clientHeight)
        ) {
      swipeDetectedRef.current = false;
    }
    
    window.removeEventListener("mousemove", handleContainerGrabMove);
    window.removeEventListener("mouseup", handleContainerGrabEnd);
  }

  const handleSlideClick = (id) => {
    if (swipeDetectedRef.current) swipeDetectedRef.current = false;
    else jumpToSlide(id);
  }

  return (
    <div 
      className="PreviewSlidesContainerWrapper"
      style={wrapperStyle}
      ref={wrapperReference}
      onMouseDown={handleContainerGrabStart}
    >
      <div
        className="PreviewSlidesContainer"
        ref={containerReference}
      >
        {slidesData.map(elem => 
          <PreviewSlideContainer
            key={elem.id}
            slideData={elem}
            numSlides={slidesData.length}
            width={previewSlideWidthRef.current}
            selectedSlide={currentSlideIdx}
            handleSlideClick={handleSlideClick}
          />
        )}
      </div>
    </div>
  )
}

export default PreviewSlidesContainer;