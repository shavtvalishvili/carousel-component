import React from "react"
import { useEffect } from "react"
import "./SlideContainer.css"

const SlideContainer = ({
  slideData,
  state,
  transitions,
  handleInteractionStart,
  backgroundColor,
  reference
}) => {
  useEffect(() => {
    const style = {};
    for (let i = 0; i < transitions.length; i++) {
      const tr = transitions[i];
      style[tr.property] = tr.surroundingStrings.join(tr[state]);
    }
    style.zIndex = state === "current" ? 1 : 0;
    Object.assign(reference.current.style, style);
  }, [state]);
  
  return (
    <div
      className={"SlideContainer"}
      style={{backgroundColor: backgroundColor}}
      onMouseDown={state === "current" ? handleInteractionStart : null}
      onTouchStart={state === "current" ? handleInteractionStart : null}
      ref={reference}
    >
      {slideData.reactElement}
    </div>
  )
}

export default SlideContainer