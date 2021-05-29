import React from "react"
import "./SlidesContainer.css"
import SlideContainer from "../SlideContainer/SlideContainer"

const SlidesContainer = ({slides}) => {
  return (
    <div className="SlidesContainer">
      {
        slides.filter(slide => slide.className).map(slide => (
          <SlideContainer key={slide.id} className={slide.className} html={slide.html}/>
        ))
      }
    </div>
  )
}

export default SlidesContainer