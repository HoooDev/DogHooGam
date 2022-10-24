import styles from "./MainCalendar.module.scss";

function MainCalendar() {
  const date: Date = new Date();
  const day: Array<string> = ["일", "월", "화", "수", "목", "금", "토"];
  console.log(day[date.getDay()]);

  return (
    <div className={`${styles.calendar} flex`}>
      <div className={`${styles.calendarY}`}>
        <h1 className="fs-12 notoMid">{day[date.getDay()]}요일</h1>
        <h1 className="fs-24 notoBold">{date.getDate()}일</h1>
        <div className={`${styles.calendarS}`}>오늘 일정</div>
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
