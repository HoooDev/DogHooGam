import { NextPage } from "next";
import { useSelector } from "react-redux";

import Map from "../../components/walk/KakaoMap";
import BeforeSign from "../../components/walk/BeforeSign";
import AfterSign from "../../components/walk/AfterSign";
import styles from "./index.module.scss";
import type { RootState } from "../../redux/store/index";

const Index: NextPage = () => {
  const { isWalkingStarted } = useSelector((state: RootState) => state.walk);
  return (
    <div className={styles.wrapper}>
      <Map />
      {!isWalkingStarted ? <BeforeSign /> : <AfterSign />}
    </div>
  );
};

export default Index;
