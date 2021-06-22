import React from "react"
import { useState, useRef } from 'react'
import "./MainSlidesContainer.css"
import SlideContainer from "../SlideContainer/SlideContainer"
import NavigationButton from "../NavigationButton/NavigationButton"

const MainSlidesContainer = ({
  slidesData,
  toggleDetails,
  transitions,
  navigationVisible,
  navigationFade,
  slideBackgroundColor
}) => {
  const [outputSlides, setOutputSlides] = useState(
    {
      previousSlide: slidesData.length - 1,
      currentSlide: 0,
      nextSlide: 1
    }
  );

  const mainSlidesContainerRef = useRef();
  const interactionStartRef = useRef(0);
  const interactionEndRef = useRef(0);
  const touchEventInvokedRef = useRef(false);
  const clickThreashold = 5;
  const swipeThreshold = 1 / 3;

  const handleInteractionStart = (event) => {
    if (touchEventInvokedRef.current) return;
    else if (event.type === "touchstart") touchEventInvokedRef.current = true;

    interactionStartRef.current = 
      touchEventInvokedRef.current ? event.touches[0].clientX : event.clientX;
    interactionEndRef.current = interactionStartRef.current;
    slidesData[outputSlides.previousSlide].reference.current.style.transition = "";
    slidesData[outputSlides.currentSlide].reference.current.style.transition = "";
    slidesData[outputSlides.nextSlide].reference.current.style.transition = "";

    window.addEventListener(
      touchEventInvokedRef.current ? "touchmove" : "mousemove", handleInteractionMove
    );
    window.addEventListener(
      touchEventInvokedRef.current ? "touchend" : "mouseup", handleInteractionEnd
    );
  }

  const handleInteractionMove = (event) => {
    const interactionStart = interactionStartRef.current;
    const currentX = touchEventInvokedRef.current ? event.touches[0].clientX : event.clientX;
    interactionEndRef.current = currentX;

    const xDifference = currentX - interactionStart;
    const transitionProgress = Math.abs(xDifference) / mainSlidesContainerRef.current.clientWidth;

    for (let i = 0; i < transitions.length; i++) {
      const tr = transitions[i];
      slidesData[outputSlides.previousSlide].reference.current.style[tr.property]
        = tr.surroundingStrings.join(tr.previous + transitionProgress * (xDifference < 0 ? 0 : tr.current - tr.previous));
      slidesData[outputSlides.currentSlide].reference.current.style[tr.property]
        = tr.surroundingStrings.join(tr.current + transitionProgress * ((xDifference < 0 ? tr.previous : tr.next) - tr.current));
      slidesData[outputSlides.nextSlide].reference.current.style[tr.property]
        = tr.surroundingStrings.join(tr.next + transitionProgress * (xDifference < 0 ? tr.current - tr.next : 0));
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

    setTransitions();

    const xDifference = interactionEnd - interactionStart;
    if (Math.abs(xDifference) < clickThreashold) {
      toggleDetails();
    } else if (Math.abs(xDifference) > mainSlidesContainerRef.current.clientWidth * swipeThreshold) {
      updateOutputSlides(xDifference);
    } else {
      for (let i = 0; i < transitions.length; i++) {
        const tr = transitions[i];
        slidesData[outputSlides.previousSlide].reference.current.style[tr.property] = tr.surroundingStrings.join(tr.previous);
        slidesData[outputSlides.currentSlide].reference.current.style[tr.property] = tr.surroundingStrings.join(tr.current);
        slidesData[outputSlides.nextSlide].reference.current.style[tr.property] = tr.surroundingStrings.join(tr.next);
      }
    }
    if (touchEventInvokedRef.current) touchEventInvokedRef.current = false;
  }

  const setTransitions = () => {
    const transitionProperty = transitions.map(transition => `${transition.property} 200ms ease-in-out`).join(',');
    slidesData[outputSlides.previousSlide].reference.current.style.transition = transitionProperty;
    slidesData[outputSlides.currentSlide].reference.current.style.transition = transitionProperty;
    slidesData[outputSlides.nextSlide].reference.current.style.transition = transitionProperty;
  }

  const updateOutputSlides = (xDifference) => {
    if (xDifference < 0) {
      setOutputSlides(
        {
          previousSlide: outputSlides.currentSlide,
          currentSlide: outputSlides.nextSlide,
          nextSlide: (outputSlides.nextSlide + 1) % slidesData.length
        }
      );
    } else {
      setOutputSlides(
        {
          previousSlide: (outputSlides.previousSlide - 1 + slidesData.length) % slidesData.length,
          currentSlide: outputSlides.previousSlide,
          nextSlide: outputSlides.currentSlide
        }
      );
    }
  }

  return (
    <div
      className="MainSlidesContainer"
      ref={mainSlidesContainerRef}
    >
      <SlideContainer
        key={slidesData.length === 2 ? slidesData.length : outputSlides.previousSlide}
        slideData={slidesData[outputSlides.previousSlide]}
        state={"previous"}
        transitions={transitions}
        handleInteractionStart={handleInteractionStart}
        backgroundColor={slideBackgroundColor}
      />
      <SlideContainer
        key={outputSlides.currentSlide}
        slideData={slidesData[outputSlides.currentSlide]}
        state={"current"}
        transitions={transitions}
        handleInteractionStart={handleInteractionStart}
        backgroundColor={slideBackgroundColor}
      />
      <SlideContainer
        key={outputSlides.nextSlide}
        slideData={slidesData[outputSlides.nextSlide]}
        state={"next"}
        transitions={transitions}
        handleInteractionStart={handleInteractionStart}
        backgroundColor={slideBackgroundColor}
      />
      <NavigationButton
        direction={1}
        setTransitions={setTransitions}
        updateOutputSlides={updateOutputSlides}
        visible={navigationVisible}
        fade={navigationFade}
      />
      <NavigationButton
        direction={-1}
        setTransitions={setTransitions}
        updateOutputSlides={updateOutputSlides}
        visible={navigationVisible}
        fade={navigationFade}
      />
    </div>
  )
}

export default MainSlidesContainer