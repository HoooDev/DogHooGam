import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { Component } from "react";
import styles from "./DogProfile.module.scss";

// eslint-disable-next-line react/prefer-stateless-function
export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <div className={`${styles.dogProfileBox}`}>1</div>
          </div>
          <div>
            <div className={`${styles.dogProfileBox}`}>1</div>
          </div>
          <div>
            <div className={`${styles.dogProfileBox}`}>1</div>
          </div>
          <div>
            <div className={`${styles.dogProfileBox}`}>1</div>
          </div>
        </Slider>
      </div>
    );
  }
}
