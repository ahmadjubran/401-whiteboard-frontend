import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { fetchPosts } from "../actions/PostActions";
import { PostReducer } from "../reducers/PostReducer";
import { initialPostState } from "../config/Initials";

export const PostContext = createContext();

const PostProvider = (props) => {
  const [postState, dispatch] = useReducer(PostReducer, initialPostState);

  useEffect(() => {
    fetchPosts(dispatch);
  }, []);

  const values = {
    postState,
    dispatch,
  };

  return (
    <PostContext.Provider value={{ ...values }}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostProvider;
