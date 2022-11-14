import { Box, Button, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import Addcommentform from "./Add-comment-form";

export default function Comment(props) {
  const { comments } = props;
  const { colorMode } = useColorMode();
  const bg = colorMode === "light" ? "gray.100" : "gray.800";

  return (
    <Box>
      {comments &&
        comments.map((comment, index) => (
          <Box key={index} bg={bg} borderRadius="lg" mb={4}>
            <Flex gridGap={4} alignItems="center">
              <img
                src="https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png"
                alt="avatar"
                style={{ borderRadius: "50%", width: "30px", height: "30px" }}
              />
              <Box align="left">
                <Heading size="sm">{comment.User.userName}</Heading>
                <Text color="gray.500" fontSize="s">
                  {comment.content}
                </Text>
              </Box>
            </Flex>
          </Box>
        ))}
      <Addcommentform postId={props.postId} posts={props.posts} />
    </Box>
  );
}
