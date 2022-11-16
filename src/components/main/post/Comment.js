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
              <Box display="flex" alignItems="center" gridGap={3}>
                <img
                  src="https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png"
                  alt="avatar"
                  style={{ borderRadius: "50%", width: "35px", height: "35px" }}
                />
                <Box display="flex" alignItems="start" flexDir="column">
                  <Heading size="sm">{comment.User.userName}</Heading>
                  <Text fontSize="xs" color="gray.500">
                    {new Date(comment.createdAt).toLocaleString().split(",")[0].slice(0, -5)} at{" "}
                    {new Date(comment.createdAt).toLocaleString().split(",")[1]}
                  </Text>
                </Box>
              </Box>
              <Text align="left" ml={12}>
                {comment.content}
              </Text>
            </Flex>
          </Box>
        ))}
      <Addcommentform postId={props.postId} posts={props.posts} />
    </Box>
  );
}
