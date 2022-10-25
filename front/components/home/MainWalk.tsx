import Link from "next/link";

import styles from "./MainWalk.module.scss";

function MainWalk() {
  return (
    <div className={`${styles.wrapper} flex justify-space-around align-center`}>
      <div className={`${styles.MainTabImg}`} />
      <div className={`${styles.MainTabText}`}>
        <h1 className="fs-13 notoBold">독후감으로</h1>
        <h1 className="fs-13 notoBold">강아지와 함께 산책을 시작하세요</h1>
      </div>
      <Link href="/walk">
        <button
          type="button"
          className={`${styles.MainTabButton} fs-10 notoMid`}
        >
          산책하기
        </button>
      </Link>
    </div>
  );
}
export default MainWalk;
