/* eslint-disable consistent-return */
import { useDispatch, useSelector } from "react-redux";

import styles from "./StartBtn.module.scss";
import { startWalking, startWalkingApi } from "../../redux/slice/walkSlice";
import type { AppDispatch, RootState } from "../../redux/store/index";

const StartBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedDogs } = useSelector((state: RootState) => state.walk);
  const onWalkStartClick = () => {
    if (selectedDogs.length === 0) {
      return alert("산책 전 반려견을 선택해주세요.");
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lng = position.coords.longitude; // 경도
        startWalkingApi({
          dogPk: [3],
          dogState: 0,
          lat,
          lng
        })
          .then((res) => {
            dispatch(startWalking(res.data));
          })
          .catch(() => console.error);
      });
    } else {
      alert("지도 정보를 허용해주세요!");
    }
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
