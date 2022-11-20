import styles from "./index.module.scss";
import MyProfileBox from "../../components/profile/MyProfileBox";
import DogProfile from "../../components/profile/DogProfile";

function Profile() {
  return (
    <div className={`${styles.profile}`}>
      <MyProfileBox />
      <DogProfile />
    </div>
  );
}

export default Profile;
