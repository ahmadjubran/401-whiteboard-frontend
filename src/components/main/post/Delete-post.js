import { useToast } from "@chakra-ui/react";
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

    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/post/${props.post.id}`, {
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
    <a
      href="#"
      onClick={handleDelete}
      style={{ display: "flex", alignItems: "center", fontWeight: "bold", margin: "0 auto" }}
    >
      <BsTrash />
      <span style={{ marginLeft: "5px" }}>Delete Post</span>
    </a>
  );
}
