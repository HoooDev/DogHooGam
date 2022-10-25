import { NextPage } from "next";

import Map from "../../components/walk/Map";
import BeforeSign from "../../components/walk/BeforeSign";
import AfterSign from "../../components/walk/AfterSign";
import styles from "./index.module.scss";

const index: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <Map />
      {/* <BeforeSign /> */}
      <AfterSign />
    </div>
  );
};

export default index;
