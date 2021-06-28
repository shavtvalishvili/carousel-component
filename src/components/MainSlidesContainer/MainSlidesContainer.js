import React from "react"
import { useRef } from "react"
import "./MainSlidesContainer.css"
import SlideContainer from "../SlideContainer/SlideContainer"
import NavigationButton from "../NavigationButton/NavigationButton"

const MainSlidesContainer = ({
  slidesData,
  displaySlides,
  setDisplaySlides,
  toggleDetails,
  transitions,
  navigationVisible,
  navigationFade,
  slideBackgroundColor,
  backgroundColor = "rgb(240, 240, 240)"
}) => {
  const CLICK_THRESHOLD = 1; // px
  const SWIPE_THRESHOLD = 1 / 3; // portion of the slide width
  const TRANSITION_TIME_AND_FUNCTION = "200ms ease-in-out";

  const mainSlidesContainterRef = useRef();
  const primarySlideRef = useRef();
  const secondarySlideRef = useRef();
  const secondarySlideStateRef = useRef("next");

  const interactionStartRef = useRef(0);
  const interactionEndRef = useRef(0);

  const touchEventInvokedRef = useRef(false);


  const handleInteractionStart = (event) => {
    if (touchEventInvokedRef.current) return;
    else if (event.type === "touchstart") touchEventInvokedRef.current = true;
    
    interactionStartRef.current = 
      touchEventInvokedRef.current ? event.touches[0].clientX : event.clientX;
    interactionEndRef.current = interactionStartRef.current;

    primarySlideRef.current.style.transition = "";
    secondarySlideRef.current.style.transition = "";

    if (event.target.className.includes("NavigationButton")) {
      adjustSecondarySlide(event.target.className.includes("right") ? -1 : 1);
    } else {
      window.addEventListener(
        touchEventInvokedRef.current ? "touchmove" : "mousemove", handleInteractionMove
      );
    }
    window.addEventListener(
      touchEventInvokedRef.current ? "touchend" : "mouseup", handleInteractionEnd
    );
  }

  const handleInteractionMove = (event) => {
    const interactionStart = interactionStartRef.current;
    const currentX = touchEventInvokedRef.current ? event.touches[0].clientX : event.clientX;
    interactionEndRef.current = currentX;
    if (slidesData.length === 1) return;

    const xDifference = currentX - interactionStart;
    adjustSecondarySlide(xDifference);
    const transitionProgress = Math.abs(xDifference) / mainSlidesContainterRef.current.clientWidth;

    for (let i = 0; i < transitions.length; i++) {
      const tr = transitions[i];
      const newSecondarySlideTransitionValue = 
        secondarySlideStateRef.current === "previous" ?
          tr.previous + transitionProgress * (xDifference < 0 ? 0 : tr.current - tr.previous)
        :
          tr.next + transitionProgress * (xDifference < 0 ? tr.current - tr.next : 0);
      primarySlideRef.current.style[tr.property] = 
        tr.surroundingStrings.join(tr.current + transitionProgress * ((xDifference < 0 ? tr.previous : tr.next) - tr.current));
      secondarySlideRef.current.style[tr.property] = tr.surroundingStrings.join(newSecondarySlideTransitionValue);
    }
  }

  const adjustSecondarySlide = (xDifference) => {
    const tempDisplaySlides = {
      primarySlide: displaySlides.primarySlide,
      secondarySlide: displaySlides.secondarySlide
    }

    if (xDifference < 0 && secondarySlideStateRef.current === "previous") {
      tempDisplaySlides.secondarySlide = {
        id: (displaySlides.primarySlide.id + 1) % slidesData.length,
        state: "next"
      }
      secondarySlideStateRef.current = "next";
      setDisplaySlides(tempDisplaySlides);
    } else if (xDifference > 0 && secondarySlideStateRef.current === "next") {
      tempDisplaySlides.secondarySlide = {
        id: (displaySlides.primarySlide.id + slidesData.length - 1) % slidesData.length,
        state: "previous"
      }
      secondarySlideStateRef.current = "previous";
      setDisplaySlides(tempDisplaySlides);
    }
  }

  const handleInteractionEnd = (event) => {
    const interactionStart = interactionStartRef.current;
    const interactionEnd = interactionEndRef.current;
    window.removeEventListener(
      touchEventInvokedRef.current ? "touchmove" : "mousemove", handleInteractionMove
    );
    window.removeEventListener(
      touchEventInvokedRef.current ? "touchend" : "mouseup", handleInteractionEnd
    );

    const xDifference = interactionEnd - interactionStart;
    setTransitions();

    if (event.target.className.includes("NavigationButton")) {
      updateOutputSlides(event.target.className.includes("right") ? -1 : 1);
    } else if (Math.abs(xDifference) < CLICK_THRESHOLD) {
      toggleDetails();
    } else if (Math.abs(xDifference) > mainSlidesContainterRef.current.clientWidth * SWIPE_THRESHOLD) {
      updateOutputSlides(xDifference);
    } else {
      for (let i = 0; i < transitions.length; i++) {
        const tr = transitions[i];
        primarySlideRef.current.style[tr.property] = tr.surroundingStrings.join(tr.current);
        secondarySlideRef.current.style[tr.property] = tr.surroundingStrings.join(tr[secondarySlideStateRef.current]);
      }
    }
    if (touchEventInvokedRef.current) touchEventInvokedRef.current = false;
  }

  const setTransitions = () => {
    const transitionProperty = 
      transitions.map(transition => `${transition.property} ${TRANSITION_TIME_AND_FUNCTION}`).join(',');
    secondarySlideRef.current.style.transition = transitionProperty;
    primarySlideRef.current.style.transition = transitionProperty;
  }

  const updateOutputSlides = (xDifference) => {
    setDisplaySlides({
      primarySlide: {
        id: 
          xDifference < 0 ? (displaySlides.primarySlide.id + 1) % slidesData.length
          : (displaySlides.primarySlide.id + slidesData.length - 1) % slidesData.length,
        state: "current"
      },
      secondarySlide: {
        id: displaySlides.primarySlide.id,
        state: 
          xDifference < 0 ? "previous"
          : "next"
      }
    });
    secondarySlideStateRef.current = xDifference < 0 ? "previous" : "next";
  }

  return (
    <div
      className="MainSlidesContainer"
      style={{backgroundColor: backgroundColor}}
      ref={mainSlidesContainterRef}
    >
      <SlideContainer
        key={slidesData.length === 1 ? slidesData.length : displaySlides.primarySlide.id}
        slideData={slidesData[displaySlides.primarySlide.id]}
        state={displaySlides.primarySlide.state}
        transitions={transitions}
        handleInteractionStart={handleInteractionStart}
        backgroundColor={slideBackgroundColor}
        reference={primarySlideRef}
      />  
      <SlideContainer
        key={displaySlides.secondarySlide.id}
        slideData={slidesData[displaySlides.secondarySlide.id]}
        state={displaySlides.secondarySlide.state}
        transitions={transitions}
        handleInteractionStart={handleInteractionStart}
        backgroundColor={slideBackgroundColor}
        reference={secondarySlideRef}
      />
      <NavigationButton
        direction={1}
        onInteractionStart={handleInteractionStart}
        visible={navigationVisible}
        fade={navigationFade}
      />
      <NavigationButton
        direction={-1}
        onInteractionStart={handleInteractionStart}
        visible={navigationVisible}
        fade={navigationFade}
      />
    </div>
  )
}

export default MainSlidesContainer