import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import KakaoMap from "../../components/walk/KakaoMap";
import BeforeSign from "../../components/walk/BeforeSign";
import AfterSign from "../../components/walk/AfterSign";
import styles from "./index.module.scss";
import type { AppDispatch, RootState } from "../../redux/store/index";
import { stopWalking, clearSelectedDogs } from "../../redux/slice/walkSlice";
import DogSelectCard from "../../components/walk/DogSelectCard";

const dogs = [
  { id: 1, name: "뭉크1" },
  { id: 2, name: "뭉크2" },
  { id: 3, name: "뭉크3" }
];

const Index: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isWalkingStarted } = useSelector((state: RootState) => state.walk);

  useEffect(() => {
    return () => {
      dispatch(stopWalking());
      dispatch(clearSelectedDogs());
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {isWalkingStarted ? <KakaoMap /> : <div className={styles.hidden} />}
      {!isWalkingStarted && (
        <div className="flex justify-center">
          {dogs.map((dog) => (
            <DogSelectCard key={dog.id} id={dog.id} name={dog.name} />
          ))}
        </div>
      )}
      {!isWalkingStarted ? <BeforeSign /> : <AfterSign />}
    </div>
  );
};

export default Index;
