import React from "react"
import "./NavigationButton.css"

const NavigationButton = ({direction, setTransitions, updateOutputSlides, visible, fade}) => {
  const right = -1;
  const left = 1;
  const borderMargin = 5;
  const style = {opacity: fade ? 0 : 1};
  if (!visible) style.display = "none";
  if (direction === right) style.right = `${borderMargin}px`;
  else style.left = `${borderMargin}px`;

  return (
    <div
      onClick={() => {
        setTransitions()
        updateOutputSlides(direction)
      }}
      className="NavigationButton"
      style={style}
    >
      {direction === left ? '<' : '>'}
    </div>
  )
}

export default NavigationButton;