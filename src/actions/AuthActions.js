import axios from "axios";
import { actionType } from "../config/Constant";

export const login = (dispatch, payload) => {
  try {
    dispatch({ type: actionType.REQUEST_LOGIN });
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {},
        {
          headers: {
            Authorization: `Basic ${payload}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionType.LOGIN_SUCCESS,
            payload: res.data,
          });
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data.User));
          window.location.href = "/post";
        }
      })
      .catch((err) => {
        dispatch({
          type: actionType.LOGIN_FAILED,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: actionType.LOGIN_FAILED,
      payload: err,
    });
  }
};

export const signup = (dispatch, payload) => {
  try {
    dispatch({ type: actionType.REQUEST_SIGNUP });
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
        userName: payload.userName,
        password: payload.password,
        email: payload.email,
        role: payload.role,
      })
      .then((res) => {
        if (res.status === 201) {
          dispatch({
            type: actionType.SIGNUP_SUCCESS,
            payload: res.data,
          });
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data.User));
          window.location.href = "/post";
        }
      })
      .catch((err) => {
        dispatch({
          type: actionType.SIGNUP_FAILED,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: actionType.SIGNUP_FAILED,
      payload: err,
    });
  }
};

export const logout = (dispatch) => {
  dispatch({ type: actionType.LOGOUT });
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
};
