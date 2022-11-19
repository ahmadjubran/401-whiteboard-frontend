import { Button, FormControl, FormLabel, Heading, Input, Textarea, useColorMode, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { fetchPosts } from "../../../actions/PostActions";
import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostContext";

export default function Addpostform() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userState } = useContext(AuthContext);
  const { dispatch } = useContext(PostContext);
  const { colorMode } = useColorMode();
  const inputBg = colorMode === "light" ? "gray.200" : "gray.800";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      return;
    } else {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/post/${userState.user.id}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${userState.token}`,
          },
        }
      );

      setTitle("");
      setContent("");
      fetchPosts(dispatch);
      e.target.reset();
    }
  };

  return (
    <VStack my={20}>
      <Heading>Add Post</Heading>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <FormControl id="title" isRequired mt={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            bg={inputBg}
            border="1px"
            borderColor="gray.500"
            borderRadius="full"
            variant="post"
            _hover={{ borderColor: colorMode === "light" ? "gray.700" : "gray.300" }}
            _focus={{ borderColor: "#3182ce", boxShadow: "0 0 0 1px #3182ce" }}
          />
        </FormControl>
        <FormControl id="content" isRequired mt={4}>
          <FormLabel>Content</FormLabel>
          <Textarea
            type="text"
            name="content"
            bg={inputBg}
            resize="none"
            lineHeight="1.5"
            rows="5"
            border="1px"
            borderColor="gray.500"
            borderRadius="3xl"
            _hover={{ borderColor: colorMode === "light" ? "gray.700" : "gray.300" }}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4} borderRadius="full">
          Add Post
        </Button>
      </form>
    </VStack>
  );
}
