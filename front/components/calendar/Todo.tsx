import styles from "./Todo.module.scss";

function Todo() {
  const arr = ["산책하기", "씻기기", "예방접종"];
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.list} notoBold fs-20`}>산책하기</div>
      <div className={`${styles.list} notoBold fs-20`}>씻기기</div>
      <div className={`${styles.list} notoBold fs-20`}>예방접종</div>
    </div>
  );
}

export default Todo;
