import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlicer";
import postReducer from "../features/postSlicer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});
