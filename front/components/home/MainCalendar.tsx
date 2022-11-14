/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./MainCalendar.module.scss";

function MainCalendar() {
  const [memos, setMemos] = useState<any>([]);
  const date: Date = new Date();
  const day: Array<string> = ["일", "월", "화", "수", "목", "금", "토"];
  console.log(day[date.getDay()]);

  useEffect(() => {
    const Token = window.localStorage.getItem("AccessToken");
    axios({
      url: `https://dog-hoogam.site:8000/api/memo/today`,
      method: "get",
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then((res) => {
        console.log(res);
        setMemos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function memoCheck(e: any) {
    e.preventDefault();
    console.log(e.target.id);
    const Token = window.localStorage.getItem("AccessToken");
    axios({
      url: `https://dog-hoogam.site:8000/api/memo/${e.target.id}`,
      method: "patch",
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then((res) => {
        console.log(res);
        const newList = [];
        for (let i = 0; i < memos.length; i += 1) {
          if (memos[i].pk === Number(e.target.id)) {
            let check;
            if (memos[i].done === true) {
              check = false;
            } else {
              check = true;
            }
            newList.push({
              pk: memos[i].pk,
              content: memos[i].content,
              memoDate: memos[i].memoDate,
              done: check
            });
          } else {
            newList.push(memos[i]);
          }
        }
        setMemos(newList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={`${styles.calendar} flex`}>
      <div className={`${styles.calendarY}`}>
        <Link href="/calendar">
          <div>
            <h1 className="fs-12 notoMid">{day[date.getDay()]}요일</h1>
            <h1 className="fs-24 notoBold">{date.getDate()}일</h1>
          </div>
        </Link>

        <div className={`${styles.calendarS}`}>
          {memos.map((memo: any) => {
            return (
              <div
                className={
                  memo.done
                    ? `${styles.memo} ${styles.done} fs-16 notoMid`
                    : `${styles.memo} fs-16 notoMid`
                }
                onClick={(e) => memoCheck(e)}
                key={memo.pk}
                id={memo.pk}
              >
                {memo.content}
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`${styles.calendarW} flex justify-center align-center fs-13 notoBold`}
      >
        강아지의 일상을 남겨보아요
      </div>
    </div>
  );
}

export default MainCalendar;
