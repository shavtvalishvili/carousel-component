import React from "react";
import "./App.css"
import Carousel from "./components/Carousel/Carousel"
import CarouselContent from "./components/CarouselContent/CarouselContent"

const App = () => {
  const carouselContent = <CarouselContent>
    <img src="https://images.pexels.com/photos/6293900/pexels-photo-6293900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>
    <div>1</div>
    <div>2</div>
    <img src="https://images.pexels.com/photos/7175583/pexels-photo-7175583.jpeg?cs=srgb&dl=pexels-marta-dzedyshko-7175583.jpg&fm=jpg"></img>
  </CarouselContent>

  return (
    <div className="App">
      <Carousel content={carouselContent.props.children}/>
    </div>
  );
}

export default App;