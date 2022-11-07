import Link from "next/link";
import Image from "next/image";
import styles from "./MainChatbot.module.scss";
import chatbot from "../../public/images/chatbot.svg";

function MainChatbot() {
  return (
    <div className={`${styles.wrapper} flex justify-space-around align-center`}>
      <div className={`${styles.MainTabImg}`}>
        <Image src={chatbot} alt="#" />
      </div>
      <div className={`${styles.MainTabText}`}>
        <h1 className="fs-13 notoBold">챗봇을 통해</h1>
        <h1 className="fs-13 notoBold">강아지의 상태를 파악해 보아요</h1>
      </div>
      <Link href="/chat">
        <button
          type="button"
          className={`${styles.MainTabButton} fs-10 notoMid`}
        >
          물어보기
        </button>
      </Link>
    </div>
  );
}

export default MainChatbot;
