import axios from "axios";
import base64 from "base-64";
import { loginFailed, loginSuccess, requestLogin } from "../../features/authSlicer";
import { getPosts } from "../postActions/getPostsActions";

export const login = async (e, dispatch, toast) => {
  try {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const user = {
      identifier: data.get("identifier"),
      password: data.get("password"),
    };

    const encoded = base64.encode(`${user.identifier}:${user.password}`);

    dispatch(requestLogin());
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/login`, {}, { headers: { Authorization: `Basic ${encoded}` } })
      .then((res) => {
        if (res.status === 200) {
          dispatch(loginSuccess(res.data));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          getPosts(dispatch);
        }
      })
      .catch((err) => {
        dispatch(loginFailed(err.response.data));
        if (err.response.status === 403) {
          toast({
            title: "Error.",
            description: "Invalid username or password.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        } else {
          toast({
            title: "Error.",
            description: "Something went wrong.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      });
  } catch (err) {
    dispatch(loginFailed(err.response.data));
    toast({
      title: "Error.",
      description: "Something went wrong.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }
};
