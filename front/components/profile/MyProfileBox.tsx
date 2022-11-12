/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";

import { useSelector } from "react-redux";
import Router from "next/router";
import styles from "./MyProfileBox.module.scss";
// import defaultUser from "../../public/icons/defaultUser.png";
import MyWallet from "./MyWallet";

function MyProfileBox() {
  const storeUser = useSelector((state: any) => state.user.userInfo);

  function getLogout(e: any) {
    e.preventDefault();
    window.localStorage.removeItem("AccessToken");
    window.localStorage.removeItem("persist:root");
    Router.push("/");
  }
  console.log(storeUser);
  return (
    <div className={`${styles.myProfileBox}`}>
      <button
        className={`${styles.Logout} fs-14 notoBold`}
        type="button"
        onClick={(e) => getLogout(e)}
      >
        LOGOUT
      </button>
      <div className={`${styles.profileBox} flex`}>
        <div className={`${styles.imgBox} `}>
          <img
            className={`${styles.myImg}`}
            src={storeUser.profileImg}
            alt="#"
          />
        </div>
        <p className={`${styles.myNickName}`}>{storeUser.nickName}</p>
      </div>
      <MyWallet />
    </div>
  );
}

export default MyProfileBox;
