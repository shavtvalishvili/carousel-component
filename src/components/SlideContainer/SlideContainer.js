import React from "react"
import "./SlideContainer.css"

const SlideContainer = ({className, html}) => {
  return (
    <div className={"SlideContainer " + className}>
      {html}
    </div>
  )
}

export default SlideContainer