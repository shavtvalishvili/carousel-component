import React from "react"
import "./NavigationButton.css"
import * as K from "../../utilities/constants"

const NavigationButton = ({direction, onInteractionStart, visible, fade}) => {
  const style = {opacity: fade ? 0 : 1};
  if (!visible) style.display = "none";

  return (
    <div
      onTouchStart={onInteractionStart}
      onMouseDown={onInteractionStart}
      className={`NavigationButton ${direction === K.RIGHT? "right" : "left"}`}
      style={style}
    >
      {direction === K.LEFT ? '<' : '>'}
    </div>
  )
}

export default NavigationButton;