/* eslint-disable @next/next/no-img-element */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
// import defaultDog from "../../public/icons/defaultDog.svg";
import styles from "./DogProfile.module.scss";
import addImg from "../../public/icons/addImg.svg";
// import getDogList from "../../pages/api/dog/getDogList";
// import SimpleSlider from "./Carousel";

interface dogType {
  pk: number;
  transactionHash: string;
  dogImg: string;
  dogName: string;
  birthday: string;
  dogBreed: string;
  dogCharacter: string;
  hide: boolean;
}

function DogProfile() {
  const [myDogs, setMyDogs] = useState<dogType[]>([]);

  useEffect(() => {
    const Token = window.localStorage.getItem("AccessToken");
    axios({
      url: "https://dog-hoogam.site:8000/api/dog",
      method: "get",
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setMyDogs(res.data);
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  // const Dogs = [
  //   {
  //     name: "뭉크",
  //     species: "진돗개",
  //     gender: "남",
  //     age: 8,
  //     birth: "2016년 4월 3일",
  //     character: "온순"
  //   },
  //   {
  //     name: "동띵이",
  //     gender: "여",
  //     species: "치와와",
  //     age: 26,
  //     birth: "1997년 4월 8일",
  //     character: "말이 많고 귀여움"
  //   },
  //   {
  //     name: "햄솜",
  //     gender: "남",
  //     age: 27,
  //     species: "시고르자브종",
  //     birth: "1996년 12월 25일",
  //     character: "말이 별로 업쑴"
  //   }
  // ];
  return (
    <div>
      {myDogs ? (
        <Slider {...settings}>
          {myDogs.map((dog) => {
            return (
              <div key={v4()} className={`${styles.dogProfileBox}`}>
                <div className={`${styles.profileBox}`}>
                  <div className={`${styles.imgBox}`}>
                    {/* <div className={`${styles.dogImg}`}> */}
                    <img
                      className={`${styles.dogImg}`}
                      src={dog.dogImg}
                      alt="#"
                    />
                    {/* </div> */}
                  </div>
                  <div className={`${styles.dogNameBox}`}>{dog.dogName}</div>
                </div>
                <div className={`${styles.dogInfoBox}`}>
                  <p className={`${styles.dogInfo}`}>견종 : {dog.dogBreed}</p>
                  <p className={`${styles.dogInfo}`}>
                    생년월일 : {dog.birthday}
                  </p>
                  <p className={`${styles.dogInfo}`}>
                    성격 : {dog.dogCharacter}
                  </p>
                </div>
              </div>
            );
          })}
          <div className={`${styles.dogProfileBox}`}>
            <Link href="/profile/plusdog">
              <div className={`${styles.addDogBtn}`}>
                <Image src={addImg} />
              </div>
            </Link>
            <p className={`${styles.addDogBtnText}`}>
              NFT 신분증을 등록 해보세요!
            </p>
          </div>
        </Slider>
      ) : (
        <div className={`${styles.dogProfileBox}`}>
          <Link href="/profile/plusdog">
            <div className={`${styles.addDogBtn}`}>
              <Image src={addImg} />
            </div>
          </Link>
          <p className={`${styles.addDogBtnText}`}>
            NFT 신분증을 등록 해보세요!
          </p>
        </div>
      )}
    </div>
  );
}

export default DogProfile;
