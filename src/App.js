import React from "react";
import "./App.css"
import Carousel from "./components/Carousel/Carousel"
import CarouselContent from "./components/CarouselContent/CarouselContent"
import * as Transitions from "./utilities/transitions";

const App = () => {
  /**
   * USER PROPERTIES
   */

  const mainContent = <CarouselContent>
    <img className="mainContent" src="/assets/clouds1.jpg"></img>
    <img className="mainContent" src="/assets/clouds2.jpg"></img>
    <img className="mainContent" src="/assets/clouds3.jpg"></img>
    <img className="mainContent" src="/assets/clouds4.jpg"></img>
    <img className="mainContent" src="/assets/clouds5.jpg"></img>
    <img className="mainContent" src="/assets/clouds6.jpg"></img>
    <video className="mainContent" autoPlay>
      <source src="/assets/clouds7.mp4" type="video/mp4"/>
    </video>
    <img className="mainContent" src="/assets/clouds8.jpg"></img>
    <img className="mainContent" src="/assets/clouds9.jpg"></img>
  </CarouselContent>

  const previewContent = <CarouselContent>
    <img className="previewContent" src="/assets/clouds1.jpg"></img>
    <img className="previewContent" src="/assets/clouds2.jpg"></img>
    <img className="previewContent" src="/assets/clouds3.jpg"></img>
    <img className="previewContent" src="/assets/clouds4.jpg"></img>
    <img className="previewContent" src="/assets/clouds5.jpg"></img>
    <img className="previewContent" src="/assets/clouds6.jpg"></img>
    <img className="previewContent" src="/assets/clouds7_moment.jpg"></img>
    <img className="previewContent" src="/assets/clouds8.jpg"></img>
    <img className="previewContent" src="/assets/clouds9.jpg"></img>
  </CarouselContent>

  const carouselWidth = "450px";
  const carouselHeight = "600px";
  const slideBackgroundColor = "white";
  // const carouselBackgroundColor = "rgb(240, 240, 240)";
  // const previewSlidesHeightPct = 12;

  const transitions = Transitions.defaultTransition;

  /**
   * END OF USER PROPERTIES
   */

  return (
    <div
      className="App"
    >
      <Carousel
        mainSlideElements={mainContent.props.children}
        previewSlideElements={previewContent.props.children}
        width={carouselWidth}
        height={carouselHeight}
        slideBackgroundColor={slideBackgroundColor}
        transitions={transitions}
      />
    </div>
  );
}

export default App;