import Image from "next/image";

import cry from "../public/images/cry.svg";
import styles from "./404.module.scss";

const Custom404 = () => {
  return (
    <div
      className={`${styles.wrapper} flex column justify-center align-center`}
    >
      <div className={`${styles.cry}`}>
        <Image src={cry} alt="cry" />
      </div>
      <h1 className="notoBold fs-80">404</h1>
      <h1 className={`${styles.content} notoMid fs-20`}>
        요청하신 페이지를 찾을 수 없습니다.
      </h1>
      <div className={`${styles.text} notoMid fs-14`}>
        페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
      </div>
    </div>
  );
};

export default Custom404;
