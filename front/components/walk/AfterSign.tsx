/* eslint-disable no-restricted-globals */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AfterSign.module.scss";
import pause from "../../public/icons/pause.svg";
import stop from "../../public/icons/stop.svg";
import play from "../../public/icons/play.svg";
import { finishWalking } from "../../redux/slice/walkSlice";
import { AppDispatch, RootState } from "../../redux/store";

const AfterSign = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isPausing, setIsPausing] = useState<boolean>(false);
  const { totalDist } = useSelector((state: RootState) => state.walk);

  const interval: { current: NodeJS.Timeout | null } = useRef(null);
  const [timerTime, setTimerTime] = useState(0);
  const [timerStart, setTimerStart] = useState(Date.now());
  const [beforeTime, setBeforeTime] = useState(0);

  const startTimer = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    setTimerStart(Date.now());
    interval.current = setInterval(() => {
      setTimerTime(Date.now() - timerStart);
    }, 10);
  };

  const restartTimer = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    setBeforeTime(timerTime);
    setTimerStart(Date.now());
    interval.current = setInterval(() => {
      setTimerTime(beforeTime + Date.now() - timerStart);
    }, 100);
  };

  const stopTimer = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
  };

  const resetTimer = () => {
    setTimerStart(0);
    setTimerTime(0);
  };

  const onPlayClick = () => {
    restartTimer();
    setIsPausing((prev) => !prev);
  };

  const onPuaseClick = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    stopTimer();
    setIsPausing((prev) => !prev);
  };
  const onStopClick = () => {
    if (confirm("산책을 마치시겠습니까?")) {
      dispatch(finishWalking(totalDist));
      resetTimer();
    }
  };
  const seconds = `0${(Math.floor(timerTime / 1000) % 60).toString(10)}`.slice(
    -2
  );
  const minutes = `0${(Math.floor(timerTime / 60000) % 60).toString(10)}`.slice(
    -2
  );

  useEffect(() => {
    startTimer();
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.icons}`}>
        <div className={`${styles.distance} flex column align-center`}>
          <div className={`${styles.distance__num} fs-20`}>{totalDist}</div>
          <div className={`${styles.distance__unit} fs-12`}>거리(km)</div>
        </div>
        <div className={`${styles.coin} flex column align-center`}>
          <div className={`${styles.coin__num} fs-20`}>0</div>
          <div className={`${styles.coin__unit} fs-12`}>coin</div>
        </div>
        <div className={`${styles.time} flex column align-center`}>
          <div className={`${styles.time__num} fs-20`}>
            {minutes} : {seconds}
          </div>
          <div className={`${styles.time__unit} fs-12`}>시간(분)</div>
        </div>
      </div>
      <div className={`${styles.controller} flex justify-center`}>
        <div className={`${styles.controller__content} flex fs-16`}>
          {!isPausing ? (
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
