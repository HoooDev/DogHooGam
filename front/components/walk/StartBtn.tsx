import { useDispatch, useSelector } from "react-redux";

import styles from "./StartBtn.module.scss";
import { startWalking } from "../../redux/slice/walkSlice";
import type { RootState } from "../../redux/store/index";

const StartBtn = () => {
  const dispatch = useDispatch();
  const {} = useSelector((state: RootState) => state.walk);
  const onWalkStartClick = () => {
    dispatch(startWalking());
  };
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
