/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = { isWalkingStarted: false }; // 초기 상태 정의

const walkSlice = createSlice({
  name: "walk",
  initialState,
  reducers: {
    startWalking: (state) => {
      state.isWalkingStarted = true;
    },
    stopWalking: (state) => {
      state.isWalkingStarted = false;
    }
  },
  extraReducers: {}
});

export const { startWalking, stopWalking } = walkSlice.actions; // 액션 생성함수
export default walkSlice.reducer; // 리듀서
