/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    getInfo: (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
    },

    delInfo: (state) => {
      state.userInfo = null;
    }
  }
});

export const { getInfo, delInfo } = user.actions; // 액션 생성함수
export default user.reducer; // 리듀서
