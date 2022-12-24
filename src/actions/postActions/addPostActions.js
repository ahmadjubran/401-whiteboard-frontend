import axios from "axios";
import { addPostFailed, addPostSuccess, requestAddPost } from "../../features/postSlicer";
import { getPosts } from "./getPostsActions";

export const addPost = async (e, dispatch, user, token) => {
  try {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const post = {
      title: data.get("title"),
      content: data.get("content"),
    };

    dispatch(requestAddPost());
    if (post.title === "" || post.content === "") {
      return dispatch(addPostFailed("Please fill in all fields"));
    } else {
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/post/${user.id}`, post, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(addPostSuccess(res.data));
          getPosts(dispatch);
          e.target.reset();
        })
        .catch((err) => {
          dispatch(addPostFailed(err.response.data));
        });
    }
  } catch (err) {
    dispatch(addPostFailed(err.response.data));
  }
};
