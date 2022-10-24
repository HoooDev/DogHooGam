import { NextPage } from "next";

import Map from "../../components/walk/Map";
import Sign from "../../components/walk/Sign";
import styles from "./index.module.scss";

const index: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <Map />
      <Sign />
    </div>
  );
};

export default index;
