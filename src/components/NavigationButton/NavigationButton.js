import React from "react"
import "./NavigationButton.css"

const NavigationButton = ({direction, onInteractionStart, visible, fade}) => {
  const RIGHT = -1;
  const LEFT = 1;
  const style = {opacity: fade ? 0 : 1};
  if (!visible) style.display = "none";

  return (
    <div
      onTouchStart={onInteractionStart}
      onMouseDown={onInteractionStart}
      className={`NavigationButton ${direction === RIGHT? "right" : "left"}`}
      style={style}
    >
      {direction === LEFT ? '<' : '>'}
    </div>
  )
}

export default NavigationButton;