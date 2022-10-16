import base64 from "base-64";
import { createContext, useReducer, useState } from "react";
import { login, signup, logout } from "../actions/AuthActions";
import { initialState } from "../config/Initials";
import { AuthReducer } from "../reducers/AuthReducer";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({
    userId: "",
    userName: "",
    role: "",
    capabilities: [],
  });

  const [userState, dispatch] = useReducer(AuthReducer, initialState);

  const handleSignin = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const user = {
      username: data.get("username"),
      password: data.get("password"),
    };
    const encoded = base64.encode(`${user.username}:${user.password}`);

    login(dispatch, encoded);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    if (data.get("password") !== data.get("confirmPassword")) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      userName: data.get("username"),
      password: data.get("password"),
      role: data.get("role"),
      email: data.get("email"),
    };

    signup(dispatch, user);
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    logout(dispatch);
  };

  const canDo = (cap, id) => {
    if (userState.user.capabilities.includes(cap)) {
      return true;
    }
    if (id === Number(userState.user.id)) {
      return true;
    }
    return false;
  };

  const checkToken = () => {
    const token = userState.token;
    if (token) {
      setIsAuth(true);
      setUser({
        userId: userState.user.userId,
        userName: userState.user.userName,
        role: userState.user.role,
        capabilities: userState.user.capabilities,
      });
    }
  };

  const value = {
    isAuth,
    setIsAuth,
    user,
    setUser,
    userState,
    handleSignin,
    handleSignup,
    handleLogout,
    canDo,
    checkToken,
  };

  return (
    <AuthContext.Provider value={{ ...value }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
