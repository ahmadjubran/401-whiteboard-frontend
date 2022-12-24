import { createSlice } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const initialState = {
  user: userInfo,
  token: token,
  error: null,
  loading: false,
  isAuth: token ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestLogin: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailed: (state, action) => {
      state.isAuth = false;
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    requestSignup: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.isAuth = true;
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signupFailed: (state, action) => {
      state.isAuth = false;
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    requestLogout: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.isAuth = false;
      state.loading = false;
      state.user = null;
      state.token = null;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const isAuthState = (state) => state.auth.isAuth;
export const userState = (state) => state.auth.user;
export const tokenState = (state) => state.auth.token;
export const errorState = (state) => state.auth.error;
export const loadingState = (state) => state.auth.loading;

export const {
  requestLogin,
  loginSuccess,
  loginFailed,
  requestSignup,
  signupSuccess,
  signupFailed,
  requestLogout,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
