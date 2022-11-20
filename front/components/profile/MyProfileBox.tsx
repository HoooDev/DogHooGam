/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux";
import Router from "next/router";
import styles from "./MyProfileBox.module.scss";
import MyWallet from "./MyWallet";

function MyProfileBox() {
  const storeUser = useSelector((state: any) => state.user.userInfo);

  function getLogout(e: any) {
    e.preventDefault();
    window.localStorage.removeItem("AccessToken");
    window.localStorage.removeItem("persist:root");
    Router.push("/");
  }
  return (
    <div className={`${styles.myProfileBox}`}>
      <button
        className={`${styles.Logout} fs-14 notoBold`}
        type="button"
        onClick={(e) => getLogout(e)}
      >
        LOGOUT
      </button>
      <div className={`${styles.profileBox} flex notoMid`}>
        <div className={`${styles.imgBox} flex`}>
          <img
            className={`${styles.myImg}`}
            src={storeUser?.profileImg}
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
