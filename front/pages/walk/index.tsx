import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

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
  getMyDogs,
  setMyDogs
} from "../../redux/slice/walkSlice";
import DogSelectCard from "../../components/walk/DogSelectCard";

const Index: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isWalkingStarted, myDogs, paths, totalDist } = useSelector(
    (state: RootState) => state.walk
  );
  useEffect(() => {
    getMyDogs()
      .then((res) => {
        dispatch(setMyDogs(res));
      })
      .catch(() => console.error);
  }, []);

  useEffect(() => {
    return () => {
      finishWalkingApi({
        coin: 0,
        distance: parseFloat(totalDist),
        walkPath: paths
      });
      dispatch(finishWalking());
      dispatch(restartWalking());
      dispatch(resetWalking());
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {isWalkingStarted ? <KakaoMap /> : <div className={styles.hidden} />}
      <div className={styles.container}>
        {!isWalkingStarted && (
          <div className={`${styles.dogSelectedCards} flex justify-center`}>
            {myDogs?.map((dog) => (
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
