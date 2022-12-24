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
import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../../actions/postActions/updatePostActions";
import { tokenState } from "../../../features/authSlicer";

export default function Editpost({ post }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const token = useSelector(tokenState);
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const toast = useToast();

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        color="blue.500"
        variant="none"
        size="sm"
        _hover={{ color: colorMode === "light" ? "blue.700" : "blue.300" }}
      >
        {<BsPencil />}
        <span style={{ marginLeft: "5px" }}>Edit Post</span>
      </Button>

      <Modal isOpen={show} onClose={() => setShow(false)} size="3xl">
        <ModalOverlay />
        <ModalContent borderRadius="3xl" pb={4} bg={colorMode === "light" ? "gray.100" : "gray.700"}>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />

          <ModalBody py={8}>
            <VStack spacing={4}>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  variant="editPost"
                  type="text"
                  placeholder="Title"
                  defaultValue={post.title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl id="content" isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  type="text"
                  placeholder="Content"
                  defaultValue={post.content}
                  resize="none"
                  rows={5}
                  variant="editPost"
                  name="content"
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                updatePost(post, title, content, token, dispatch, toast);
                setShow(false);
              }}
              borderRadius="full"
            >
              {" "}
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
