import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { data } = action.payload;
      state.user = data.user;
      state.token = data.accessToken;
    },
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user.user;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth?.user;

export const selectCurrentToken = (state) => state.auth?.token;
