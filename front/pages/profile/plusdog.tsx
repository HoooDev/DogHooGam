import Image from "next/image";
import styles from "./plusdog.module.scss";
import dogDummy from "../../public/icons/dogDummy.jpg";

function plusdog() {
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
            type="text"
            placeholder="연도"
            className={`${styles.dogBirthInput}`}
          />
          <input
            type="text"
            placeholder="월"
            className={`${styles.dogBirthInput}`}
          />
          <input
            type="text"
            placeholder="일"
            className={`${styles.dogBirthInput}`}
          />
        </div>
        <p className={`${styles.dogInputTitle}`}>성격</p>
        <input type="text" className={`${styles.dogInput} notoReg`} /> <hr />
      </div>
    </div>
  );
}

export default plusdog;
