import { Box, Button, FormControl, FormLabel, Input, useColorMode, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { fetchPosts } from "../../../actions/PostActions";
import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostContext";

export default function Addcommentform(props) {
  const [comment, setComment] = useState("");
  const { userState } = useContext(AuthContext);
  const { dispatch } = useContext(PostContext);
  const { colorMode } = useColorMode();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment === "") {
      return;
    } else {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/comment/${userState.user.id}/${props.postId}`, {
        content: comment,
      });

      setComment("");
      fetchPosts(dispatch);
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        <FormControl id="comment" display="flex" alignItems="center" borderTop="1px" borderColor="gray.500" pt="6">
          <FormLabel htmlFor="comment" m={0} mr={2}>
            <img
              src="https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png"
              alt="profile"
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                borderRadius: "50%",
              }}
            />
          </FormLabel>
          <Input
            name="comment"
            placeholder="Add a comment ..."
            onChange={handleChange}
            required
            bg={colorMode === "light" ? "gray.100" : "gray.800"}
            border="1px"
            borderColor="gray.500"
            borderRadius="full"
            _hover={{ borderColor: colorMode === "light" ? "gray.700" : "gray.300" }}
          />
          <Button type="submit" colorScheme="blue" variant="outline" borderRadius="50%" ml={2} p={1}>
            {<BsFillArrowRightCircleFill />}
          </Button>
        </FormControl>
      </VStack>
    </form>
  );
}
