/* eslint-disable consistent-return */
import Image from "next/image";
import axios from "axios";
import { useRef, useState } from "react";
import { v4 } from "uuid";
import styles from "./Todo.module.scss";

import close from "../../public/icons/close.svg";
import done from "../../public/icons/done.svg";

function Todo() {
  const todoRef = useRef<HTMLInputElement>(null); // 새로 쓴 메모 값
  const [text, setText] = useState("");
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // const time = date.toLocaleDateString("ko-kr");
  // console.log(time);

  const arr: string[] = ["산책하기", "씻기기", "예방접종", "밥먹기"];
  // const arr: string[] = [];
  // console.log(arr);

  const onChange = (e: any) => {
    setText(e.target.value);
  };

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
        year,
        month,
        day
      }
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("success");
          setText("");
          if (todoRef.current?.value) {
            todoRef.current.value = "";
          }
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const onClickDel = () => {
  //   const Token = window.localStorage.getItem("AccessToken");
  //   axios({

  //   })
  // }

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleMessage();
    }
  };
  return (
    <div className={`${styles.wrapper} flex`} id="메모">
      <div>
        {arr.length !== 0 &&
          arr.map((value: string): any => (
            <div key={v4()} className={`${styles.list} flex notoBold fs-20`}>
              <div className={`${styles.text}`}>{value}</div>
              <Image src={done} alt="완료" />
              <Image src={close} alt="삭제" />
            </div>
          ))}
      </div>
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
