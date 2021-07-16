import React from "react"
import "./Carousel.css"
import { useState, useRef } from 'react'
import MainSlidesContainer from "../MainSlidesContainer/MainSlidesContainer"
import PreviewSlidesContainer from "../PreviewSlidesContainer/PreviewSlidesContainer"
import NavigationButton from "../NavigationButton/NavigationButton"
import useWindowDimensions from "../../utilities/useWindowDimensions"
import * as K from "../../utilities/constants"
import * as utils from "../../utilities/functions"

const Carousel = ({
  mainSlideElements,
  previewSlideElements,
  width,
  height,
  previewSlidesHeightPct = 12,
  slideBackgroundColor,
  carouselBackgroundColor = "rgb(240, 240, 240)",
  transitions
}) => {
  // Data

  mainSlideElements = utils.convertToArray(mainSlideElements);
  previewSlideElements = utils.convertToArray(previewSlideElements);
  const range = [...Array(mainSlideElements.length).keys()];

  const mainSlidesData = range.map(id => (
    {
      id: id,
      reactElement: mainSlideElements[id],
      reference: useRef()
    }
  ));
  const previewSlidesData = range.map(id => (
    {
      id: id,
      reactElement: previewSlideElements[id]
    }
  ));

  // References

  const carouselRef = useRef();
  const mainSlidesContainterRef = useRef();
  const primarySlideRef = useRef();
  const secondarySlideRef = useRef();
  const secondarySlideStateRef = useRef("next");

  const interactionStartRef = useRef({x: 0, y: 0});
  const interactionEndRef = useRef({x: 0, y: 0});

  const touchEventInvokedRef = useRef(false);
  const animationFinishedRef = useRef(true);

  const rerenderQueuedRef = useRef(false);
  const swipeDetectedRef = useRef(false);

  const { windowHeight, windowWidth } = useWindowDimensions();

  // State control

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
  const [detailsVisible, setDetailsVisibility] = useState(false);
  const [detailsFade, setDetailsFade] = useState(true);

  const toggleDetails = () => {
    if (animationFinishedRef.current && !detailsVisible) {
      animationFinishedRef.current = false;
      setDetailsVisibility(true);
      setTimeout(() => setDetailsFade(false), 0);
      setTimeout(() => {animationFinishedRef.current = true;}, K.TOGGLE_DETAILS_ANIMATION_DURATION);
    } else if (animationFinishedRef.current && detailsVisible) {
      animationFinishedRef.current = false;
      setDetailsFade(true);
      setTimeout(() => setDetailsVisibility(false), K.TOGGLE_DETAILS_ANIMATION_DURATION);
      setTimeout(() => {animationFinishedRef.current = true;}, K.TOGGLE_DETAILS_ANIMATION_DURATION);
    }
  }

  const handleInteractionStart = (event) => {
    if (rerenderQueuedRef.current) return;
    if (event.type === "touchstart") touchEventInvokedRef.current = true;
    
    interactionStartRef.current = touchEventInvokedRef.current
      ? {x: event.touches[0].clientX, y: event.touches[0].clientY}
      : {x: event.clientX, y: event.clientY};
    interactionEndRef.current = interactionStartRef.current;

    primarySlideRef.current.style.transition = "";
    secondarySlideRef.current.style.transition = "";

    if (event.target.className.includes("NavigationButton")) {
      adjustSecondarySlide(event.target.className.includes("right") ? -1 : 1);
    } else {
      window.addEventListener(touchEventInvokedRef.current ? "touchmove" : "mousemove", handleInteractionMove);
    }
    window.addEventListener(touchEventInvokedRef.current ? "touchend" : "mouseup", handleInteractionEnd);
  }

  const handleInteractionMove = (event) => {
    const interactionStart = interactionStartRef.current;
    const current = touchEventInvokedRef.current
      ? {x: event.touches[0].clientX, y: event.touches[0].clientY}
      : {x: event.clientX, y: event.clientY};
    interactionEndRef.current = current;
    const xDifference = current.x - interactionStart.x;
    const yDifference = current.y - interactionStart.y;

    if (!swipeDetectedRef.current && Math.abs(yDifference) >= K.SWIPE_DETECION_THRESHOLD) {
      finishInteraction();
      return;
    }
    
    if (mainSlidesData.length === 1
      || (!swipeDetectedRef.current && Math.abs(xDifference) < K.SWIPE_DETECION_THRESHOLD)) return;
    if (!swipeDetectedRef.current && Math.abs(xDifference) > K.SWIPE_DETECION_THRESHOLD) swipeDetectedRef.current = true;
    adjustSecondarySlide(xDifference);
    moveSlides(xDifference, true);
  }

  const moveSlides = (xDifference, followPointer) => {
    const transitionProgress = Math.abs(xDifference) / mainSlidesContainterRef.current.clientWidth;

    for (let i = 0; i < transitions.length; i++) {
      const tr = transitions[i];
      const newPrimarySlideTransitionValue = followPointer
        ? [...Array(tr.current.length).keys()].map(idx => (tr.current[idx] + transitionProgress * ((xDifference < 0 ? tr.previous[idx] : tr.next[idx]) - tr.current[idx])))
        : xDifference === 0 ? tr.current
        : xDifference < 0 ? tr.previous
        : tr.next;
      const newSecondarySlideTransitionValue = followPointer && secondarySlideStateRef.current === "previous" 
        ? [...Array(tr.current.length).keys()].map(idx => (tr.previous[idx] + transitionProgress * (xDifference < 0 ? 0 : tr.current[idx] - tr.previous[idx])))
        : followPointer && secondarySlideStateRef.current === "next"
        ? [...Array(tr.current.length).keys()].map(idx => (tr.next[idx] + transitionProgress * (xDifference < 0 ? tr.current[idx] - tr.next[idx] : 0)))
        : xDifference === 0 ? tr[secondarySlideStateRef.current]
        : tr.current;

      primarySlideRef.current.style[tr.property] = 
        utils.joinWithDelimiters(tr.surroundingStrings, newPrimarySlideTransitionValue);
      secondarySlideRef.current.style[tr.property] = 
        utils.joinWithDelimiters(tr.surroundingStrings, newSecondarySlideTransitionValue);
    }
  }

  const finishInteraction = () => {
    window.removeEventListener(touchEventInvokedRef.current ? "touchmove" : "mousemove", handleInteractionMove);
    window.removeEventListener(touchEventInvokedRef.current ? "touchend" : "mouseup", handleInteractionEnd);

    if (touchEventInvokedRef.current) touchEventInvokedRef.current = false;
  }

  const adjustSecondarySlide = (xDifference) => {
    const tempDisplaySlides = {
      primarySlide: displaySlides.primarySlide,
      secondarySlide: displaySlides.secondarySlide
    }

    if (xDifference < 0 && secondarySlideStateRef.current === "previous") {
      tempDisplaySlides.secondarySlide = {
        id: (displaySlides.primarySlide.id + 1) % mainSlidesData.length,
        state: "next"
      }
      secondarySlideStateRef.current = "next";
      setDisplaySlides(tempDisplaySlides);
    } else if (xDifference > 0 && secondarySlideStateRef.current === "next") {
      tempDisplaySlides.secondarySlide = {
        id: (displaySlides.primarySlide.id + mainSlidesData.length - 1) % mainSlidesData.length,
        state: "previous"
      }
      secondarySlideStateRef.current = "previous";
      setDisplaySlides(tempDisplaySlides);
    }
  }

  const handleInteractionEnd = (event) => {
    const interactionStartX = interactionStartRef.current.x;
    const interactionEndX = interactionEndRef.current.x;
    finishInteraction();

    const xDifference = interactionEndX - interactionStartX;
    setTransitions();

    if (event.target.className.includes("NavigationButton")) {
      updateOutputSlides(event.target.className.includes("right") ? -1 : 1);
    } else if (Math.abs(xDifference) < K.CLICK_THRESHOLD && !swipeDetectedRef.current) {
      toggleDetails();
    } else if (Math.abs(xDifference) > mainSlidesContainterRef.current.clientWidth * K.SWIPE_THRESHOLD_FOR_SLIDE_CHANGE) {
      updateOutputSlides(xDifference);
    } else {
      moveSlides(0, false);
    }

    if (swipeDetectedRef.current) swipeDetectedRef.current = false;
  }

  const setTransitions = () => {
    const transitionProperty = 
      transitions.map(transition => `${transition.property} ${K.TRANSITION_TIME_AND_FUNCTION}`).join(", ");
    
    primarySlideRef.current.style.transition = transitionProperty;
    secondarySlideRef.current.style.transition = transitionProperty;
  }

  const updateOutputSlides = (xDifference) => {
    moveSlides(xDifference, false);

    rerenderQueuedRef.current = true;

    setTimeout(() => {
      setDisplaySlides({
        primarySlide: {
          id: xDifference < 0 
            ? (displaySlides.primarySlide.id + 1) % mainSlidesData.length
            : (displaySlides.primarySlide.id + mainSlidesData.length - 1) % mainSlidesData.length,
          state: "current"
        },
        secondarySlide: {
          id: displaySlides.primarySlide.id,
          state: xDifference < 0 ? "previous" : "next"
        }
      });

      secondarySlideStateRef.current = xDifference < 0 ? "previous" : "next";
      rerenderQueuedRef.current = false;
    }, 200);
  }

  const jumpToSlide = (id) => {
    primarySlideRef.current.style.transition = "";
    secondarySlideRef.current.style.transition = "";
    setDisplaySlides({
      primarySlide: {
        id: id,
        state: "current"
      },
      secondarySlide: {
        id: (id + 1) % mainSlidesData.length,
        state: "next"
      }
    });
  }

  return (
    <div
      className="Carousel"
      style={{
        minWidth: `min(${windowWidth}px, ${width})`,
        minHeight: `min(${windowHeight}px, ${height})`,
        backgroundColor: carouselBackgroundColor
      }}
      ref={carouselRef}
    >
      <MainSlidesContainer
        slidesData={mainSlidesData}
        displaySlides={displaySlides}
        primarySlideRef={primarySlideRef}
        secondarySlideRef={secondarySlideRef}
        transitions={transitions}
        slideBackgroundColor={slideBackgroundColor}
        mainSlidesContainterRef={mainSlidesContainterRef}
        handleInteractionStart={handleInteractionStart}
      />
      <PreviewSlidesContainer
        slidesData={previewSlidesData}
        visible={detailsVisible}
        fade={detailsFade}
        currentSlideIdx={displaySlides.primarySlide.id}
        heightPct={previewSlidesHeightPct}
        jumpToSlide={jumpToSlide}
      />
      <NavigationButton
        direction={1}
        onInteractionStart={handleInteractionStart}
        visible={detailsVisible}
        fade={detailsFade}
      />
      <NavigationButton
        direction={-1}
        onInteractionStart={handleInteractionStart}
        visible={detailsVisible}
        fade={detailsFade}
      />
    </div>
  );
}

export default Carousel;