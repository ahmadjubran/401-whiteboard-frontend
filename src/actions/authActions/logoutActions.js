import { logoutFailed, logoutSuccess, requestLogout } from "../../features/authSlicer";

export const logout = async (dispatch, toast) => {
  dispatch(requestLogout());
  try {
    dispatch(logoutSuccess());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (err) {
    dispatch(logoutFailed(err.response.data));
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
