import { Box, Button, Flex, Heading, Text, useColorMode, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostContext";
import Addpostform from "./Add-post-form";
import Comment from "./Comment";
import Deletepost from "./Delete-post";
import Editpost from "./Edit-post";
export default function Post() {
  const { postState } = useContext(PostContext);
  const { userState, canDo } = useContext(AuthContext);
  const { colorMode } = useColorMode();

  return userState.isAuth ? (
    <VStack w="100%" align="center" spacing={8} bg={colorMode === "light" ? "gray.100" : "gray.800"}>
      {canDo("create", null) && <Addpostform />}

      {canDo("read", null) &&
        postState.posts &&
        postState.posts.map((post, index) => (
          <Box
            key={index}
            w="50vw"
            p={4}
            m={4}
            bg={colorMode === "light" ? "gray.200" : "gray.700"}
            borderRadius="lg"
            boxShadow="lg"
          >
            <Flex justify="space-between">
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
                    {new Date(post.createdAt).toLocaleString().split(",")[0].slice(0, -5)} at{" "}
                    {new Date(post.createdAt).toLocaleString().split(",")[1].slice(1, -3)}
                  </Text>
                </Box>
              </Flex>
              <Box align="right" display="flex" alignItems="center" gridGap={4}>
                {canDo("update", post.User.id) && <Editpost post={post} />}
                {canDo("delete", post.User.id) && <Deletepost post={post} />}
              </Box>
            </Flex>
            <Text fontSize="xl" m={4} ml={6} align="left" fontWeight="bold">
              {post.title}
            </Text>
            <Text fontSize="md" ml={6} align="left">
              {post.content}
            </Text>
            <Box mt={4} bg={colorMode === "light" ? "gray.100" : "gray.800"} p={4} borderRadius="lg">
              <Heading as="h4" size="sm" align="left" color="gray.500" mb={4}>
                Comments
              </Heading>
              <Comment comments={post.Comments} postId={post.id} />
            </Box>
          </Box>
        ))}
    </VStack>
  ) : (
    <VStack>
      <Heading as="h2" size="md">
        Please login to view posts
      </Heading>
      <Button colorScheme="teal" onClick={() => (window.location.href = "/sign")}>
        Login
      </Button>
    </VStack>
  );
}
