import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import cookies from "react-cookies";

export const PostContext = createContext();

const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await axios.get(
      "https://whiteboard-backend-3000.herokuapp.com/post",
      {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const getUsers = async () => {
    const response = await axios.get(
      "https://whiteboard-backend-3000.herokuapp.com/users",
      {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
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

    setPosts(sortedPosts);
  };

  useEffect(() => {
    showPosts();
  }, []);

  const values = {
    posts,
    setPosts,
    showPosts,
  };

  return (
    <PostContext.Provider value={{ ...values }}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostProvider;
