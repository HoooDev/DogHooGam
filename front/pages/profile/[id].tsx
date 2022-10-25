// import { useRouter } from "next/router";
import styles from "./profile.module.scss";
import MyProfileBox from "../../components/profile/MyProfileBox";

function profile() {
  // const router = useRouter();

  return (
    <div className={`${styles.profile}`}>
      <h1 className={`${styles.title}`}>마이페이지</h1>
      <MyProfileBox />
    </div>
  );
}

export default profile;
