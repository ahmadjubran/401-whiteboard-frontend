import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
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

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const handleWidth = () => {
    if (width < 768) {
      return "90vw";
    } else if (width < 992) {
      return "75vw";
    } else {
      return "50vw";
    }
  };

  const editPost = React.forwardRef((props, ref) => <Editpost innerRef={ref} {...props} />);

  const deletePost = React.forwardRef((props, ref) => <Deletepost innerRef={ref} {...props} />);

  return userState.isAuth ? (
    <VStack
      w="100%"
      justifyContent="center"
      alignItems="center"
      bg={colorMode === "light" ? "gray.100" : "gray.800"}
      color={colorMode === "light" ? "gray.800" : "gray.100"}
      spacing={8}
    >
      {canDo("create", null) && <Addpostform />}

      {canDo("read", null) &&
        postState.posts &&
        postState.posts.map((post, index) => (
          <Box
            key={index}
            w={handleWidth()}
            pt={8}
            pb={4}
            px={8}
            m={4}
            bg={colorMode === "light" ? "gray.200" : "gray.700"}
            borderRadius="3xl"
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
                    {new Date(post.createdAt).toLocaleString().split(",")[1]}
                  </Text>
                </Box>
              </Flex>
              {canDo("update", post.User.id) && canDo("delete", post.User.id) && (
                <Menu>
                  <MenuButton aria-label="Options" as={Button} variant="ghost">
                    <BiMenu size="1.5rem" />
                  </MenuButton>
                  <MenuList
                    bg={colorMode === "light" ? "gray.100" : "gray.800"}
                    color={colorMode === "light" ? "gray.800" : "gray.100"}
                    borderRadius="3xl"
                    border="1px solid"
                    borderColor="gray.500"
                  >
                    <MenuItem as={editPost} post={post} />
                    <MenuItem as={deletePost} post={post} />
                  </MenuList>
                </Menu>
              )}
            </Flex>
            <Text fontSize="xl" m={4} mx={6} align="left" fontWeight="bold">
              {post.title}
            </Text>
            {post.Comments.length > 0 ? (
              <Text fontSize="md" mx={6} align="left" borderBottom="1px solid gray" pb="6" borderColor="gray.500">
                {post.content}
              </Text>
            ) : (
              <Text fontSize="md" mx={6} align="left">
                {post.content}
              </Text>
            )}
            <Box mt={2} p={4} borderRadius="lg">
              {post.Comments.length > 0 ? (
                <Heading as="h4" size="sm" align="left" color="gray.500" mb={4}>
                  Comments
                </Heading>
              ) : null}
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
