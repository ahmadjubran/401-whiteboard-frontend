import { actionType } from "../config/Constant";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case actionType.REQUEST_LOGIN:
      return {
        ...state,
        isAuth: false,
        isLoading: true,
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: action.payload,
        token: action.payload.token,
      };
    case actionType.LOGIN_FAILED:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        user: null,
        error: action.payload,
      };
    case actionType.REQUEST_SIGNUP:
      return {
        ...state,
        isAuth: false,
        isLoading: true,
      };
    case actionType.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: action.payload,
        token: action.payload.token,
      };
    case actionType.SIGNUP_FAILED:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        user: null,
        error: action.payload,
      };
    case actionType.LOGOUT:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
}