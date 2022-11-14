import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Addcommentform from "./Add-comment-form";

export default function Comment(props) {
  const { comments } = props;

  return (
    <Box>
      {comments &&
        comments.map((comment, index) => (
          <Box key={index} borderRadius="lg" mb={4}>
            <Flex alignItems="left" flexDir="column">
              <Box display="flex" alignItems="start" gridGap={3}>
                <img
                  src="https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png"
                  alt="avatar"
                  style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                />
                <Heading size="sm">{comment.User.userName}</Heading>
              </Box>
              <Text color="gray.500" fontSize="s" align="left" ml={10}>
                {comment.content}
              </Text>
            </Flex>
          </Box>
        ))}
      <Addcommentform postId={props.postId} posts={props.posts} />
    </Box>
  );
}
