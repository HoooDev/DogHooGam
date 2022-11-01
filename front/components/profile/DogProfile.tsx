import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from "react";
import { v4 } from "uuid";
import Image from "next/image";
import Link from "next/link";
import defaultDog from "../../public/icons/defaultDog.svg";
import styles from "./DogProfile.module.scss";
import addImg2 from "../../public/icons/addImg2.svg";

// import SimpleSlider from "./Carousel";

function DogProfile() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const Dogs = [
    {
      name: "뭉크",
      species: "진돗개",
      gender: "남",
      age: 8,
      birth: "2016년 4월 3일",
      character: "온순"
    },
    {
      name: "동띵이",
      gender: "여",
      species: "치와와",
      age: 26,
      birth: "1997년 4월 8일",
      character: "말이 많고 귀여움"
    },
    {
      name: "햄솜",
      gender: "남",
      age: 27,
      species: "시고르자브종",
      birth: "1996년 12월 25일",
      character: "말이 별로 업쑴"
    }
  ];
  return (
    <div>
      <Slider {...settings}>
        {Dogs.map((dog) => {
          return (
            <div key={v4()} className={`${styles.dogProfileBox}`}>
              <div className={`${styles.profileBox}`}>
                <div className={`${styles.imgBox}`}>
                  <div className={`${styles.dogImg}`}>
                    <Image src={defaultDog} />
                  </div>
                </div>
                <div className={`${styles.dogNameBox}`}>
                  {dog.name} ({dog.species}, {dog.age}세)
                </div>
              </div>
              <div className={`${styles.dogInfoBox}`}>
                <p className={`${styles.dogInfo}`}>성별 : {dog.gender}</p>
                <p className={`${styles.dogInfo}`}>생년월일 : {dog.birth}</p>
                <p className={`${styles.dogInfo}`}>성격 : {dog.character}</p>
              </div>
            </div>
          );
        })}
        <div className={`${styles.dogProfileBox}`}>
          <Link href="/profile/plusdog">
            <div className={`${styles.addDogBtn}`}>
              <Image src={addImg2} />
            </div>
          </Link>
          <p className={`${styles.addDogBtnText}`}>
            NFT 신분증을 등록 해보세요!
          </p>
        </div>
      </Slider>
    </div>
  );
}

export default DogProfile;
