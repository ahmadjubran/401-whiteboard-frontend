import { Button, FormControl, FormLabel, Heading, Input, Link, useToast, VStack } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/authActions/loginActions";

export default function Signin(props) {
  const { toggleSign } = props;
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <VStack w="100vw" h="80vh" justifyContent="center" alignItems="center">
      <Heading>Sign In</Heading>
      <form onSubmit={(e) => login(e, dispatch, toast)}>
        <FormControl id="identifier" isRequired mt={4}>
          <FormLabel>Email or Username</FormLabel>
          <Input variant="sign" type="text" name="identifier" />
        </FormControl>

        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input variant="sign" type="password" name="password" />
        </FormControl>

        <Button type="submit" colorScheme="blue" mt={4} borderRadius="full">
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
