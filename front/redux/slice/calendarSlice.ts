/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../pages/api/index";

interface CalendarState {
  content: string;
  memoDate: {
    date: number;
    day: number;
    hours: number;
    minutes: number;
    month: number;
    nanos: number;
    seconds: number;
    time: number;
    timezoneOffset: number;
    year: number;
  };
  pk: number;
  memos: any[];
}

const initialState: CalendarState = {
  content: "",
  memoDate: {
    date: 0,
    day: 0,
    hours: 0,
    minutes: 0,
    month: 0,
    nanos: 0,
    seconds: 0,
    time: 0,
    timezoneOffset: 0,
    year: 0
  },
  pk: 0,
  memos: []
};

export const getCalendarMemoApi = async (month: number, year: number) => {
  const res = await axios.get(`/calendar/memo?month=${month}&year=${year}`);
  return res.data;
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setMemos: (state, action) => {
      state.memos = action.payload;
    }
  }
});

export const { setMemos } = calendarSlice.actions; // 액션 생성함수
export default calendarSlice.reducer; // 리듀서
