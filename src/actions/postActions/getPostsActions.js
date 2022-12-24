import axios from "axios";
import { getPostsFailed, getPostsSuccess, requestGetPosts } from "../../features/postSlicer";

export const getPosts = (dispatch) => {
  try {
    dispatch(requestGetPosts());
    const getPosts = async () => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/post`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    };

    const showPosts = async () => {
      const posts = await getPosts();
      dispatch(getPostsSuccess(posts));
    };
    showPosts();
  } catch (error) {
    dispatch(getPostsFailed(error));
  }
};
