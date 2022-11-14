/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./MainCalendar.module.scss";
import { setMemos } from "../../redux/slice/calendarSlice";


function MainCalendar() {
  const [todayMemos, setTodayMemos] = useState<any>([]);
  const date: Date = new Date();
  const day: Array<string> = ["일", "월", "화", "수", "목", "금", "토"];
  console.log(day[date.getDay()]);
  const dispatch = useDispatch();

  useEffect(() => {
    const Token = window.localStorage.getItem("AccessToken");
    axios({
      url: `https://dog-hoogam.site:8000/api/memo/today`,
      method: "get",
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then((res) => {
        console.log(res);
        setTodayMemos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function memoCheck(e: any) {
    e.preventDefault();
    console.log(e.target.id);
    dispatch(setMemos([]));
    const Token = window.localStorage.getItem("AccessToken");
    axios({
      url: `https://dog-hoogam.site:8000/api/memo/${e.target.id}`,
      method: "patch",
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then((res) => {
        console.log(res);
        const newList = [];
        for (let i = 0; i < todayMemos.length; i += 1) {
          if (todayMemos[i].pk === Number(e.target.id)) {
            let check;
            if (todayMemos[i].done === true) {
              check = false;
            } else {
              check = true;
            }
            newList.push({
              pk: todayMemos[i].pk,
              content: todayMemos[i].content,
              memoDate: todayMemos[i].memoDate,
              done: check
            });
          } else {
            newList.push(todayMemos[i]);
          }
        }
        setTodayMemos(newList);
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
          {todayMemos.map((memo: any) => {
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
