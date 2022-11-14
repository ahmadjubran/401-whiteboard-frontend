import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext } from "react";
import { BsTrash } from "react-icons/bs";
import { fetchPosts } from "../../../actions/PostActions";
import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostContext";

export default function Deletepost(props) {
  const { userState } = useContext(AuthContext);
  const { dispatch } = useContext(PostContext);
  const toast = useToast();

  const handleDelete = async (e) => {
    e.preventDefault();

    await axios.delete(`https://whiteboard-backend-3000.herokuapp.com/post/${props.post.id}`, {
      headers: {
        Authorization: `Bearer ${userState.token}`,
      },
    });

    fetchPosts(dispatch);
    toast({
      title: "Post deleted.",
      description: "Your post has been deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <div>
      <Button onClick={handleDelete} colorScheme="red" variant="outline" borderRadius="50%" ml={2} p={1}>
        {<BsTrash />}
      </Button>
    </div>
  );
}
