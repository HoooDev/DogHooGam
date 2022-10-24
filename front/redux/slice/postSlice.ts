import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: []
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.posts = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const postActions = postSlice.actions;

export default postSlice.reducer;
