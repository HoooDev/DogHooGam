/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../pages/api/index";

interface WalkState {
  loading: boolean;
  success: boolean;
  error: any;
  // lat: number;
  // lon: number;
  isWalkingStarted: boolean;
  others: any[];
  selectedDogs: any[];
  start: number;
  end: number;
  // path: any[];
  totalDist: string;
  isPaused: boolean;
  personId: string;
}

type Any = any;

const initialState: WalkState = {
  loading: false,
  success: false,
  error: null,
  // lat: 33.450701,
  // lon: 126.570667,
  isWalkingStarted: false,
  others: [],
  selectedDogs: [],
  start: 0,
  end: 0,
  // path: [],
  totalDist: "0.00",
  isPaused: false,
  personId: ""
}; // 초기 상태 정의

export const startWalking = createAsyncThunk<
  // Return type of the payload creator
  Any,
  // First argument to the payload creator
  { dogPk: number[]; dogState: number; lat: number; lng: number }
  // Types for ThunkAPI
>("walk/startWalking", async (data) => {
  try {
    const res = await axios.post("/walk", data);
    if (res.status === 200) {
      return res.data;
    }
    return res;
  } catch (err) {
    console.error(err);
  }
});

export const nowWalking = createAsyncThunk<
  Any,
  { lat: number; lng: number; personId: string }
>(
  // Types for ThunkAPI
  "walk/nowWalking",
  async ({ lat, lng, personId }) => {
    console.log("personId", personId);
    try {
      const res = await axios.post("/walk/waking", { lat, lng, personId });
      console.log(res);
      if (res.status === 200) {
        return res.data;
      }
      return res;
    } catch (err) {
      console.error(err);
    }
  }
);

export const finishWalking = createAsyncThunk<Any, string>(
  // Types for ThunkAPI
  "walk/finishWalking",
  async (totalDist) => {
    try {
      console.log(totalDist);
      // const res = await fetch(`/walk/stop`);
      // if (res.status === 400) {
      //   return (await res.json()) as MyKnownError;
      // }
      // return (await res.json()) as any;
    } catch (err) {
      console.error(err);
    }
  }
);

const walkSlice = createSlice({
  name: "walk",
  initialState,
  reducers: {
    // setCurLocation: (state, { payload }) => {
    //   state.lat = payload.lat;
    //   state.lon = payload.lon;
    // },
    toggleSelectedDogs: (state, { payload }) => {
      console.log(state.selectedDogs);
      if (state.selectedDogs.find((dog) => dog.id === payload.id)) {
        state.selectedDogs = state.selectedDogs.filter(
          (dog) => dog.id !== payload.id
        );
      } else {
        state.selectedDogs.push(payload);
      }
    },
    resetWalking: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.others = [];
      state.selectedDogs = [];
      state.start = 0;
      state.end = 0;
      // state.path = [];
      state.totalDist = "0.00";
      state.isPaused = false;
      state.personId = "";
    },
    // pushPath: (state, { payload }) => {
    //   state.path.push(payload);
    // },
    saveDistance: (state, { payload }) => {
      let tmp = state.totalDist + payload;
      tmp = parseFloat(tmp.toString()).toFixed(2);
      tmp = parseFloat(tmp).toFixed(2);
      console.log("tmp", tmp);
      state.totalDist = tmp;
    },
    restartWalking: (state) => {
      state.isPaused = false;
    },
    pauseWalking: (state) => {
      state.isPaused = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(startWalking.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(startWalking.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.isWalkingStarted = true;
      state.start = Date.now();
      console.log("이때 저장", payload);
      state.personId = payload;
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
      // state.path.push(payload);
    });
    builder.addCase(nowWalking.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(finishWalking.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(finishWalking.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.isWalkingStarted = false;
      state.end = Date.now();
      console.log((state.end - state.start) / 1000, "초 동안 산책했음");
    });
    builder.addCase(finishWalking.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  }
});

export const {
  // setCurLocation,
  toggleSelectedDogs,
  // pushPath,
  saveDistance,
  pauseWalking,
  restartWalking,
  resetWalking
} = walkSlice.actions; // 액션 생성함수
export default walkSlice.reducer; // 리듀서
