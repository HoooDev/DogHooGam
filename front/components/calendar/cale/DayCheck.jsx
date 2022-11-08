import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import calendarReducer from "./reducer/CalendarReducer";
import MakeCalendar from "./MakeCalendar";

// import "./DayCheck.scss";
// import "react-calendar/dist/Calendar.css"; // css import

const today = new Date();
// console.log(today);
// 초기 상태
const initialState = {
  year: today.getFullYear(),
  month: today.getMonth()
};
// const realMonth = initialState.month + 1;
console.log(today);
console.log(initialState.month + 1);
console.log(initialState.year);

function DayCheck() {
  const [memo, setMemo] = useState([]);
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  // 날짜 관련
  const { year, month } = state;
  const yearMonth = `${year}.${month + 1}`;
  const lastDate = parseInt(new Date(year, month + 1, 0).getDate(), 10);
  const firstDay = parseInt(new Date(year, month, 1).getDay(), 10);

  // Month 감소
  const onDecreases = () => {
    dispatch({ type: "DECREMENT" });
    console.log(state);
    const Token = window.localStorage.getItem("AccessToken");
    axios({
      url: `https://dog-hoogam.site:8000/api/calendar/memo?month=${state.month}&year=${state.year}`,
      method: "get",
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setMemo(res.data);
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Month 증가
  const onIncreases = () => {
    dispatch({ type: "INCREMENT" });
  };

  useEffect(() => {
    const Token = window.localStorage.getItem("AccessToken");
    axios({
      url: `https://dog-hoogam.site:8000/api/calendar/memo?month=${state.month}&year=${state.year}`,
      method: "get",
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setMemo(res.data);
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.month, state.year]);
  console.log(memo);
  // console.log(state);
  return (
    <div className="Calendar">
      <div className="header">
        <button
          type="button"
          className="move fs-20 notoBold"
          onClick={onDecreases}
        >
          &lt;
        </button>
        <h1 className="fs-20 notoBold mx-4">{yearMonth}</h1>
        <button
          type="button"
          className="move fs-20 notoBold"
          onClick={onIncreases}
        >
          &gt;
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td className="text-center fs-16 notoBold">일</td>
            <td className="text-center fs-16 notoBold">월</td>
            <td className="text-center fs-16 notoBold">화</td>
            <td className="text-center fs-16 notoBold">수</td>
            <td className="text-center fs-16 notoBold">목</td>
            <td className="text-center fs-16 notoBold">금</td>
            <td className="text-center fs-16 notoBold">토</td>
          </tr>
        </thead>
        <tbody>{MakeCalendar({ year, month, firstDay, lastDate })}</tbody>
      </table>
    </div>
  );
}

export default React.memo(DayCheck);
