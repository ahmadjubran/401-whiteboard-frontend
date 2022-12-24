import { VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/postActions/getPostsActions";
import { postsState } from "../../features/postSlicer";
import Post from "./post/Post";

export default function PostList() {
  const posts = useSelector(postsState);
  const dispatch = useDispatch();

  useEffect(() => {
    getPosts(dispatch);
  }, [dispatch]);

  return <VStack spacing={8}>{posts && posts.map((post, index) => <Post key={index} post={post} />)}</VStack>;
}
