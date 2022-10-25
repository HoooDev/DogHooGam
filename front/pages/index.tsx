import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";

import styles from "./index.module.scss";
import kakaoLogo from "../public/icons/kakao.svg";
import logo from "../public/icons/logo.png";

const kakaoInit = () => {
  const kakao = (window as any).Kakao;
  if (!kakao.isInitialized()) {
    kakao.init("63114dc256e35bf85feb3421ba6ac4fc");
  }

  return kakao;
};

const Index: NextPage = () => {
  const kakaoLogin = async () => {
    // 카카오 초기화
    const kakao = kakaoInit();
    // 카카오 로그인 구현
    kakao.Auth.login({
      success: () => {
        kakao.API.request({
          url: "/v2/user/me", // 사용자 정보 가져오기
          success: (res: any) => {
            // 로그인 성공할 경우 정보 확인 후 home 페이지로 push
            console.log(res);
            // Router.push("/home");
          },
          fail: (error: any) => {
            console.log(error);
          }
        });
      },
      fail: (error: any) => {
        console.log(error);
      }
    });
  };

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
        onClick={kakaoLogin}
      >
        <div className={`${styles.kakao}`}>
          <Image src={kakaoLogo} alt="#" />
        </div>
        카카오 로그인
      </button>
    </div>
  );
};

export default Index;
