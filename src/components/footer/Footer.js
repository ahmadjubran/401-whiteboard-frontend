import { Heading, useColorMode, VStack } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  const { colorMode } = useColorMode();

  return (
    <VStack
      w="100vw"
      h="10vh"
      justifyContent="center"
      alignItems="center"
      p={4}
      bg={colorMode === "light" ? "gray.100" : "gray.800"}
    >
      <Heading as="h6" size="sm">
        © 2022 Whiteboard
      </Heading>
    </VStack>
  );
}
