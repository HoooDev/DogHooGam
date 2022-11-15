/* eslint-disable no-shadow */
import React, { useReducer, useEffect } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";

import styles from "./DayCheck.module.scss";
import calendarReducer from "./reducer/CalendarReducer";
import MakeCalendar from "./MakeCalendar";
import {
  getCalendarMemoApi,
  getCalendarWalkApi,
  setMemos,
  setRecords,
  setSelectDay
} from "../../../redux/slice/calendarSlice";

// import "./DayCheck.scss";
// import "react-calendar/dist/Calendar.css"; // css import

const today = new Date();
// console.log(today);
// 초기 상태
const initialState = {
  year: today.getFullYear(),
  month: today.getMonth()
};
function DayCheck() {
  // const [memo, setMemo] = useState([]);
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  // 날짜 관련
  const { year, month } = state;
  const yearMonth = `${year}.${month + 1}`;
  const lastDate = parseInt(new Date(year, month + 1, 0).getDate(), 10);
  const firstDay = parseInt(new Date(year, month, 1).getDay(), 10);
  const dispatch2 = useDispatch(); // 리덕스 날짜 저장값
  // Month 감소
  const onDecreases = () => {
    dispatch({ type: "DECREMENT" });
    const deyear = state.month === 0 ? state.year - 1 : state.year;

    dispatch2(
      setSelectDay({
        year: deyear,
        month: state.month !== 0 ? state.month : 12,
        day: 1
      })
    );
  };

  // Month 증가
  const onIncreases = () => {
    dispatch({ type: "INCREMENT" });
    const inyear = state.month + 2 === 13 ? state.year + 1 : state.year;
    dispatch2(
      setSelectDay({
        year: inyear,
        month: state.month + 2 !== 13 ? state.month + 2 : 1,
        day: 1
      })
    );
  };

  // 오늘로 가기
  const today = new Date();
  const toYear = today.getFullYear;
  const toMonth = today.getMonth + 1;
  const toDate = today.getDate;
  const onToday = () => {
    dispatch2(
      setSelectDay({
        year: toYear,
        month: toMonth,
        day: toDate
      })
    );
  };

  useEffect(() => {
    getCalendarMemoApi(state.month + 1, state.year)
      .then((res) => {
        dispatch2(setMemos(res));
      })
      .catch(() => console.error);
  }, [state]);

  useEffect(() => {
    getCalendarWalkApi(state.month + 1, state.year)
      .then((res) => {
        dispatch2(setRecords(res));
      })
      .catch(() => console.error);
  }, [state]);

  return (
    <div className="Calendar">
      <div className={`${styles.header}`}>
        <button
          type="button"
          className={`${styles.move} fs-20 notoBold`}
          onClick={onDecreases}
        >
          &lt;
        </button>
        <button type="button" className="fs-20 notoBold mx-4" onClick={onToday}>
          {yearMonth}
        </button>
        <button
          type="button"
          className={`${styles.move} fs-20 notoBold`}
          onClick={onIncreases}
        >
          &gt;
        </button>
      </div>
      <table className={`${styles.caltable}`}>
        <thead className={`${styles.calthead}`}>
          <tr className={`${styles.caltr}`}>
            <td className={`${styles.caltd} text-center fs-18 notoBold`}>일</td>
            <td className={`${styles.caltd} text-center fs-18 notoBold`}>월</td>
            <td className={`${styles.caltd} text-center fs-18 notoBold`}>화</td>
            <td className={`${styles.caltd} text-center fs-18 notoBold`}>수</td>
            <td className={`${styles.caltd} text-center fs-18 notoBold`}>목</td>
            <td className={`${styles.caltd} text-center fs-18 notoBold`}>금</td>
            <td className={`${styles.caltd} text-center fs-18 notoBold`}>토</td>
          </tr>
        </thead>
        <tbody className={`${styles.calbody}`}>
          {MakeCalendar({ year, month, firstDay, lastDate })}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(DayCheck);
