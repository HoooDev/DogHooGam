import styles from "./StartBtn.module.scss";

const StartBtn = () => {
  const onWalkStartClick = () => {};
  return (
    <div className={`${styles.wrapper} flex justify-center`}>
      <div
        className={`${styles.startBtn}`}
        onClick={onWalkStartClick}
        aria-hidden="true"
      >
        <div className={`${styles.startBtn__content} notoMid`}>산책하기</div>
      </div>
    </div>
  );
};

export default StartBtn;
