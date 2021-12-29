import React from "react";
import { Carousel } from "react-bootstrap";

export class Content extends React.Component {
  render() {
    return (
      <div>

        {/*SlideShow*/}
        <Carousel variant="dark">
          <Carousel.Item>
            <a href="https://www.gamestop.ie/digital-store">
              <img
                className="d-block w-100"
                src="gamestop.gif"
                alt="First slide"
                width="400"
              /></a>
            <Carousel.Caption>
              <h1>Welcome to GameStop</h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <a href="https://www.ea.com/">
              <img
                className="d-block w-100"
                src="bf.gif"
                alt="Second slide"
                width="400"
              /></a>
            <Carousel.Caption>
            <h1 class = "text-warning">Welcome to Electronic Arts</h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <a href="https://www.xbox.com/en-US/">
              <img
                className="d-block w-100"
                src="xbox.gif"
                alt="Third slide"
                width="400"
              /></a>
            <Carousel.Caption>
             <h1 class = "text-danger">Welcome to XBOX</h1>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        
      </div>
    );
  }
}
