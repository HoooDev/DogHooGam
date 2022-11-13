// import { useRouter } from "next/router";
import styles from "./profile.module.scss";
import MyProfileBox from "../../components/main/profile/MyProfileBox";
import DogProfile from "../../components/main/profile/DogProfile";

function Profile() {
  // const router = useRouter();

  return (
    <div className={`${styles.profile}`}>
      <MyProfileBox />
      <DogProfile />
    </div>
  );
}

export default Profile;
