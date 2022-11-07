import axios from "axios";
import {  useRef, useState } from "react";
import { v4 } from "uuid";
import styles from "./Todo.module.scss";

function Todo() {
  const todoRef = useRef<HTMLInputElement>(null); // 새로 쓴 메모 값
  const [text, setText] = useState("");
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.toLocaleDateString("ko-kr");
  console.log(time);
  console.log(date);
  const arr: string[] = ["산책하기", "씻기기", "예방접종", "밥먹기"];
  // const arr: string[] = [];
  console.log(arr);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  console.log(text);

  const handleMessage = () => {
    if (text === "") {
      return alert("메모를 입력해보세요:)");
    }
    const Token = window.localStorage.getItem("AccessToken");
    axios({
      url: "https://dog-hoogam.site:8000/api/memo",
      method: "post",
      headers: { Authorization: `Bearer ${Token}` },
      data: {
        content: text,
        memoDate: time,
        title: text
      }
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("success");
          setText("");
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 메시지 전송하는 부분 구현
  // setText(''); // 메시지 전송 후 input 빈값으로 수정
  // inputRef?.current?.focus(); // 메시지 전송 후 input 포커스

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleMessage();
    }
  };
  return (
<<<<<<< HEAD
    <div className={`${styles.wrapper} flex`} id="메모">
=======
    <div className={`${styles.wrapper}`}>
>>>>>>> 16a4555ceb0c60080cee28fa2a37f83bcc02ae25
      {arr.length !== 0 &&
        arr.map((value: string): any => (
          <div key={v4()} className={`${styles.list} notoBold fs-20`}>
            {value}
          </div>
        ))}
      <input
        ref={todoRef}
        className={`${styles.new} notoBold fs-16`}
        placeholder="메모를 입력해보세요!"
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default Todo;
