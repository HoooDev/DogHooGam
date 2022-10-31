import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
// 컴포넌트
import DogProfile from "../../components/calendar/DogProfile";
import Todo from "../../components/calendar/Todo";
import Memory from "../../components/calendar/Memory";
import WalkRecord from "../../components/calendar/WalkRecord";
// 이미지
import line from "../../public/icons/Line 1.svg";
import arrow from "../../public/icons/expand.svg";

const Calendar: NextPage = () => {
  // 탭 변환
  const [Tab, setTab] = useState("메모");
  let CalendarTab = null;
  if (Tab === "메모") {
    CalendarTab = <Todo />;
  } else if (Tab === "산책일지") {
    CalendarTab = <WalkRecord />;
  } else if (Tab === "추억기록") {
    CalendarTab = <Memory />;
  }
  function changeTab(e: any) {
    // console.log(e.target.innerText);
    setTab(e.target.innerText);
  }

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.profile}`}>
        <div className={`${styles.procom}`}>
          <DogProfile />
        </div>
        <div className={`${styles.selbox} flex`}>
          <button
            id="Todo"
            type="button"
            className={`${
              Tab === "메모" ? styles.selecttxt1 : styles.seltxt1
            } notoBold fs-20`}
            onClick={(e) => changeTab(e)}
          >
            메모
          </button>
          <Image src={line} alt="선" />
          <button
            id="WalkRecord"
            type="button"
            className={`${
              Tab === "산책일지" ? styles.selecttxt2 : styles.seltxt2
            } notoBold fs-20`}
            onClick={(e) => changeTab(e)}
          >
            산책일지
          </button>
          <Image src={line} alt="선" />
          <button
            id="Memory"
            type="button"
            className={`${
              Tab === "추억기록" ? styles.selecttxt3 : styles.seltxt3
            } notoBold fs-20`}
            onClick={(e) => changeTab(e)}
          >
            추억기록
          </button>
        </div>
      </div>
      <div className={`${styles.cal} flex`}>
        <div className={`${styles.month}`}>
          <div className={`${styles.monthname} notoBold fs-24`}>10월</div>
          <Image src={arrow} alt="화살표" />
        </div>
        <div>
          <div className={`${styles.dayname} flex`}>
            <p className={`${styles.dayname} notoMid fs-18`}>일</p>
            <p className={`${styles.dayname} notoMid fs-18`}>월</p>
            <p className={`${styles.dayname} notoMid fs-18`}>화</p>
            <p className={`${styles.dayname} notoMid fs-18`}>수</p>
            <p className={`${styles.dayname} notoMid fs-18`}>목</p>
            <p className={`${styles.dayname} notoMid fs-18`}>금</p>
            <p className={`${styles.dayname} notoMid fs-18`}>토</p>
          </div>
          <div className={`${styles.date} flex`}>
            <p className={`${styles.date} notoMid fs-18`}>15</p>
            <p className={`${styles.date} notoMid fs-18`}>16</p>
            <p className={`${styles.date} notoMid fs-18`}>17</p>
            <p className={`${styles.date} notoMid fs-18`}>18</p>
            <p className={`${styles.date} notoMid fs-18`}>19</p>
            <p className={`${styles.date} notoMid fs-18`}>20</p>
            <p className={`${styles.date} notoMid fs-18`}>21</p>
          </div>
        </div>
      </div>
      <div>{CalendarTab}</div>
    </div>
  );
};

export default Calendar;
