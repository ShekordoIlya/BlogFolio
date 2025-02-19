import { createSlice } from "@reduxjs/toolkit";

const myThemSlice = createSlice({
  name: "myAppTheme",
  initialState: {
    theme: "dark",
  },
  reducers: {
    switchTheme(state, action) {
      console.log(action);
      state.theme = action.payload;
    },
  },
});
export const { switchTheme } = myThemSlice.actions;
export default myThemSlice.reducer;
