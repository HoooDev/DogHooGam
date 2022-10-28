import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import KakaoMap from "../../components/walk/KakaoMap";
import BeforeSign from "../../components/walk/BeforeSign";
import AfterSign from "../../components/walk/AfterSign";
import styles from "./index.module.scss";
import type { AppDispatch, RootState } from "../../redux/store/index";
import { stopWalking } from "../../redux/slice/walkSlice";

const Index: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isWalkingStarted } = useSelector((state: RootState) => state.walk);

  useEffect(() => {
    return () => {
      dispatch(stopWalking());
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {isWalkingStarted ? <KakaoMap /> : <div className={styles.hidden} />}
      {!isWalkingStarted ? <BeforeSign /> : <AfterSign />}
    </div>
  );
};

export default Index;
