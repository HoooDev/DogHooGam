/* eslint-disable consistent-return */
import { useDispatch, useSelector } from "react-redux";

import styles from "./StartBtn.module.scss";
import { startWalking } from "../../redux/slice/walkSlice";
import type { AppDispatch, RootState } from "../../redux/store/index";

const StartBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isWalkingStarted, selectedDogs } = useSelector(
    (state: RootState) => state.walk
  );
  const onWalkStartClick = () => {
    if (selectedDogs.length === 0) {
      return alert("산책 전 반려견을 선택해주세요.");
    }
    dispatch(
      startWalking({
        lat: 0,
        lng: 0
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
