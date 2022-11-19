import axios from "axios";
import { actionType } from "../config/Constant";

export const fetchPosts = (dispatch) => {
  try {
    dispatch({ type: actionType.REQUEST_POSTS });
    const getPosts = async () => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/post`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    };

    const showPosts = async () => {
      const posts = await getPosts();
      dispatch({ type: actionType.FETCH_POSTS_SUCCESS, payload: posts });
    };
    showPosts();
  } catch (error) {
    dispatch({ type: actionType.FETCH_POSTS_FAILED, payload: error });
  }
};
