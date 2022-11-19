import { Text, useColorMode, VStack } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  const { colorMode } = useColorMode();

  return (
    <VStack
      w="100%"
      h="10vh"
      justifyContent="center"
      alignItems="center"
      bg={colorMode === "light" ? "gray.100" : "gray.800"}
    >
      <Text color="gray.500">&copy; {new Date().getFullYear()} Ahmad Jubran. All rights reserved.</Text>
    </VStack>
  );
}
