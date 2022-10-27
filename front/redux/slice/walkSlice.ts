/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

interface WalkState {
  loading: boolean;
  success: boolean;
  error: any;
  lat: number;
  lon: number;
  isWalkingStarted: boolean;
  others: any[];
}

interface Location {
  lat: number;
  lon: number;
}

type Any = any;

const initialState: WalkState = {
  loading: false,
  success: false,
  error: null,
  lat: 33.450701,
  lon: 126.570667,
  isWalkingStarted: false,
  others: []
}; // 초기 상태 정의

export const startWalking = createAsyncThunk<
  // Return type of the payload creator
  Any,
  // First argument to the payload creator
  Location
  // Types for ThunkAPI
>("walk/startWalking", async (location) => {
  try {
    // const res = await fetch(`/walk/${location}`);
    // if (res.status === 400) {
    //   // Return the known error for future handling
    //   return (await res.json()) as MyKnownError;
    // }
    // return (await res.json()) as any;
  } catch (error) {
    console.error(error);
  }
});

export const nowWalking = createAsyncThunk<Any, Location>(
  // Types for ThunkAPI
  "walk/nowWalking",
  async () => {
    try {
      // const res = await fetch(`/walk/now`);
      // if (res.status === 400) {
      //   return (await res.json()) as MyKnownError;
      // }
      // return (await res.json()) as any;
    } catch (error) {
      console.error(error);
    }
  }
);

export const stopWalking = createAsyncThunk<Any>(
  // Types for ThunkAPI
  "walk/stopWalking",
  async () => {
    try {
      // const res = await fetch(`/walk/stop`);
      // if (res.status === 400) {
      //   return (await res.json()) as MyKnownError;
      // }
      // return (await res.json()) as any;
    } catch (error) {
      console.error(error);
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

    builder.addCase(nowWalking.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(nowWalking.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(nowWalking.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(stopWalking.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.isWalkingStarted = false;
    });
    builder.addCase(stopWalking.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(stopWalking.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  }
});

export const { setCurLocation } = walkSlice.actions; // 액션 생성함수
export default walkSlice.reducer; // 리듀서
