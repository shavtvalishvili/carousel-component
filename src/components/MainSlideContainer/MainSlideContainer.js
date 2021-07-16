import React from "react"
import "./MainSlideContainer.css"
import * as utils from "../../utilities/functions"

const MainSlideContainer = ({
  slideData,
  state,
  transitions,
  handleInteractionStart,
  backgroundColor,
  reference
}) => {
  const style = {backgroundColor: backgroundColor};
  for (let i = 0; i < transitions.length; i++) {
    const tr = transitions[i];
    style[tr.property] = utils.joinWithDelimiters(tr.surroundingStrings, tr[state]);
  }
  style.zIndex = state === "current" ? 1 : 0;
  
  return (
    <div
      className="MainSlideContainer"
      style={style}
      onMouseDown={state === "current" ? handleInteractionStart : null}
      onTouchStart={state === "current" ? handleInteractionStart : null}
      ref={reference}
    >
      {slideData.reactElement}
    </div>
  )
}

export default MainSlideContainer