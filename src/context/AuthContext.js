import axios from "axios";
import base64 from "base-64";
import { createContext, useState } from "react";
import cookies from "react-cookies";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState("");
  const [capabilties, setCapabilties] = useState();
  const [userId, setUserId] = useState();

  const handleSignin = async (e) => {
    e.preventDefault();

    const user = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const encoded = base64.encode(`${user.username}:${user.password}`);
    try {
      await axios
        .post(
          `https://whiteboard-backend-3000.herokuapp.com/login`,
          {},
          {
            headers: {
              Authorization: `Basic ${encoded}`,
            },
          }
        )
        .then(async (res) => {
          if (res.status === 200) {
            setIsAuth(true);
            cookies.save("token", res.data.token);
            cookies.save("username", res.data.User.userName);
            cookies.save("role", res.data.User.role);
            cookies.save("userId", res.data.User.id);
            cookies.save("capabilities", res.data.User.capabilities);
            setUserId(res.data.User.id);
            setRole(res.data.User.role);
            setCapabilties(res.data.User.capabilities);
            window.location.href = "/";
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirmPassword.value) {
      alert("Passwords do not match");
      return;
    }
    const user = {
      userName: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
      role: e.target.role.value,
    };
    try {
      await axios
        .post(`https://whiteboard-backend-3000.herokuapp.com/signup`, {
          userName: user.userName,
          password: user.password,
          email: user.email,
          role: user.role,
        })
        .then((res) => {
          if (res.status === 201) {
            setIsAuth(true);
            cookies.save("token", res.data.token);
            cookies.save("username", res.data.User.userName);
            cookies.save("userId", res.data.User.id);
            cookies.save("role", res.data.User.role);
            cookies.save("capabilities", res.data.User.capabilities);
            setUserId(res.data.User.id);
            setRole(res.data.User.role);
            setCapabilties(res.data.User.capabilities);
            window.location.href = "/";
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      cookies.remove("token");
      cookies.remove("username");
      cookies.remove("userId");
      cookies.remove("role");
      cookies.remove("capabilities");
      setUserId();
      setRole("");
      setCapabilties();
      setIsAuth(false);
    } catch (err) {
      console.log(err);
    }
  };

  const canDo = (cap, id) => {
    if (role === "admin") {
      return true;
    }
    if ((cap === "delete", "update")) {
      if (Number(userId) === id) {
        return true;
      }
    }
    return false;
  };

  const checkToken = () => {
    const token = cookies.load("token");
    const role = cookies.load("role");
    const userId = cookies.load("userId");
    if (token) {
      setIsAuth(true);
      setUserId(userId);
      setRole(role);
      setCapabilties(cookies.load("capabilties"));
    }
  };

  const value = {
    isAuth,
    setIsAuth,
    role,
    setRole,
    userId,
    setUserId,
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
