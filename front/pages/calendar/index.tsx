import type { NextPage } from "next";
import styles from "./index.module.scss";

import DogProfile from "../../components/calendar/DogProfile";

const Calendar: NextPage = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.profile}`}>
        <div className={`${styles.procom} flex`}>
          <DogProfile />
          <DogProfile />
          <DogProfile />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
