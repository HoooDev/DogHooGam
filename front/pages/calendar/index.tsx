import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
// import Calendar from "react-calendar";
import styles from "./index.module.scss";

// import "react-calendar/dist/Calendar.css";

import DayCheck from "../../components/calendar/cale/DayCheck";
import Todo from "../../components/calendar/Todo";
import WalkRecord from "../../components/calendar/WalkRecord";
// import CompoCard from "../../components/calendar/CompoCard";
import {
  getCalendarMemoApi,
  setMemos,
  setSelectDay
} from "../../redux/slice/calendarSlice";
import line from "../../public/icons/Line 1.svg";

const CalendarPage: NextPage = () => {
  // const [isUpdated, setIsUpdated] = useState();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [Tab, setTab] = useState("메모");
  function changeTab(e: any) {
    // console.log(e.target.innerText)
    setTab(e.target.innerText);
  }
  const today = new Date();
  const year = today.getFullYear(); // 년도4
  const month = today.getMonth() + 1; // 월
  const day = today.getDate(); // 날짜
  const dispatch = useDispatch();
  // 리덕스에 선택한 년,월,날짜 저장 기본값은 오늘날짜
  useEffect(() => {
    getCalendarMemoApi(month, year)
      .then((res) => {
        // setMemos(res);
        console.log(res);
        dispatch(setMemos(res));
        dispatch(setSelectDay({ year, month, day }));
        setIsUpdated(true);
      })
      .catch(() => console.error);
  }, []);

  let CalendarTab = null;
  if (Tab === "메모") {
    CalendarTab = <Todo isUpdated={isUpdated} />;
  } else if (Tab === "산책일지") {
    CalendarTab = <WalkRecord />;
  }
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.calendar}`}>
        {/* 캘린더를 만들던지 라이브러리 커스텀 하던지 고민고민~ */}
        <DayCheck />
      </div>
      <div className={`${styles.tab} flex justify-center`}>
        <div className="flex align-center">
          <div className={`${styles.isMemo}`} />
          <button
            type="button"
            className={`${
              Tab === "메모" ? styles.memo : styles.memo2
            } notoBold fs-20`}
            onClick={(e) => changeTab(e)}
          >
            메모
          </button>
        </div>
        <div className={`${styles.line}`}>
          <Image src={line} alt="구분선" />
        </div>
        <div className="flex align-center">
          <div className={`${styles.isWalk}`} />
          <button
            type="button"
            className={`${
              Tab === "산책일지" ? styles.record : styles.record2
            } notoBold fs-20`}
            onClick={(e) => changeTab(e)}
          >
            산책일지
          </button>
        </div>
      </div>
      {CalendarTab}
      {/* <div className={`${styles.compo}`}>
        <CompoCard />
      </div> */}
    </div>
  );
};

export default CalendarPage;
