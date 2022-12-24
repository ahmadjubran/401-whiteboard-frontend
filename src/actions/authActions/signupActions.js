import axios from "axios";
import { requestSignup, signupFailed, signupSuccess } from "../../features/authSlicer";
import { getPosts } from "../postActions/getPostsActions";

export const signup = async (e, dispatch, toast) => {
  try {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    if (data.get("password") !== data.get("confirmPassword")) {
      return toast({
        title: "Error.",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }

    const user = {
      userName: data.get("username"),
      password: data.get("password"),
      role: data.get("role"),
      email: data.get("email"),
    };

    dispatch(requestSignup());
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/signup`, user)
      .then((res) => {
        if (res.status === 201) {
          dispatch(signupSuccess(res.data));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          getPosts(dispatch);
        }
      })
      .catch((err) => {
        dispatch(signupFailed(err.response.data));
        if (err.response.status === 409) {
          toast({
            title: "Error.",
            description: "Username or email already exists.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        } else if (err.response.status === 400) {
          if (err.response.data.includes("Password")) {
            toast({
              title: "Error.",
              description: (
                <div>
                  Password must contain:
                  <ul>
                    <li>At least 8 characters</li>
                    <li>At least 1 uppercase letter</li>
                    <li>At least 1 lowercase letter</li>
                    <li>At least 1 number</li>
                  </ul>
                </div>
              ),
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          }
          if (err.response.data.includes("Username")) {
            toast({
              title: "Error.",
              description: (
                <div>
                  Username must contain:
                  <ul>
                    <li>At least 3 characters</li>
                    <li>At most 20 characters</li>
                    <li>Only alphanumeric characters and underscore</li>
                  </ul>
                </div>
              ),
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          }
          if (err.response.data.includes("Email")) {
            toast({
              title: "Error.",
              description: "Invalid email.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          }
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
    dispatch(signupFailed(err.response.data));
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
