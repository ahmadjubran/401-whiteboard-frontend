const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

export const initialState = {
  user: userInfo,
  token: token,
  error: null,
  loading: false,
  isAuth: token ? true : false,
};

export const initialPostState = {
  posts: [],
  loading: false,
  error: null,
};
