import { Button, FormControl, FormLabel, Heading, Input, Link, useColorMode, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function Signin(props) {
  const { toggleSign } = props;
  const { handleSignin } = useContext(AuthContext);

  const { colorMode } = useColorMode();
  const inputBg = colorMode === "light" ? "gray.200" : "gray.800";

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const handleWidth = () => {
    if (width < 300) {
      return "100vw";
    } else if (width < 600) {
      return "75vw";
    } else if (width < 900) {
      return "50vw";
    } else {
      return "25vw";
    }
  };

  return (
    <VStack
      w="100vw"
      h="80vh"
      bg={colorMode === "light" ? "gray.100" : "gray.800"}
      justifyContent="center"
      alignItems="center"
    >
      <Heading>Sign In</Heading>
      <form onSubmit={handleSignin}>
        <FormControl id="username" isRequired mt={4}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            bg={inputBg}
            w={handleWidth()}
            border="1px"
            borderColor="gray.500"
            borderRadius="full"
          />
        </FormControl>
        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            bg={inputBg}
            w={handleWidth()}
            border="1px"
            borderColor="gray.500"
            borderRadius="full"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4} w={handleWidth()} borderRadius="full">
          Sign In
        </Button>
      </form>
      <p>
        Don't have an account{" "}
        <Link onClick={toggleSign} color="blue.500">
          Sign Up
        </Link>
      </p>
    </VStack>
  );
}
