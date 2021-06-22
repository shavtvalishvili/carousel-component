import React from "react"
import "./SlideContainer.css"

const SlideContainer = ({
  slideData,
  state,
  transitions,
  handleInteractionStart,
  backgroundColor
}) => {
  const style = {backgroundColor: backgroundColor};
  for (let i = 0; i < transitions.length; i++) {
    const tr = transitions[i];
    style[tr.property] = tr.surroundingStrings.join(tr[state]);
  }
  style.zIndex = state === "current" ? 1 : 0;
  
  return (
    <div
      value={slideData.id}
      className={"SlideContainer"}
      style={style}
      onMouseDown={state === "current" ? handleInteractionStart : null}
      onTouchStart={state === "current" ? handleInteractionStart : null}
      ref={slideData.reference}
    >
      {slideData.reactElement}
    </div>
  )
}

export default SlideContainer