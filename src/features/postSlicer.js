import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    requestGetPosts: (state) => {
      state.loading = true;
    },
    getPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    getPostsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    requestAddPost: (state) => {
      state.loading = true;
    },
    addPostSuccess: (state, action) => {
      state.loading = false;
      state.posts = [...state.posts, action.payload];
    },
    addPostFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    requestDeletePost: (state) => {
      state.loading = true;
    },
    deletePostSuccess: (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    deletePostFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    requestUpdatePost: (state) => {
      state.loading = true;
    },
    updatePostSuccess: (state, action) => {
      state.loading = false;
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        } else {
          return post;
        }
      });
    },
    updatePostFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  requestGetPosts,
  getPostsSuccess,
  getPostsFailed,
  requestAddPost,
  addPostSuccess,
  addPostFailed,
  requestDeletePost,
  deletePostSuccess,
  deletePostFailed,
  requestUpdatePost,
  updatePostSuccess,
  updatePostFailed,
} = postSlice.actions;

export const postsState = (state) => state.post.posts;
export const loadingState = (state) => state.post.loading;
export const errorState = (state) => state.post.error;

export default postSlice.reducer;
