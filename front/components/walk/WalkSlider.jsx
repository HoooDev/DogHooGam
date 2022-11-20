/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./WalkSlider.module.scss";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const WalkSlider = ({ dogs }) => {
  return (
    <div className={styles.wrapper}>
      <Slider {...settings}>
        {dogs?.map((dog) => (
          <div key={dog.pk} className={`${styles.dogCard} notoMid`}>
            <img
              className={`${styles.dogCard__img}`}
              src={dog.dogImg}
              alt={dog.dogName}
            />
            <div className={styles.dogCard__name}>이름 : {dog.dogName}</div>
            <div className={styles.dogCard__breed}>견종 : {dog.dogBreed}</div>
            <div className={styles.dogCard__char}>
              성격 : {dog.dogCharacter}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WalkSlider;
