import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { Component } from "react";
import styles from "./Todo.module.scss"; // 투두 css
import styles2 from "./WalkRecord.module.scss"; // 산책기록 css

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
    // const [Tab, setTab] = useState(1);
    // function changeTab(e: number): void {
    //   // console.log(e.target.innerText);
    //   setTab(e.target.innerText);
    // }
    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <div className={`${styles.wrapper}`}>1</div>
          </div>
          <div
            aria-hidden="true"
            onClick={() => {
              settings.slidesToShow = 2;
            }}
          >
            <div className={`${styles2.wrapper}`}>2</div>
          </div>
        </Slider>
      </div>
    );
  }
}
