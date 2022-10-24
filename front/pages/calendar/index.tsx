import type { NextPage } from "next";
import styles from "./index.module.scss";

import DogProfile from "../../components/calendar/DogProfile";

function Calendar(): JSX.Element {
  return (
    <><div>캘린더</div><DogProfile /></>
  )
}

export default Calendar;
