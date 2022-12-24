import { Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { handleWidth, showTime } from "../../../actions/generalActions";
import Comment from "./Comment";
import PostMenu from "./Post-menu";
import Vote from "./Vote";

export default function Post({ post, index }) {
  const { colorMode } = useColorMode();

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  return (
    <Box
      key={index}
      w={handleWidth(width)}
      bg={colorMode === "light" ? "gray.200" : "gray.700"}
      borderRadius="3xl"
      boxShadow="lg"
    >
      <Flex>
        <Box pt={4} pl={6} w="30px">
          <Vote post={post} />
        </Box>
        <Box pt={8} w="100%">
          <Flex justify="space-between" px={4}>
            <Flex align="center" gridGap={4}>
              <img
                src="https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png"
                alt="avatar"
                width="50px"
                height="50px"
                style={{ borderRadius: "50%" }}
              />
              <Box align="left">
                <Heading as="h3" size="md">
                  {post.User.userName}
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  {showTime(post.createdAt)}
                </Text>
              </Box>
            </Flex>
            <Box align="right">
              <PostMenu post={post} />
            </Box>
          </Flex>
          <Text fontSize="xl" align="left" fontWeight="bold" px={6} pt={4}>
            {post.title}
          </Text>
          <Text fontSize="md" align="left" whiteSpace="pre-line" px={6} pt={4}>
            {post.content}
          </Text>
        </Box>
      </Flex>
      <Comment comments={post.Comments} postId={post.id} />
    </Box>
  );
}
