import { Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <VStack w="100%" h="10vh" justifyContent="center" alignItems="center">
      <Text color="gray.500">&copy; {new Date().getFullYear()} Ahmad Jubran. All rights reserved.</Text>
    </VStack>
  );
}
