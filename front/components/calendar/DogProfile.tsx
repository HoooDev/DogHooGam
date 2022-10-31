import Image from "next/image";
import { v4 } from "uuid";
import styles from "./DogProfile.module.scss";

import logo from "../../public/icons/dogprofilelogo.svg";
import circle from "../../public/icons/circle.svg";

function DogProfile() {
  // 더미데이터
  const arr = [
    { img: logo, name: "멍멍이" },
    { img: logo, name: "123" },
    { img: logo, name: "멍멍123이" },
    { img: logo, name: "멍멍123이얌" }
  ];
  return (
    <div className={`${styles.wrapper} flex`}>
      {arr.length !== 0 &&
        arr.map(({ img, name }) => (
          <div className={`${styles.profile}`} key={v4()}>
            <div className={`${styles.logo} flex`}>
              <Image src={img.src} alt="강아지프로필" width={90} height={97} />
            </div>
            <div className={`${styles.proname} flex`}>
              <Image src={circle} alt="원" width={12} height={12} />
              <div className={`${styles.name} notoMid fs-12`}>{name}</div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default DogProfile;
