import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    userLogin: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.userInfo = payload;
    },
    userLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    setError: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {setLoading, setError, userLogin, userLogout} =
  userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user;
