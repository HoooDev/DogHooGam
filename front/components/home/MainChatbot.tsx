import styles from "./MainChatbot.module.scss";

function MainChatbot() {
  return (
    <div className={`${styles.wrapper} flex justify-space-around align-center`}>
      <div className={`${styles.MainTabImg}`} />
      <div className={`${styles.MainTabText}`}>
        <h1 className="fs-13 notoBold">챗봇을 통해</h1>
        <h1 className="fs-13 notoBold">강아지의 상태를 파악해 보아요</h1>
      </div>
      <button type="button" className={`${styles.MainTabButton} fs-10 notoMid`}>
        물어보기
      </button>
    </div>
  );
}

export default MainChatbot;
