import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./AfterSign.module.scss";
import pause from "../../public/icons/pause.svg";
import stop from "../../public/icons/stop.svg";
import play from "../../public/icons/play.svg";
import { stopWalking } from "../../redux/slice/walkSlice";

const AfterSign = () => {
  const dispatch = useDispatch();
  const [isPausing, setIsPausing] = useState<boolean>(false);
  const onPlayToggle = () => {
    setIsPausing((prev) => !prev);
  };
  const onStopClick = () => {
    dispatch(stopWalking());
  };
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
          <div className={`${styles.time__unit} fs-12`}>시간(분)</div>
        </div>
      </div>
      <div className={`${styles.controller} flex justify-center`}>
        <div className={`${styles.controller__content} flex fs-16`}>
          {!isPausing ? (
            <div
              className={`${styles.controller__pause} flex justify-center align-center`}
              onClick={onPlayToggle}
              aria-hidden="true"
            >
              <Image src={pause} alt="pause" />
            </div>
          ) : (
            <div
              className={`${styles.controller__play} flex justify-center align-center`}
              onClick={onPlayToggle}
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
