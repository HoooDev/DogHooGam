import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
// import Calendar from "react-calendar";
import styles from "./index.module.scss";

// import "react-calendar/dist/Calendar.css";

import DayCheck from "../../components/calendar/cale/DayCheck";
import Todo from "../../components/calendar/Todo";
import WalkRecord from "../../components/calendar/WalkRecord";
// import CompoCard from "../../components/calendar/CompoCard";

import line from "../../public/icons/Line 1.svg";

const CalendarPage: NextPage = () => {
  const [Tab, setTab] = useState("메모");
  let CalendarTab = null;
  if (Tab === "메모") {
    CalendarTab = <Todo />;
  } else if (Tab === "산책일지") {
    CalendarTab = <WalkRecord />;
  }
  function changeTab(e: any) {
    // console.log(e.target.innerText);
    setTab(e.target.innerText);
  }

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.calendar}`}>
        {/* 캘린더를 만들던지 라이브러리 커스텀 하던지 고민고민~ */}
        <DayCheck />
      </div>
      <div className={`${styles.tab} flex justify-center`}>
        <button
          type="button"
          className={`${Tab === "메모" ? styles.memo : ""} notoBold fs-20`}
          onClick={(e) => changeTab(e)}
        >
          메모
        </button>
        <div className={`${styles.line}`}>
          <Image src={line} alt="구분선" />
        </div>
        <button
          type="button"
          className={`${
            Tab === "산책일지" ? styles.record : ""
          } notoBold fs-20`}
          onClick={(e) => changeTab(e)}
        >
          산책일지
        </button>
      </div>
      {CalendarTab}
      {/* <div className={`${styles.compo}`}>
        <CompoCard />
      </div> */}
    </div>
  );
};

export default CalendarPage;
