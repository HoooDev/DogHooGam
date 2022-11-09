/* eslint-disable consistent-return */
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import styles from "./Todo.module.scss";
import close from "../../public/icons/close.svg";
import done from "../../public/icons/done.svg";

import { setMemos } from "../../redux/slice/calendarSlice";

function Todo() {
  const [text, setText] = useState("");
  const memos = useSelector((state) => state.calendar.memos);
  const dayEvent = useSelector((state) => state.calendar.selectDay);
  const year = dayEvent.year;
  const month = dayEvent.month;
  const day = dayEvent.day;
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();

  console.log(memos);

  useEffect(() => {
    setTodos(memos[day])
  }, [day])

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
        console.log(res)
        if (res.status === 200) {
          let newMemos = [...memos];
          const newTodayMemos = [...memos[day]]
          newTodayMemos.push(res.data)
          newMemos[day] = newTodayMemos
          dispatch(setMemos(newMemos))
          setTodos(newTodayMemos)
          setText("");
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
        {todos.length > 0 ?
          <div>
            {todos.map((memo) => {
              return (<div className={`${styles.list} flex notoBold fs-20`} key={v4()}>
                <div className={`${styles.text}`}>{memo.content}</div>
                <Image src={done} alt="완료" />
                <Image src={close} alt="삭제" />
              </div>)
            })}
          </div> : null
        }
      </div>
      <input
        value={text}
        className={`${styles.new} notoBold fs-16`}
        placeholder="메모를 입력해보세요!"
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default Todo;
