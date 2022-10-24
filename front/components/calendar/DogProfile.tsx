import styles from "./DogProfile.module.scss";

import logo from "../../public/icons/logo2.png";

function DogProfile() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.logo}`}>
        강아지로고
      </div>
    </div>
  )
}

export default DogProfile;