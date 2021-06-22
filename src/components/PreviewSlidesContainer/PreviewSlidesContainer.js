import React from "react"
import { forwardRef } from "react"
import "./PreviewSlidesContainer.css"

const PreviewSlidesContainer = ({
  previewSlideElements,
  visible,
  fade,
  currentSlideIdx,
  numberOfSlides,
  heightPct
}) => {
  const style = { height: `${heightPct}%`, opacity: fade ? 0 : 1};
  if (!visible) style.display = "none";
  return (
    <div
      className="PreviewSlidesContainer"
      style={style}
    >

    </div>
  )
}

export default PreviewSlidesContainer;