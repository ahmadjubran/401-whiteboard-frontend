import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { fetchPosts } from "../../../actions/PostActions";
import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostContext";

export default function Editpost(props) {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState(props.post.content);
  const [title, setTitle] = useState(props.post.title);
  const { userState } = useContext(AuthContext);
  const { dispatch } = useContext(PostContext);
  const { colorMode } = useColorMode();
  const inputBg = colorMode === "light" ? "gray.200" : "gray.800";
  const toast = useToast();

  const handleEdit = async (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      return;
    } else {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/post/${props.post.id}`,
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

      fetchPosts(dispatch);
      toast({
        title: "Post edited.",
        description: "Your post has been edited.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setShow(false);
    }
  };

  return (
    <>
      <Button onClick={() => setShow(true)} colorScheme="blue" variant="none" fontWeight="bold">
        {<BsPencil />}
        <span style={{ marginLeft: "5px" }}>Edit Post</span>
      </Button>

      <Modal isOpen={show} onClose={() => setShow(false)} size="3xl">
        <ModalOverlay />
        <ModalContent borderRadius="3xl" pb={4}>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={8}>
            <VStack spacing={4}>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  bg={inputBg}
                  border="1px"
                  borderColor="gray.500"
                  borderRadius="full"
                  _hover={{ borderColor: colorMode === "light" ? "gray.700" : "gray.300" }}
                />
              </FormControl>
              <FormControl id="content" isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  type="text"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  bg={inputBg}
                  resize="none"
                  rows={5}
                  border="1px"
                  borderColor="gray.500"
                  borderRadius="3xl"
                  _hover={{ borderColor: colorMode === "light" ? "gray.700" : "gray.300" }}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEdit} borderRadius="full">
              Edit
            </Button>
            <Button onClick={() => setShow(false)} borderRadius="full">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
