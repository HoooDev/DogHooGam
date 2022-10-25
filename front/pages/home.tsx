import styles from "./home.module.scss";

import MainCalendar from "../components/home/MainCalendar";
import MainWalk from "../components/home/MainWalk";
import MainMemory from "../components/home/MainMemory";
import MainChatbot from "../components/home/MainChatbot";

function home() {
  return (
    <div className={`${styles.wrapper}`}>
      <MainCalendar />
      <div
        className={`${styles.mainTab} flex column align-center justify-center`}
      >
        <MainWalk />
        <MainMemory />
        <MainChatbot />
      </div>
    </div>
  );
}

export default home;
