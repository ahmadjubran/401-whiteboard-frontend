import { Button, FormControl, FormLabel, Heading, Input, Textarea, useColorMode, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { fetchPosts } from "../../../actions/PostActions";
import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostContext";

export default function Addpostform(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userState } = useContext(AuthContext);
  const { dispatch } = useContext(PostContext);
  const { colorMode } = useColorMode();
  const inputBg = colorMode === "light" ? "gray.200" : "gray.800";

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const handleWidth = () => {
    if (width < 600) {
      return "90vw";
    } else if (width < 900) {
      return "75vw";
    } else {
      return "50vw";
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    if (e.target.name === "content") {
      setContent(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      return;
    } else {
      await axios.post(
        `https://whiteboard-backend-3000.herokuapp.com/post/${userState.user.id}`,
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
    <VStack
      w="100vw"
      h="60vh"
      bg={colorMode === "light" ? "gray.100" : "gray.800"}
      justifyContent="center"
      alignItems="center"
    >
      <Heading>Add Post</Heading>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <FormControl id="title" isRequired mt={4}>
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" bg={inputBg} w={handleWidth()} />
        </FormControl>
        <FormControl id="content" isRequired mt={4}>
          <FormLabel>Content</FormLabel>
          <Textarea type="text" name="content" bg={inputBg} w={handleWidth()} resize="none" lineHeight="1.5" rows="5" />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Add Post
        </Button>
      </form>
    </VStack>
  );
}
