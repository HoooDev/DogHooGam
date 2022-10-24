import { NextPage } from "next";

import styles from "./index.module.scss";

const index: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      {/* <div className={`${styles.coin} flex notoMid`}>
        <div className={styles.coin__content}>300</div>&nbsp;
        <div className={styles.coin__unit}>coin</div>
      </div> */}
      <div className={styles.map}>지도</div>
      <div className={`${styles.controller}`}>
        <div className={`${styles.icons}`}>
          <div className={`${styles.distance} flex column align-center`}>
            <div className={`${styles.distance__num} fs-20`}>0.0</div>
            <div className={styles.distance__unit}>거리(km)</div>
          </div>
          <div className={`${styles.coin} flex column align-center`}>
            <div className={`${styles.coin__num} fs-20`}>100</div>
            <div className={styles.coin__unit}>coin</div>
          </div>
          <div className={`${styles.time} flex column align-center`}>
            <div className={`${styles.time__num} fs-20`}>01:00</div>
            <div className={styles.time__unit}>시간:분</div>
          </div>
        </div>
        <div className={`${styles.startBtn} flex justify-center`}>
          <button
            className={`${styles.startBtn__content} notoMid fs-16`}
            type="button"
          >
            산책하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
