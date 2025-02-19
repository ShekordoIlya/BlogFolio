import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "counter",
  initialState: {
    count: 10,
  },
  reducers: {
    increment(state, action) {
      state.count = state.count + action.payload;
      //   state.count += 1;
    },
  },
});
export const { increment } = countSlice.actions;
export default countSlice.reducer;
