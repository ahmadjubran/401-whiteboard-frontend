import axios from "axios";
import { deletePostFailed, deletePostSuccess, requestDeletePost } from "../../features/postSlicer";
import { getPosts } from "./getPostsActions";

export const deletePost = async (e, dispatch, postId, token, toast) => {
  try {
    e.preventDefault();

    dispatch(requestDeletePost());
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/post/${postId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        dispatch(deletePostSuccess(res.data));
        getPosts(dispatch);
        toast({
          title: "Post deleted",
          description: "Your post has been deleted",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        dispatch(deletePostFailed(err.response.data));
      });
  } catch (err) {
    dispatch(deletePostFailed(err.response.data));
  }
};
