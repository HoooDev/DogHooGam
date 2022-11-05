/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../pages/api/index";

interface Location {
  lat: number;
  lng: number;
}

interface WalkState {
  loading: boolean;
  success: boolean;
  error: any;
  isWalkingStarted: boolean;
  others: any[];
  selectedDogs: any[];
  // start: number;
  // end: number;
  totalDist: string;
  isPaused: boolean;
  personId: string;
  center: {
    lat: number;
    lng: number;
  };
  paths: Location[];
  time: number;
}

const initialState: WalkState = {
  loading: false,
  success: false,
  error: null,
  isWalkingStarted: false,
  others: [],
  selectedDogs: [],
  // start: 0,
  // end: 0,
  totalDist: "0.00",
  isPaused: false,
  personId: "",
  center: {
    lat: 0,
    lng: 0
  },
  paths: [],
  time: 0
}; // 초기 상태 정의

export const startWalkingApi = async (data: any) => {
  const res = await axios.post("/walk", data);
  return res.data;
};

export const nowWalkingApi = async (data: any) => {
  const res = await axios.post("/walk/waking", data);
  return res.data;
};

export const finishWalkingApi = async (data: any) => {
  const res = await axios.post("/walk/end", data);
  return res.data;
};

const walkSlice = createSlice({
  name: "walk",
  initialState,
  reducers: {
    startWalking: (state, { payload }) => {
      state.isWalkingStarted = true;
      state.personId = payload;
    },
    // nowWalking: (state, { payload }) => {
    // },
    finishWalking: (state) => {
      state.isWalkingStarted = false;
    },
    toggleSelectedDogs: (state, { payload }) => {
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
      state.totalDist = "0.00";
      state.isPaused = false;
      state.personId = "";
      state.center = {
        lat: 0,
        lng: 0
      };
      state.paths = [];
      state.time = 0;
    },
    pushPaths: (state, { payload }) => {
      state.paths.push(payload);
    },
    saveDistance: (state, { payload }) => {
      let tmp = state.totalDist + payload;
      tmp = parseFloat(tmp.toString()).toFixed(2);
      tmp = parseFloat(tmp).toFixed(2);
      state.totalDist = tmp;
    },
    restartWalking: (state) => {
      state.isPaused = false;
    },
    pauseWalking: (state) => {
      state.isPaused = true;
    },
    saveTime: (state, { payload }) => {
      state.time = payload;
    }
  }
  // extraReducers: (builder) => {
  //   builder.addCase(startWalking.pending, (state) => {
  //     state.loading = true;
  //     state.success = false;
  //     state.error = null;
  //   });
  //   builder.addCase(startWalking.fulfilled, (state, { payload }) => {
  //     state.loading = false;
  //     state.success = true;
  //     state.error = null;
  //     state.isWalkingStarted = true;
  //     state.start = Date.now();
  //     state.personId = payload;
  //     console.log("이때 저장", payload, current(state.selectedDogs));
  //   });
  //   builder.addCase(startWalking.rejected, (state, { payload }) => {
  //     state.loading = false;
  //     state.success = false;
  //     state.error = payload;
  //   });

  //   builder.addCase(nowWalking.pending, (state) => {
  //     state.loading = true;
  //     state.success = false;
  //     state.error = null;
  //   });
  //   builder.addCase(nowWalking.fulfilled, (state) => {
  //     state.loading = false;
  //     state.success = true;
  //     state.error = null;
  //   });
  //   builder.addCase(nowWalking.rejected, (state, { payload }) => {
  //     state.loading = false;
  //     state.success = false;
  //     state.error = payload;
  //   });

  //   builder.addCase(finishWalking.pending, (state) => {
  //     state.loading = true;
  //     state.success = false;
  //     state.error = null;
  //   });
  //   builder.addCase(finishWalking.fulfilled, (state) => {
  //     state.loading = false;
  //     state.success = true;
  //     state.error = null;
  //     state.isWalkingStarted = false;
  //     state.end = Date.now();
  //     console.log((state.end - state.start) / 1000, "초 동안 산책했음");
  //   });
  //   builder.addCase(finishWalking.rejected, (state, { payload }) => {
  //     state.loading = false;
  //     state.success = false;
  //     state.error = payload;
  //   });
  // }
});

export const {
  startWalking,
  finishWalking,
  toggleSelectedDogs,
  pushPaths,
  saveDistance,
  pauseWalking,
  restartWalking,
  resetWalking,
  saveTime
} = walkSlice.actions; // 액션 생성함수
export default walkSlice.reducer; // 리듀서
