/* eslint-disable jsx-a11y/no-static-element-interactions */
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
import { useSelector } from "react-redux";
import styles from "./DogProfile.module.scss";
import addImg from "../../public/icons/addImg.svg";
import { RootState } from "../../redux/store";
import Loading from "../../public/images/Spinner.gif";
// import getDogList from "../../pages/api/dog/getDogList";
// import SimpleSlider from "./Carousel";
import copy from "../../public/icons/copy.svg";

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
  const isDogProfile = useSelector(
    (state: RootState) => state.calendar.isDogProfile
  );

  useEffect(() => {
    const Token = window.localStorage.getItem("AccessToken");
    axios({
      url: "https://dog-hoogam.site/api/business-service/dog",
      method: "get",
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then((res) => {
        if (res.status === 200) {
          setMyDogs(res.data);
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isDogProfile]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // eslint-disable-next-line no-alert
      alert("트랜잭션 주소가 복사 되었습니다.");
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div>
      {myDogs ? (
        <Slider {...settings}>
          {myDogs.map((dog) => {
            return (
              <div key={v4()} className={`${styles.dogProfileBox}`}>
                <div className={`${styles.profileBox} flex`}>
                  <div className={`${styles.imgBox}`}>
                    {/* <div className={`${styles.dogImg}`}> */}
                    <img
                      className={`${styles.dogImg}`}
                      src={dog.dogImg}
                      alt="#"
                    />
                  </div>
                  <div
                    className={`${styles.dogNameBox} flex justify-center align-center notoMid`}
                  >
                    {dog.dogName}
                  </div>
                  <div className="flex align-center">
                    <div
                      className={`${styles.copyBtn} fs-10`}
                      onClick={() => handleCopyClipBoard(dog.transactionHash)}
                    >
                      <Image src={copy} alt="copy" />
                    </div>
                  </div>
                </div>
                <div className={`${styles.dogInfoBox}`}>
                  <p className={`${styles.dogInfo} notoReg fs-16`}>
                    견종 : {dog.dogBreed}
                  </p>
                  <p className={`${styles.dogInfo} notoReg fs-16`}>
                    생년월일 : {dog.birthday}
                  </p>
                  <p className={`${styles.dogInfo} notoReg fs-16`}>
                    성격 : {dog.dogCharacter}
                  </p>
                  <p className={`${styles.dogInfo} flex notoReg fs-16`}>
                    <div className={styles.dogInfo__label}>신분증 주소 : </div>
                    <div className={styles.dogInfo__content}>
                      {`${dog.transactionHash.slice(0, 20)}...`}
                    </div>
                  </p>
                </div>
              </div>
            );
          })}
          {isDogProfile ? (
            <div className={`${styles.dogProfileBox}`}>
              <div className={`${styles.addDogBtn}`}>
                <Image src={Loading} />
              </div>
              <p className={`${styles.addDogBtnText}`}>
                현재 신분증이 등록중입니다!
              </p>
            </div>
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
        </Slider>
      ) : null}
    </div>
  );
}

export default DogProfile;
