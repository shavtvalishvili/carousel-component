# Carousel Component
A React application with a web carousel component. This project represents a demonstration of the carousel component and an easy example of its creation.

## Requirements:
* Node.js
  * Download and install from: https://nodejs.org/en/
  * Run the following command from the project root directory:
    ```bash
    npm install
    ```

## Features:
  * Navigation with buttons, mouse or touch swipes and slide selection from preview slides
  * Click to show/hide preview slides and navigation buttons
  * Infinite loop swiping
  * Responsive wih user adjustable dimensions
  * Any html content support in slides
  * Multiple predefined slide change transitions

## Creation:
User shall pass props to carousel component for defining content and further customizing the carousel
  * ### Imports
    Initially user would need to import necessary code:
    ```JSX
    import Carousel from "./components/Carousel/Carousel"
    import CarouselContent from "./components/CarouselContent/CarouselContent"
    import * as Transitions from "./utilities/transitions";
    ...
    ```
  * ### Passing content
    Content passing to carousel can be done with the help of CarouselContent component.  
    You declare CarouselContent component by passing the desired jsx elements as given in the example below:
      ```JSX
      const mainContent = <CarouselContent>
        ...
        <img className="mainContent" src="/assets/clouds5.jpg"></img>
        <img className="mainContent" src="/assets/clouds6.jpg"></img>
        <video className="mainContent" autoPlay>
          <source src="/assets/clouds7.mp4" type="video/mp4"/>
        </video>
        ...
      </CarouselContent>
      ```
      These elements can then be transformed into carousel content by passing the props children  
      of the CarouselContent component to the Carousel itself as given in the example below:
      ```JSX
      <Carousel
        mainSlideElements={mainContent.props.children}
        previewSlideElements={previewContent.props.children}
        ...
      />
      ```
      Carousel content can be easily styled by giving jsx elements a classname and later defining  
      the corresponding css class in CarouselContent.css file, like this:
      ```CSS
      .mainContent {
        max-height: 100%;
        max-width: 100%;
      }
      ```
  * ### Customizing dimensions and color
    Carousel can be further customized by controling its dimensions and colors as given in the example below:
    ```JSX
    <Carousel
      ...
      width={"450px"}
      height={"600px"}
      slideBackgroundColor={"white"}
      carouselBackgroundColor={"rgb(240, 240, 240)"}  // rgb(240, 240, 240) by default
      previewSlidesHeightPct={12} // 12 by default
      ...
    />
    ```
    It's important to notice that providing every property is mandatory except carouselBackgroundColor  
    and previewSlidesHeightPct, their default values are "rgb(240, 240, 240)" and 12 respectively.  
    Additionally, every dimension and color specifying property should be given in the form of a string  
    representing CSS value except previewSlidesHeightPct, which should be provided as a plain number  
    representing percentage of the carousel component height.
  * ### Providing transitions
    User shall also provide carousel with a desired transition animation. Project comes with a number of  
    predefined transition animations, which can be seen in src/utilities/transitions.js. User can either  
    choose from the existing transitions or define its own in the corresponding file. Example:
    ```JSX
    <Carousel
      ...
      transitions={Transitions.cinematicTransition}
    />
    ```
  * See a full example of carousel component creation in the source code.

## How to run:
* To build the project run this command from the root directory:
  ```bash
  npm run build
  ```

* To start the web application run this command from the project root directory:
  ```bash
  npm start
  ```
  By default the app runs on `localhost:8080`