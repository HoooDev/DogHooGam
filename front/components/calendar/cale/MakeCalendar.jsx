// import React, { useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { useSelector, useDispatch } from "react-redux";
import styles1 from "./DayCheck.module.scss";
import styles2 from "./MakeCalendar.module.scss";

import { transString } from "./CalcDate";

import { setSelectDay } from "../../../redux/slice/calendarSlice";

/*
 * 현재 날짜를 key값 형식으로 변환
 * key ex) 2021.10.11
 */
const returnIdx = (order, year, month, day) => {
  if (order === "PREV") {
    if (month === 0) {
      return transString(year - 1, 12, day);
    }
    return transString(year, month, day);
  }
  if (order === "NEXT") {
    if (month === 11) {
      return transString(year + 1, 1, day);
    }
    return transString(year, month + 2, day);
  }

  return transString(year, month + 1, day);
};

const MakeCalendar = ({ year, month, firstDay, lastDate }) => {
  const dispatch = useDispatch();
  function daySelect(e) {
    console.log(e.currentTarget.children[0].innerText);
    const newDay = Number(e.currentTarget.children[0].innerText);
    dispatch(setSelectDay({ year, month: month + 1, day: newDay }));
  }

  const result = [];
  const dayEvent = useSelector((state) => state.calendar.memos.res);
  const selectDay = useSelector((state) => state.calendar.selectDay);
  const makeDay = (week) => {
    const result2 = [];
    // 첫 주
    if (week === 1) {
      const prevLastDate = parseInt(new Date(year, month, 0).getDate(), 10);
      for (let i = 1; i <= 7; i += 1) {
        // 저번 달 날짜
        if (i <= firstDay) {
          const now = prevLastDate - firstDay + i;
          const idx = returnIdx("PREV", year, month, now);
          result2.push(
            <td className={`${styles1.diff} ${styles2.day}`} key={idx}>
              <h1>{now}</h1>
            </td>
          );
        }
        // 현재 달 날짜
        else {
          const now = i - firstDay;
          const idx = returnIdx("", year, month, now);
          let dayTag

          if (selectDay.year === year && selectDay.month === month+1 && selectDay.day === now) {
            dayTag = <td className={`${styles2.selectDay} ${styles1.caltd}`} onClick={(e) => daySelect(e)} key={idx}>
              <button className={`${styles2.dayButton}`} type="button">
                {now}
              </button>
              {dayEvent[now].length > 0 ? <div className="flex justify-center"><div className={`${styles2.isMemo}`} /></div> : null}
            </td>
          } else {
            dayTag = <td className={`${styles2.day} ${styles1.caltd}`} onClick={(e) => daySelect(e)} key={idx}>
              <button className={`${styles2.dayButton}`} type="button">
                {now}
              </button>
              {dayEvent[now].length > 0 ? <div className="flex justify-center"><div className={`${styles2.isMemo}`} /></div> : null}
            </td>
          }
          result2.push(dayTag);
        }
      }
    } else {
      const startDate = (week - 1) * 7;
      for (let i = startDate; i <= week * 7 - 1; i += 1) {
        // 현재 달 날짜
        if (i - firstDay < lastDate) {
          const now = i - firstDay + 1;
          const idx = returnIdx("", year, month, now);

          let dayTag
          if (selectDay.year === year && selectDay.month === month+1 && selectDay.day === now) {
            dayTag = <td className={`${styles2.selectDay} ${styles1.caltd}`} onClick={(e) => daySelect(e)} key={idx}>
              <button className={`${styles2.dayButton}`} type="button">
                {now}
              </button>
              {dayEvent[now].length > 0 ? <div className="flex justify-center"><div className={`${styles2.isMemo}`} /></div> : null}
            </td>
          } else {
            dayTag = <td className={`${styles2.day} ${styles1.caltd}`} onClick={(e) => daySelect(e)} key={idx}>
              <button className={`${styles2.dayButton}`} type="button">
                {now}
              </button>
              {dayEvent[now].length > 0 ? <div className="flex justify-center"><div className={`${styles2.isMemo}`} /></div> : null}
            </td>
          }
          result2.push(dayTag);
        }
        // 다음 달 날짜
        else {
          const now = i - lastDate - firstDay + 1;
          const idx = returnIdx("NEXT", year, month, now);

          result2.push(
            <td className={`${styles1.diff} ${styles2.day}`} key={idx}>
              <h1>{now}</h1>
              {/* { 리덕스에 날짜 [now]배열에 메모가있으면 ? (
                <img className="checkStamp" src={노란점?} alt="#" />
              ) : null} */}
            </td>
          );
        }
      }
    }
    return result2;
  };

  // 주 계산
  const week = Math.ceil((firstDay + lastDate) / 7);
  for (let i = 1; i <= week; i += 1) {
    result.push(<tr key={week + i}>{makeDay(i)}</tr>);
  }
  return result;
};

export default MakeCalendar;
