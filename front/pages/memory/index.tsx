import styles from "./index.module.scss";

function index() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.memoryNav} flex justify-space-between`}>
        <h1>추억 남기기</h1>
        <div>생성버튼</div>
      </div>
    </div>
  );
}

export default index;
