import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { useRouter } from "next/router.js";
import KakaoMap from "../../components/walk/KakaoMap.js";
import BeforeSign from "../../components/walk/BeforeSign";
import AfterSign from "../../components/walk/AfterSign";
import styles from "./index.module.scss";
import type { AppDispatch, RootState } from "../../redux/store/index";
import {
  finishWalking,
  finishWalkingApi,
  getMyDogs,
  setMyDogs,
  setIsCoinLoading
} from "../../redux/slice/walkSlice";
import DogSelectCard from "../../components/walk/DogSelectCard";
import DogImage from "../../components/walk/DogImage";
import { sendToken } from "../api/web3/Web3.js";

const Index: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isWalkingStarted, myDogs, coin } = useSelector(
    (state: RootState) => state.walk
  );
  const {
    userInfo
  }: {
    userInfo: any;
  } = useSelector((state: RootState) => state.user);

  const router = useRouter();
  useEffect(() => {
    if (userInfo.userWalletAddress == null) {
      alert("먼저 지갑을 생성 해주세요!");
      router.push("/profile");
    }
  }, []);
  const publishToken = async () => {
    try {
      if (userInfo?.userWalletAddress) {
        // await sendToken(userInfo.userWalletAddress, 100);
        await sendToken(userInfo.userWalletAddress, coin);
        dispatch(setIsCoinLoading(false));
        // console.log("INK 적립 성공했습니다.");
        alert("INK 적립 성공했습니다.");
      }
    } catch (error) {
      console.error(error);
      dispatch(setIsCoinLoading(false));
      alert("INK 적립 실패했습니다.");
    }
  };

  useEffect(() => {
    dispatch(finishWalking());
    getMyDogs()
      .then((res) => {
        dispatch(setMyDogs(res));
      })
      .catch(() => console.error);
    return () => {
      if (isWalkingStarted) {
        dispatch(finishWalkingApi())
          .unwrap()
          .then(() => {
            dispatch(setIsCoinLoading(true));
            publishToken();
          })
          .catch(() => console.error);
      }
    };
  }, [userInfo]);

  return (
    <div className={`${styles.wrapper}`}>
      {isWalkingStarted ? <KakaoMap /> : <DogImage />}
      <div className={styles.container}>
        {!isWalkingStarted && (
          <div className={`${styles.dogSelectedCards} flex justify-center `}>
            {myDogs.length > 0 &&
              myDogs.map((dog) => (
                <DogSelectCard key={dog.pk} id={dog.pk} name={dog.dogName} />
              ))}
          </div>
        )}
        {!isWalkingStarted ? <BeforeSign /> : <AfterSign />}
      </div>
    </div>
  );
};

export default Index;
