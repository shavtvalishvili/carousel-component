import React from "react";
import * as Transitions from "./transitions";
import "./App.css"
import Carousel from "./components/Carousel/Carousel"
import CarouselContent from "./components/CarouselContent/CarouselContent"

const App = () => {
  /**
   * USER PROPERTIES
   */

  const mainContent = <CarouselContent>
    <img src="/assets/clouds1.jpg"></img>
    <img src="/assets/clouds2.jpg"></img>
    <div>
      <h2>An Unordered HTML List</h2>
      <ul>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li>
      </ul>
      <h2>An Ordered HTML List</h2>
      <ol>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li>
      </ol>
    </div>
    <img src="/assets/clouds3.jpg"></img>
    <img src="/assets/clouds4.jpg"></img>
    <img src="/assets/clouds5.jpg"></img>
    <img src="/assets/clouds6.jpg"></img>
    <video autoPlay>
      <source src="/assets/clouds7.mp4" type="video/mp4"/>
    </video>
  </CarouselContent>

  const previewContent = <CarouselContent>
    <img src="/assets/clouds1.jpg"></img>
    <img src="/assets/clouds2.jpg"></img>
    <div>
      <h2>An Unordered HTML List</h2>
      <ul>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li>
      </ul>
      <h2>An Ordered HTML List</h2>
      <ol>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li>
      </ol>
    </div>
    <img src="/assets/clouds3.jpg"></img>
    <img src="/assets/clouds4.jpg"></img>
    <img src="/assets/clouds5.jpg"></img>
    <img src="/assets/clouds6.jpg"></img>
    <img src="/assets/clouds7_moment.jpg"></img>
  </CarouselContent>

  const transitions = Transitions.defaultTransition;

  const previewSlidesHeightPct = 12;
  const carouselWidth = "450px";
  const carouselHeight = "600px";
  const slideBackgroundColor = "white";
  // const carouselBackgroundColor = ""

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
        previewSlidesHeightPct={previewSlidesHeightPct}
        slideBackgroundColor={slideBackgroundColor}
        transitions={transitions}
        // carouselBackgroundColor={carouselBackgroundColor}  // rgb(240, 240, 240) by default
      />
    </div>
  );
}

export default App;