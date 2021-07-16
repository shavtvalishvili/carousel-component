import React from "react"
import "./PreviewSlideContainer.css"
import * as K from "../../utilities/constants"

const PreviewSlideContainer = ({slideData, width, selectedSlide, handleSlideClick}) => {
  return (
    <div
      value={slideData.id}
      className={"PreviewSlideContainer"}
      style={{
        minWidth: width,
        maxWidth: width,
        padding: selectedSlide === slideData.id ? K.SELECTED_PREVIEW_SLIDE_PADDING
          : K.UNSELECTED_PREVIEW_SLIDE_PADDING,
        filter: selectedSlide === slideData.id ? K.SELECTED_PREVIEW_SLIDE_FILTER
          : K.UNSELECTED_PREVIEW_SLIDE_FILTER
      }}
      onClick={() => {handleSlideClick(slideData.id);}}
    > 
      {slideData.reactElement}
    </div>
  )
}

export default PreviewSlideContainer