import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import styles from "./BeforeSign.module.scss";
import StartBtn from "./StartBtn";
import greenMoon from "../../public/icons/greenMoon.svg";
import redMoon from "../../public/icons/redMoon.svg";
import { toggleDogState } from "../../redux/slice/walkSlice";
import { RootState } from "../../redux/store";

const BeforeSign = () => {
  const greenRef = useRef<HTMLDivElement>(null);
  const redRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { dogState } = useSelector((state: RootState) => state.walk);
  const onGreenClick = () => {
    dispatch(toggleDogState(0));
  };
  const onRedClick = () => {
    dispatch(toggleDogState(1));
  };

  useEffect(() => {
    if (dogState === 0) {
      redRef.current?.classList.add(`${styles.opacity}`);
      greenRef.current?.classList.remove(`${styles.opacity}`);
    } else {
      redRef.current?.classList.remove(`${styles.opacity}`);
      greenRef.current?.classList.add(`${styles.opacity}`);
    }
  }, [dogState]);

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.icons} notoMid`}>
        <div
          ref={greenRef}
          className={`${styles.greenMoon}`}
          onClick={onGreenClick}
          aria-hidden="true"
        >
          <div className={styles.greenMoon__icon}>
            <Image src={greenMoon} alt="greenMoon" />
          </div>
          <div className={`${styles.greenMoon__text} fs-16`}>같이 할래요</div>
        </div>

        <div
          ref={redRef}
          className={`${styles.redMoon}`}
          onClick={onRedClick}
          aria-hidden="true"
        >
          <div className={styles.redMoon__icon}>
            <Image src={redMoon} alt="redMoon" />
          </div>
          <div className={`${styles.redMoon__text} fs-16`}>혼자 할래요</div>
        </div>
      </div>
      <StartBtn />
    </div>
  );
};

export default BeforeSign;
