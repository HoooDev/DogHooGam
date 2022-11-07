import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import KakaoMap from "../../components/walk/KakaoMap.js";
import BeforeSign from "../../components/walk/BeforeSign";
import AfterSign from "../../components/walk/AfterSign";
import styles from "./index.module.scss";
import type { AppDispatch, RootState } from "../../redux/store/index";
import {
  finishWalking,
  restartWalking,
  resetWalking,
  finishWalkingApi,
  getMyDogs
} from "../../redux/slice/walkSlice";
import DogSelectCard from "../../components/walk/DogSelectCard";

interface Dog {
  birthday: string;
  dogBreed: string;
  dogCharacter: string;
  dogImg: string;
  dogName: string;
  hide: boolean;
  pk: number;
  transactionHash: string;
}

const Index: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isWalkingStarted, personId, paths } = useSelector(
    (state: RootState) => state.walk
  );
  const [myDogs, setMyDogs] = useState<Dog[]>([]);

  useEffect(() => {
    getMyDogs()
      .then((res) => {
        setMyDogs(res);
      })
      .catch(() => console.error);
  }, []);

  useEffect(() => {
    return () => {
      if (personId) {
        finishWalkingApi({
          coin: 0,
          distance: 0,
          personId,
          walkPath: paths
        });
        dispatch(finishWalking());
        dispatch(restartWalking());
        dispatch(resetWalking());
      }
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {isWalkingStarted ? <KakaoMap /> : <div className={styles.hidden} />}
      <div className={styles.container}>
        {!isWalkingStarted && (
          <div className={`${styles.dogSelectedCards} flex justify-center`}>
            {myDogs.map((dog) => (
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
