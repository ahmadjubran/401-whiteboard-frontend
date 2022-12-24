import { Box, Button, Heading, useColorMode, VStack } from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector } from "react-redux";
import { isAuthState, tokenState, userState } from "../../features/authSlicer";
import Logout from "./Logout";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isAuth = useSelector(isAuthState);
  const user = useSelector(userState);
  const token = useSelector(tokenState);

  return (
    <>
      <VStack
        w="100%"
        h="10vh"
        justifyContent={isAuth && token ? "space-around" : "center"}
        alignItems="center"
        flexDirection="row"
      >
        <Box justifyContent="center" alignItems="center" display="flex" mt={2} gridGap={2}>
          <Button
            onClick={toggleColorMode}
            borderRadius="full"
            bg={colorMode === "light" ? "gray.800" : "gray.300"}
            color={colorMode === "light" ? "gray.300" : "gray.800"}
            _hover={{ bg: colorMode === "light" ? "gray.700" : "gray.400" }}
            alignSelf="center"
          >
            <span role="img" aria-label="night">
              {colorMode === "light" ? <FaMoon /> : <FaSun />}
            </span>
          </Button>
          {isAuth && token ? (
            <Heading variant="header">Welcome {user && user.userName}</Heading>
          ) : (
            <Heading>WhiteBoard</Heading>
          )}
        </Box>
        {isAuth && token && <Logout />}
      </VStack>
    </>
  );
}
