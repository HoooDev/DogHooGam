/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "./MyProfileBox.module.scss";
// import defaultUser from "../../public/icons/defaultUser.png";
import MyWallet from "./MyWallet";

function MyProfileBox() {
  const storeUser = useSelector((state: any) => state.user.userInfo);

  console.log(storeUser);
  return (
    <div className={`${styles.myProfileBox}`}>
      <div className={`${styles.profileBox} flex`}>
        <div className={`${styles.imgBox} `}>
          <img
            className={`${styles.myImg}`}
            src={storeUser.profile.thumbnail_image_url}
            alt="#"
          />
        </div>
        <p className={`${styles.myNickName}`}>{storeUser.profile.nickname}</p>
      </div>
      <MyWallet />
    </div>
  );
}

export default MyProfileBox;
