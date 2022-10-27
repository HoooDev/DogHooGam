import Image from "next/image";
import styles from "./MyProfileBox.module.scss";
import defaultUser from "../../public/icons/defaultUser.png";
import MyWallet from "./MyWallet";

function MyProfileBox() {
  return (
    <div className={`${styles.myProfileBox}`}>
      <div className={`${styles.profileBox} flex`}>
        <div className={`${styles.imgBox} `}>
          <div className={`${styles.myImg}`}>
            <Image src={defaultUser} alt="#" />
          </div>
        </div>
        <p className={`${styles.myNickName}`}>윤더가든</p>
      </div>
      <MyWallet />
    </div>
  );
}

export default MyProfileBox;
