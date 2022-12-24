import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../actions/postActions/deletePostActions";
import { tokenState } from "../../../features/authSlicer";

export default function Deletepost({ postId }) {
  const [show, setShow] = useState(false);
  const token = useSelector(tokenState);
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const toast = useToast();

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        color="red.500"
        variant="none"
        size="sm"
        _hover={{ color: colorMode === "light" ? "red.700" : "red.300" }}
      >
        {<BsTrash />}
        <span style={{ marginLeft: "5px" }}>Delete Post</span>
      </Button>

      <Modal isOpen={show} onClose={() => setShow(false)}>
        <ModalOverlay />
        <ModalContent borderRadius="3xl" bg={colorMode === "light" ? "gray.100" : "gray.800"}>
          <ModalHeader>Delete Post</ModalHeader>

          <ModalBody>
            <p>Are you sure you want to delete this post?</p>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={(e) => deletePost(e, dispatch, postId, token, toast)}
              borderRadius="full"
            >
              Delete
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
