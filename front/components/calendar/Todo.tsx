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
import { RootState } from "../../redux/store";

function Todo() {
  const [text, setText] = useState("");
  const memos = useSelector((state: RootState) => state.calendar.memos);
  const dayEvent = useSelector((state: RootState) => state.calendar.selectDay);
  const { year, month, day } = dayEvent;
  const [todos, setTodos] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setTodos(memos[day]);
  }, [day]);

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
          const newMemos = [...memos];
          const newTodayMemos = [...memos[day]];
          newTodayMemos.push(res.data);
          newMemos[day] = newTodayMemos;
          dispatch(setMemos(newMemos));
          setTodos(newTodayMemos);
          setText("");
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClickDel = (e: any) => {
    const deletePk = e.currentTarget.id;
    const Token = window.localStorage.getItem("AccessToken");
    if (window.confirm("정말로 삭제하시겠습니까?") === true) {
      axios({
        url: `https://dog-hoogam.site:8000/api/memo/${deletePk}`,
        method: "delete",
        headers: { Authorization: `Bearer ${Token}` }
      })
        .then(() => {
          const newMemos = [...memos];
          const newTodayMemos = [...memos[day]];
          for (let i = 0; i < newTodayMemos.length; i += 1) {
            if (newTodayMemos[i].pk === Number(deletePk)) {
              newTodayMemos.splice(i, 1);
              break;
            }
          }
          newMemos[day] = newTodayMemos;
          dispatch(setMemos(newMemos));
          setTodos(newTodayMemos);
        })
        .catch((err) => {
          console.log(err);
        });
    } // if문으로 짜기
  };

  const onClickDone = (e: any) => {
    const donePk = e.currentTarget.id;
    const Token = window.localStorage.getItem("AccessToken");
    axios({
      url: `https://dog-hoogam.site:8000/api/memo/${donePk}`,
      method: "patch",
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then((res) => {
        if (res.status === 200) {
          const newMemos = [...memos];
          const newTodayMemos = [...memos[day]];
          const newList = [];
          for (let i = 0; i < newTodayMemos.length; i += 1) {
            if (newTodayMemos[i].pk === Number(donePk)) {
              let check;
              if (newTodayMemos[i].done === true) {
                check = false;
              } else {
                check = true;
              }
              newList.push({
                pk: newTodayMemos[i].pk,
                content: newTodayMemos[i].content,
                memoDate: newTodayMemos[i].memoDate,
                done: check
              });
            } else {
              newList.push(newTodayMemos[i]);
            }
          }
          newMemos[day] = newList;
          dispatch(setMemos(newMemos));
          setTodos(newList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleMessage();
    }
  };
  return (
    <div className={`${styles.wrapper} flex`} id="메모">
      <div>
        {todos && todos.length > 0 ? (
          <div>
            {todos.map((memo) => {
              return (
                <div
                  className={`${styles.list} flex notoBold fs-20`}
                  key={v4()}
                >
                  {memo && memo.done === false ? (
                    <div className={`${styles.text}`}>{memo.content}</div>
                  ) : (
                    <div className={`${styles.text} ${styles.done}`}>
                      {memo.content}
                    </div>
                  )}

                  <button
                    className={`${styles.deleteButton}`}
                    type="button"
                    onClick={(e) => onClickDone(e)}
                    id={memo.pk}
                  >
                    <Image src={done} alt="완료" />
                  </button>
                  <button
                    className={`${styles.deleteButton}`}
                    type="button"
                    onClick={(e) => onClickDel(e)}
                    id={memo.pk}
                  >
                    <Image src={close} alt="삭제" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : null}
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
