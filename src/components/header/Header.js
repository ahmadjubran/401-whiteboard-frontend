import { Button, Heading, useColorMode, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Logout from "./Logout";

export default function Header() {
  const { userState } = useContext(AuthContext);
  const { colorMode } = useColorMode();

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
          <Heading>Welcome {userState.user.userName}</Heading>
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
          <Heading>Whiteboard</Heading>
        </VStack>
      )}
    </>
  );
}
