import { Button, FormControl, FormLabel, Heading, Input, Textarea, VStack } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../actions/postActions/addPostActions";
import { tokenState, userState } from "../../features/authSlicer";

export default function Addpostform() {
  const user = useSelector(userState);
  const token = useSelector(tokenState);
  const dispatch = useDispatch();

  return (
    <VStack h="100%" py="10vh">
      <Heading>Add Post</Heading>
      <form onSubmit={(e) => addPost(e, dispatch, user, token)}>
        <FormControl id="title" isRequired mt={4}>
          <FormLabel>Title</FormLabel>
          <Input variant="post" type="text" name="title" />
        </FormControl>

        <FormControl id="content" isRequired mt={4}>
          <FormLabel>Content</FormLabel>
          <Textarea type="text" name="content" resize="none" lineHeight="1.5" rows="5" variant="post" />
        </FormControl>

        <Button type="submit" colorScheme="blue" mt={4} borderRadius="full">
          Add Post
        </Button>
      </form>
    </VStack>
  );
}
