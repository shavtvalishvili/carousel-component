import React from "react";
import * as Transitions from "./Transitions";
import "./App.css"
import Carousel from "./components/Carousel/Carousel"
import CarouselContent from "./components/CarouselContent/CarouselContent"

const App = () => {
  /**
   * USER PROPERTIES
   */

  const mainContent = <CarouselContent>
    <img src="/assets/pexels-marta-dzedyshko-7175583.jpg"></img>
    <img src="/assets/pexels-ave-calvar-martinez-4912397.jpg"></img>
    <div><h2>An Unordered HTML List</h2><ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul><h2>An Ordered HTML List</h2><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol> </div>
    <img src="assets/pexels-leon-huang-7494074.jpg"></img>
    <div>
      <h2>HTML Images</h2>
      <p>HTML images are defined with the img tag:</p>
      <img src="/assets/pexels-francesco-ungaro-5651648.jpg" alt="W3Schools.com"></img>
    </div>
    <img src="assets/pexels-mathias-pr-reding-5662218.jpg"></img>
    <video autoPlay>
      <source src="assets/pexels-vlada-karpovich-8045148.mp4" type="video/mp4"/>
    </video>
  </CarouselContent>

  const previewContent = <CarouselContent>
    <img src="/assets/pexels-marta-dzedyshko-7175583.jpg"></img>
    <img src="/assets/pexels-ave-calvar-martinez-4912397.jpg"></img>
    <div><h2>An Unordered HTML List</h2><ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul><h2>An Ordered HTML List</h2><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol> </div>
    <img src="assets/pexels-leon-huang-7494074.jpg"></img>
    <div>
      <h2>HTML Images</h2>
      <p>HTML images are defined with the img tag:</p>
      <img src="/assets/pexels-francesco-ungaro-5651648.jpg" alt="W3Schools.com"></img>
    </div>
    <img src="assets/pexels-mathias-pr-reding-5662218.jpg"></img>
    <video autoPlay>
      <source src="assets/pexels-vlada-karpovich-8045148.mp4" type="video/mp4"/>
    </video>
  </CarouselContent>

  const transitions = Transitions.defaultTransition;

  const previewSlidesHeightPct = 12;
  const carouselWidth = "450px";
  const carouselHeight = "600px";
  const slideBackgroundColor = "white";

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
      />
    </div>
  );
}

export default App;