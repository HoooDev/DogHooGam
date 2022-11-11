/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import doctor from "../../public/images/doctor.svg";
import reason from "../../public/images/reason.svg";
import drug from "../../public/images/drug.svg";

import styles from "./ResultSlider.module.scss";

const settings = {
  dots: false,
  infinite: false,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1
};

const ResultSlider = ({ p1, p2, p3 }) => {
  return (
    <div className={styles.wrapper}>
      <Slider {...settings}>
        <div className={`${styles.item}`}>
          <div className={`${styles.card}`}>
            <div className={`${styles.img}`}>
              <Image src={doctor} alt="#" />
            </div>
            {/* <hr /> */}
            <h1 className={`${styles.title} fs-18`}>설명</h1>
            <h1 className={`${styles.content}`}>{p1}</h1>
          </div>
        </div>
        <div className={`${styles.item}`}>
          <div className={`${styles.card}`}>
            <div className={`${styles.img}`}>
              <Image src={reason} alt="#" />
            </div>
            {/* <hr /> */}
            <h1 className={`${styles.title} fs-18`}>증상</h1>
            <h1 className={`${styles.content}`}>{p2}</h1>
          </div>
        </div>
        <div className={`${styles.item}`}>
          <div className={`${styles.card}`}>
            <div className={`${styles.img}`}>
              <Image src={drug} alt="#" />
            </div>
            {/* <hr /> */}
            <h1 className={`${styles.title} fs-18`}>예방</h1>
            <h1 className={`${styles.content}`}>{p3}</h1>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default ResultSlider;
