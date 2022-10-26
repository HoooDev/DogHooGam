import type { NextPage } from "next";
import Image from "next/image";
import styles from "./index.module.scss";

import DogProfile from "../../components/calendar/DogProfile";
import line from "../../public/icons/Line 1.svg";
import arrow from "../../public/icons/expand.svg";

const Calendar: NextPage = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.profile}`}>
        <div className={`${styles.procom} flex`}>
          <DogProfile />
          <DogProfile />
          <DogProfile />
        </div>
        <div className={`${styles.selbox} flex`}>
          <button type="button" className={`${styles.seltxt1} notoBold fs-20`}>
            메모
          </button>
          <Image src={line} alt="선" />
          <button type="button" className={`${styles.seltxt2} notoBold fs-20`}>
            산책일지
          </button>
          <Image src={line} alt="선" />
          <button type="button" className={`${styles.seltxt3} notoBold fs-20`}>
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
    </div>
  );
};

export default Calendar;
