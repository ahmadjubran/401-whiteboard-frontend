import axios from "axios";
import { requestUpdatePost, updatePostFailed, updatePostSuccess } from "../../features/postSlicer";
import { getPosts } from "./getPostsActions";

export const updatePost = async (post, title, content, token, dispatch, toast) => {
  try {
    const updatedPost = {
      title: title,
      content: content,
    };
    dispatch(requestUpdatePost());
    if (updatedPost.title === "" || updatedPost.content === "") {
      return toast({
        title: "Error.",
        description: "Please fill out all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      await axios
        .put(`${process.env.REACT_APP_SERVER_URL}/post/${post.id}`, updatedPost, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(updatePostSuccess(res.data));
          getPosts(dispatch);
          toast({
            title: "Post edited",
            description: "Your post has been edited",
            status: "info",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        })
        .catch((err) => {
          dispatch(updatePostFailed(err.response.data));
        });
    }
  } catch (err) {
    console.log(err.response.data);
    dispatch(updatePostFailed(err.response.data));
  }
};
