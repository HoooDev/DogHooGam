import Image from "next/image";
import { useRef } from "react";
import styles from "./plusdog.module.scss";
import dogDummy from "../../public/icons/dogDummy.jpg";

function Plusdog() {
  const walletRef = useRef<HTMLInputElement>(null);
  const walletAddress =
    "0xa06989ee6270d06b5f00e9a4b3374460276bf6e83edcbe432e4f509fcad061fe";

  const getWalletAdd = () => {
    if (walletRef.current) {
      walletRef.current.value = walletAddress;
      // eslint-disable-next-line no-alert
      alert("지갑 주소를 불러왔습니다.");
    }
  };

  function maxLengthChk(object: EventTarget & HTMLInputElement) {
    if (object.value.length > object.maxLength) {
      // eslint-disable-next-line no-param-reassign
      object.value = object.value.slice(0, object.maxLength);
    }
  }

  return (
    <div className={`${styles.plusDog}`}>
      <div className={`${styles.dogProfileBox}`}>
        <div className={`${styles.dogImgBox}`}>
          <div className={`${styles.dogImg}`}>
            <Image src={dogDummy} />
          </div>
        </div>
        <p className={`${styles.dogProfileTitle}  notoBold`}>강아지 프로필</p>
      </div>
      <div className={`${styles.dogInputForm} notoMid`}>
        <p className={`${styles.dogInputTitle}`}>강아지 이름</p>
        <input type="text" className={`${styles.dogInput} notoReg`} /> <hr />
        <p className={`${styles.dogInputTitle}`}>견종</p>
        <input type="text" className={`${styles.dogInput} notoReg`} /> <hr />
        <p className={`${styles.dogInputTitle}`}>생년월일</p>
        <div className={`${styles.dogBirthInputForm} notoReg`}>
          <input
            type="number"
            placeholder="연도 ex) 2022"
            maxLength={4}
            className={`${styles.dogBirthInput} notoReg`}
            onChange={(e) => maxLengthChk(e.target)}
          />
          <input
            type="number"
            placeholder="월 ex) 1, ..., 12"
            maxLength={2}
            className={`${styles.dogBirthInput} notoReg`}
            onChange={(e) => maxLengthChk(e.target)}
          />
          <input
            type="number"
            placeholder="일 ex) 1, ..., 31"
            maxLength={2}
            className={`${styles.dogBirthInput} notoReg`}
            onChange={(e) => maxLengthChk(e.target)}
          />
        </div>
        <p className={`${styles.dogInputTitle}`}>성격</p>
        <input type="text" className={`${styles.dogInput} notoReg`} /> <hr />
        <div className={`${styles.walletTitleBox}`}>
          <p className={`${styles.dogInputTitle}`}>지갑주소</p>
          <button
            type="button"
            className={`${styles.walletAdd}`}
            onClick={() => {
              getWalletAdd();
            }}
          >
            불러오기
          </button>
        </div>
        <input
          type="text"
          // name="walletAdd"
          ref={walletRef}
          className={`${styles.dogInput} notoReg`}
        />
        <hr />
      </div>
      <div className="flex justify-center">
        <button type="button" className={`${styles.AddBtn}`}>
          등록하기
        </button>
      </div>
    </div>
  );
}

export default Plusdog;
