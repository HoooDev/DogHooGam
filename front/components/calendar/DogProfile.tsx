import Image from "next/image";
import styles from "./DogProfile.module.scss";

import logo from "../../public/icons/dogprofilelogo.svg";
import circle from "../../public/icons/circle.svg";

function DogProfile() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.logo}`}>
        <Image src={logo} alt="강아지프로필" width={90} height={97} />
      </div>
      <div className={`${styles.proname} flex`}>
        <Image src={circle} alt="원" width={16} height={16} />
        <div className={`${styles.name} notoMid fs-16`}>멍멍이</div>
      </div>
    </div>
  );
}

export default DogProfile;
