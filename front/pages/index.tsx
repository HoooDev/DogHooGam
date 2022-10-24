import type { NextPage } from "next";
import Image from "next/image";
import styles from "./index.module.scss";
import kakao from "../public/icons/kakao.svg";
import logo from "../public/icons/logo.png";

const Index: NextPage = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.introImg}`}>
        <Image src={logo} alt="#" />
      </div>
      <div className={`${styles.intro}`}>
        <h1 className={`${styles.text} fs-20 notoBold`}>나의 반려견과</h1>
        <h1 className={`${styles.text} fs-20 notoBold`}>평생 함께하는 추억</h1>
        <h1 className={`${styles.text} fs-20 notoBold`}>NFT로 보관하세요</h1>
      </div>
      <button
        className={`${styles.button} flex align-center fs-20 notoMid`}
        type="button"
      >
        <div className={`${styles.kakao}`}>
          <Image src={kakao} alt="#" />
        </div>
        카카오 로그인
      </button>
    </div>
  );
};

export default Index;
