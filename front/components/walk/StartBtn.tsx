import { useDispatch, useSelector } from "react-redux";

import styles from "./StartBtn.module.scss";
import { startWalking } from "../../redux/slice/walkSlice";
import type { AppDispatch, RootState } from "../../redux/store/index";

const StartBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isWalkingStarted } = useSelector((state: RootState) => state.walk);
  const onWalkStartClick = () => {
    dispatch(
      startWalking({
        lat: 0,
        lon: 0
      })
    );
  };
  console.log(isWalkingStarted);
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
