/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";

import styles from "./WalkSlider.module.scss";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

// {
//   "pk": 1,
//   "transactionHash": "0xb879bdb72e66901c18c82a8fb209e48abf565289f41fdf67117ca95d84be2cb7",
//   "dogImg": "https://gateway.pinata.cloud/ipfs/QmVXpBrf6KzaaAahw1ZRsrFfX9dqetXpd64oZaoVTm6Qj9",
//   "dogName": "동땡이",
//   "birthday": "2022-11-24",
//   "dogBreed": "포메라니안",
//   "dogCharacter": "착해요~",
//   "hide": false
// }

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
