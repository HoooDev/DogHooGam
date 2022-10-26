/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

interface State {
  loading: boolean;
  success: boolean;
  error: any;
  lat: number;
  lon: number;
  isWalkingStarted: boolean;
}

interface Location {
  lat: number;
  lon: number;
}

const initialState: State = {
  loading: false,
  success: false,
  error: null,
  lat: 33.450701,
  lon: 126.570667,
  isWalkingStarted: false
}; // 초기 상태 정의

export const startWalking = createAsyncThunk(
  "walk/startWalking",
  async ({ location }, thunkAPI) => {
    try {
      console.log(location);
      // const res = await axios.post("/walk/start", { location });
      // const { data } = res;
      // return thunkAPI.fulfillWithValue(data);
      return thunkAPI.fulfillWithValue(null);
    } catch (error) {
      return thunkAPI.rejectWithValue((error as any).response.data);
    }
  }
);

const walkSlice = createSlice({
  name: "walk",
  initialState,
  reducers: {
    setCurLocation: (state, { payload }) => {
      state.lat = payload.lat;
      state.lon = payload.lon;
    },
    stopWalking: (state) => {
      state.isWalkingStarted = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(startWalking.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.isWalkingStarted = true;
    });
    builder.addCase(startWalking.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(startWalking.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  }
});

export const { stopWalking } = walkSlice.actions; // 액션 생성함수
export default walkSlice.reducer; // 리듀서
