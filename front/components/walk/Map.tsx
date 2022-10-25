import Image from "next/image";

import gps from "../../public/icons/gps.svg";
import styles from "./Map.module.scss";

const Map = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.curLocation}>
        <Image src={gps} alt="gps" />
      </div>
    </div>
  );
};

export default Map;
