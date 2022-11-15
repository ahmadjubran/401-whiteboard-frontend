import { Box, Button, Heading, useColorMode, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import Logout from "./Logout";

export default function Header() {
  const { userState } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      {userState.isAuth && userState.token ? (
        <VStack
          w="100%"
          h="10vh"
          justifyContent="space-around"
          alignItems="center"
          flexDirection="row"
          bg={colorMode === "light" ? "gray.100" : "gray.800"}
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
            <Heading>Welcome {userState.user.userName}</Heading>
          </Box>
          <Logout Button={Button} />
        </VStack>
      ) : (
        <VStack
          w="100vw"
          h="10vh"
          justifyContent="center"
          alignItems="center"
          bg={colorMode === "light" ? "gray.100" : "gray.800"}
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
            <Heading>Whiteboard</Heading>
          </Box>
        </VStack>
      )}
    </>
  );
}
