/* eslint-disable no-restricted-globals */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AfterSign.module.scss";
import pause from "../../public/icons/pause.svg";
import stop from "../../public/icons/stop.svg";
import play from "../../public/icons/play.svg";
import {
  finishWalkingApi,
  pauseWalking,
  restartWalking,
  saveCoin,
  saveTime
} from "../../redux/slice/walkSlice";
import { AppDispatch, RootState } from "../../redux/store";

const calCoin = (ms: number): number => {
  const minute = ms / 1000 / 60;
  let coin = 600;
  if (minute <= 90) {
    coin = -(1 / 27) * (2 * minute * minute - 360 * minute);
  }
  return Math.round(coin / 10) * 10;
};

const AfterSign = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalDist, isPaused, coin } = useSelector(
    (state: RootState) => state.walk
  );
  const interval: { current: NodeJS.Timeout | null } = useRef(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      interval.current = setInterval(() => {
        setTime((prev) => {
          // 10 초
          const sec = (prev + 10) / 1000;
          if (sec % 10 === 0) {
            const res = calCoin(prev + 10);
            dispatch(saveCoin(res));
          }
          if ((prev + 10) % 1000 === 0) {
            dispatch(saveTime(prev + 10));
          }
          return prev + 10;
        });
      }, 10);
    } else if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }
  }, [isPaused]);

  const onPlayClick = () => {
    dispatch(restartWalking());
    // setIsPausing((prev) => !prev);
  };

  const onPuaseClick = () => {
    // setIsPausing((prev) => !prev);
    dispatch(pauseWalking());
  };

  const onStopClick = () => {
    onPuaseClick();
    if (confirm("산책을 마치시겠습니까?")) {
      dispatch(finishWalkingApi());
    } else {
      onPlayClick();
    }
  };

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.icons} notoMid`}>
        <div className={`${styles.distance} flex column align-center`}>
          <div className={`${styles.distance__num} fs-20`}>{totalDist}</div>
          <div className={`${styles.distance__unit} fs-12`}>거리(km)</div>
        </div>
        <div className={`${styles.coin} flex column align-center`}>
          <div className={`${styles.coin__num} fs-20`}>{coin}</div>
          <div className={`${styles.coin__unit} fs-12`}>coin</div>
        </div>
        <div className={`${styles.time} flex column align-center`}>
          <div className={`${styles.time__num} fs-20`}>
            {`0${(Math.floor(time / 60000) % 60).toString(10)}`.slice(-2)}:
            {`0${(Math.floor(time / 1000) % 60).toString(10)}`.slice(-2)}
          </div>
          <div className={`${styles.time__unit} fs-12`}>시간(분)</div>
        </div>
      </div>
      <div className={`${styles.controller} flex justify-center `}>
        <div
          className={`${styles.controller__content} flex justify-space-around fs-16`}
        >
          {!isPaused ? (
            <div
              className={`${styles.controller__pause} flex justify-center align-center`}
              onClick={onPuaseClick}
              aria-hidden="true"
            >
              <Image src={pause} alt="pause" />
            </div>
          ) : (
            <div
              className={`${styles.controller__play} flex justify-center align-center`}
              onClick={onPlayClick}
              aria-hidden="true"
            >
              <Image src={play} alt="play" />
            </div>
          )}
          <div
            className={`${styles.controller__stop} flex justify-center align-center`}
            onClick={onStopClick}
            aria-hidden="true"
          >
            <Image src={stop} alt="stop" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterSign;
