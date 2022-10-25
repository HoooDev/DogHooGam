import styles from "./AfterSign.module.scss";

const AfterSign = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.icons}`}>
        <div className={`${styles.distance} flex column align-center`}>
          <div className={`${styles.distance__num} fs-20`}>0.0</div>
          <div className={`${styles.distance__unit} fs-12`}>거리(km)</div>
        </div>
        <div className={`${styles.coin} flex column align-center`}>
          <div className={`${styles.coin__num} fs-20`}>0</div>
          <div className={`${styles.coin__unit} fs-12`}>coin</div>
        </div>
        <div className={`${styles.time} flex column align-center`}>
          <div className={`${styles.time__num} fs-20`}>00:00</div>
          <div className={`${styles.time__unit} fs-12`}>시간:분</div>
        </div>
      </div>
      <div className={`${styles.controller} flex justify-center`}>
        <div className={`${styles.controller__content} fs-16`}>
          일지정지 정지
        </div>
      </div>
    </div>
  );
};

export default AfterSign;
