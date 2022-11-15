import Image from "next/image";

import cry from "../public/images/cry.svg";
import styles from "./404.module.scss";

const Custom404 = () => {
  return (
    <div
      className={`${styles.wrapper}  flex column justify-center align-center`}
    >
      <div className={`${styles.cry}`}>
        <Image src={cry} alt="cry" />
      </div>
      <h1 className={`${styles.content} fs-18`}>
        요청하신 페이지를 찾을 수 없습니다.
      </h1>
    </div>
  );
};

export default Custom404;
