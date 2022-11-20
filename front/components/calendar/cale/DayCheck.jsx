/* eslint-disable no-shadow */
import React, { useReducer, useEffect } from "react";
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

const today = new Date();
const initialState = {
  year: today.getFullYear(),
  month: today.getMonth()
};
function DayCheck() {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const { year, month } = state;
  const yearMonth = `${year}.${month + 1}`;
  const lastDate = parseInt(new Date(year, month + 1, 0).getDate(), 10);
  const firstDay = parseInt(new Date(year, month, 1).getDay(), 10);
  const dispatch2 = useDispatch();
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
        <div type="button" className="fs-20 notoBold mx-4">
          {yearMonth}
        </div>
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
