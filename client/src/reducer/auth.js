import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedInSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loggedOut(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    loggedFaillure(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loggedFaillure, loggedInSuccess, loggedOut } = authSlice.actions;
export default authSlice.reducer;
