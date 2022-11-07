import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import moment, { Moment as MomentTypes } from "moment";
import { Image } from "next/image";
import styles from "./Calendar.module.scss";

import arrow from "../../public/icons/expand.svg";

function MakeCalendar() {
  // 캐로셀 세팅
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const [date, setdate] = useState<moment.Moment>(() => moment());

  // func
  const handleDayClick = (current: moment.Moment) => setdate(current);
  const returnToday = () => setdate(moment());
  const jumpToMonth = (num: number) =>
    num
      ? setdate(date.clone().add(30, "day"))
      : setdate(date.clone().subtract(30, "day"));

  // chalandar generate logic..
  function generate() {
    // 님 날짜 뭐 눌렀어요? (초기값은 오늘)
    const today = date;

    // startOf('month') : 이번 달의 첫번 째 날로 설정 set to the first of this month, 12:00 am
    // week() : Week of Year. 이번 년도의 몇번째 주인가? => 3월 8일이면 10이겠죠?
    const startWeek = today.clone().startOf("month").week();

    // endOf('month').week() : 이번 달의 마지막 날로 설정 한 후 그것이 이번 년도의 몇번째 주인지 체크
    // 만약 이번 해의 첫번째 주(1월 1일이 속한 주)라면 53으로 세팅, 아니라면 그대로 유지
    // 이런 작업의 이유는 마지막 주가 첫 주가 될 수 없기 때문에 당 연한 것임
    const endWeek =
      today.clone().endOf("month").week() === 1
        ? 53
        : today.clone().endOf("month").week();

    const calendar = [];

    // 시작 주부터 마지막 주까지 +1 씩 증가시킴
    // 이제 주마다 일을 표기해야 하므로 len이 7인 arr를 생성 후 index를 기반으로 day를 표기하자
    // eslint-disable-next-line no-plusplus

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className={`${styles.num} flex notoMid fs-18`} key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              // 오늘 => 주어진 주의 시작 => n + i일 만큼 더해서 각 주의 '일'을 표기한다.
              const current = today
                .clone()
                .week(week)
                .startOf("week")
                .add(n + i, "day");

              // 오늘이 current와 같다면 우선 '선택'으로 두자
              let isSelected =
                today.format("YYYYMMDD") === current.format("YYYYMMDD")
                  ? "selected"
                  : "";

              // 만약, 이번 달이 아닌 다른 달의 날짜라면 회색으로 표시하자

              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  onClick={() => handleDayClick(current)}
                  // 여기에 선택되었을 때 색깔 css를 넣자
                >
                  <span
                    className={`${
                      isSelected === "selected" ? styles.celenum : styles.text
                    } notoBold fs-20`}
                  >
                    {current.format("D")}
                  </span>
                </div>
              );
            })}
        </div>
      );
    }
    return calendar;
  }
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.header}`}>
        <div className={`${styles.head}`}>
          <span className="notoBold fs-24">{date.format("MM월")}</span>
          <div className="util-button">
            <button type="button" onClick={() => jumpToMonth(0)}>
              {/* <i className="fas fa-angle-left" /> */}
            </button>
            <button type="button" onClick={returnToday}>
              Today
            </button>
            <button type="button" onClick={() => jumpToMonth(1)}>
              <i className="fas fa-angle-right" />
              {/* <Image src={arrow} alt="다음달" /> */}
            </button>
          </div>
        </div>
      </div>
      <Slider {...settings}>
        <div className={`${styles.body}`}>
          <div className={`${styles.wrap} flex notoMid fs-18`}>
            {[
              "일",
              "월",
              "화",
              "수",
              "목",
              "금",
              "토",
              "일",
              "월",
              "화",
              "수",
              "목",
              "금",
              "토",
              "일",
              "월",
              "화",
              "수",
              "목",
              "금",
              "토",
              "일",
              "월",
              "화",
              "수",
              "목",
              "금",
              "토",
              "일",
              "월",
              "화",
              "수",
              "목",
              "금",
              "토"
            ].map((el) => (
              <div className={`${styles.date} notoMid fs-18`} key={el}>
                <span>{el}</span>
              </div>
            ))}
          </div>
          <div className={`${styles.day} flex`}>{generate()}</div>
        </div>
      </Slider>
    </div>
  );
}

export default MakeCalendar;
