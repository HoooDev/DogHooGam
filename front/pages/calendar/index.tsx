import type { NextPage } from "next";
import styles from "./index.module.scss";

import DogProfile from "../../components/calendar/DogProfile";

function Calendar() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`$`}>

      </div>
      <DogProfile />
      <DogProfile />
    </div>
  );
}

export default Calendar;
