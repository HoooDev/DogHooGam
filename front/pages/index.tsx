import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import kakaoLogo from "../public/icons/kakao.svg";
import logo from "../public/icons/logo.png";

const Index: NextPage = () => {
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const Token = window.localStorage.getItem("AccessToken");
    if (Token) {
      axios({
        url: `https://dog-hoogam.site/api/user-service/user`,
        method: "get",
        headers: { Authorization: `Bearer ${Token}` }
      })
        .then((res) => {
          if (res.status === 200) {
            router.push("/home");
          }
        })
        .catch((err) => {
          console.log(err);
          window.localStorage.removeItem("AccessToken");
          setFlag(true);
        });
    }
    if (Token === null) {
      setFlag(true);
    }
  }, []);
  if (flag) {
    return (
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.introImg}`}>
          <Image src={logo} alt="#" />
        </div>
        <div className={`${styles.intro}`}>
          <h1 className={`${styles.text} fs-20 notoBold`}>나의 반려견과</h1>
          <h1 className={`${styles.text} fs-20 notoBold`}>
            평생 함께하는 추억
          </h1>
          <h1 className={`${styles.text} fs-20 notoBold`}>NFT로 보관하세요</h1>
        </div>
        <button
          className={`${styles.button} flex align-center fs-20 notoMid`}
          type="button"
          onClick={() => {
            router.push("/oauth2/authorization/kakao");
          }}
        >
          <div className={`${styles.kakao}`}>
            <Image src={kakaoLogo} alt="#" />
          </div>
          카카오 로그인
        </button>
      </div>
    );
  }
  return null;
};

export default Index;
