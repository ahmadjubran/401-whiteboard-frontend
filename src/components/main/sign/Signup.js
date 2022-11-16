import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Radio,
  RadioGroup,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function Signup(props) {
  const { toggleSign } = props;
  const { handleSignup } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const inputBg = colorMode === "light" ? "gray.200" : "gray.800";

  return (
    <VStack
      w="100vw"
      h="80vh"
      bg={colorMode === "light" ? "gray.100" : "gray.800"}
      justifyContent="center"
      alignItems="center"
    >
      <Heading>Sign Up</Heading>
      <form onSubmit={handleSignup}>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            variant="sign"
            type="text"
            name="username"
            bg={inputBg}
            border="1px"
            borderColor="gray.500"
            borderRadius="full"
          />
        </FormControl>

        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            variant="sign"
            type="password"
            name="password"
            bg={inputBg}
            border="1px"
            borderColor="gray.500"
            borderRadius="full"
          />
        </FormControl>

        <FormControl id="confirmPassword" isRequired mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            variant="sign"
            type="password"
            name="confirmPassword"
            bg={inputBg}
            border="1px"
            borderColor="gray.500"
            borderRadius="full"
          />
        </FormControl>

        <FormControl id="email" isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            variant="sign"
            type="email"
            name="email"
            bg={inputBg}
            border="1px"
            borderColor="gray.500"
            borderRadius="full"
          />
        </FormControl>

        <FormControl id="role" isRequired mt={4}>
          <FormLabel>Role</FormLabel>
          <RadioGroup
            name="role"
            defaultValue="user"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            gap={10}
          >
            <Radio value="user">User</Radio>
            <Radio value="admin">Admin</Radio>
          </RadioGroup>
        </FormControl>
        <Button type="submit" mt={4} colorScheme="blue" borderRadius="full">
          Sign Up
        </Button>
      </form>
      <p>
        Already have an account{" "}
        <Link onClick={toggleSign} color="blue.500">
          Sign In
        </Link>
      </p>
    </VStack>
  );
}
