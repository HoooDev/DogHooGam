import styles from "./Todo.module.scss";

function Todo() {
  const arr: string[] = ["산책하기", "씻기기", "예방접종", "밥먹기"];
  console.log(arr);
  return (
    <div className={`${styles.wrapper}`}>
      {/* <div className={`${styles.list} notoBold fs-20`}>산책하기</div>
      <div className={`${styles.list} notoBold fs-20`}>예방접종</div> */}
      {arr.length !== 0 &&
        arr.map((value: string): any => (
          <div className={`${styles.list} notoBold fs-20`}>{value}</div>
        ))}
    </div>
  );
}

export default Todo;
