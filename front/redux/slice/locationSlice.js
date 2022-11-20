/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationInfo: null
};

export const location = createSlice({
  name: "location",
  initialState,
  reducers: {
    getLocation: (state, action) => {
      state.locationInfo = action.payload;
    }
  }
});

export const { getLocation } = location.actions;
export default location.reducer;
