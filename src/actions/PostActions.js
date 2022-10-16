import axios from "axios";
import { actionType } from "../config/Constant";

export const fetchPosts = (dispatch) => {
  try {
    dispatch({ type: actionType.REQUEST_POSTS });
    const getPosts = async () => {
      const response = await axios.get(
        "https://whiteboard-backend-3000.herokuapp.com/post",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    };

    const getUsers = async () => {
      const response = await axios.get(
        "https://whiteboard-backend-3000.herokuapp.com/users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    };

    const postsInfo = async () => {
      const posts = await getPosts();
      const users = await getUsers();

      const postsInfo = posts.map((post) => {
        const postUser = users.find((user) => user.User.id === post.userId);

        const commentsInfo = post.Comments.map((comment) => {
          const commentUser = users.find(
            (user) => user.User.id === comment.userId
          );
          return { ...comment, User: commentUser.User };
        });
        return { ...post, User: postUser.User, Comments: commentsInfo };
      });
      return postsInfo;
    };
    const showPosts = async () => {
      const posts = await postsInfo();
      const sortedPosts = posts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      dispatch({ type: actionType.FETCH_POSTS_SUCCESS, payload: sortedPosts });
    };
    showPosts();
  } catch (error) {
    dispatch({ type: actionType.FETCH_POSTS_FAILED, payload: error });
  }
};
