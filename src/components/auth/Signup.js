import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Radio,
  RadioGroup,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../actions/authActions/signupActions";

export default function Signup(props) {
  const { toggleSign } = props;
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <VStack w="100vw" h="80vh" justifyContent="center" alignItems="center">
      <Heading>Sign Up</Heading>
      <form onSubmit={(e) => signup(e, dispatch, toast)}>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input variant="sign" type="text" name="username" />
        </FormControl>

        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input variant="sign" type="password" name="password" />
        </FormControl>

        <FormControl id="confirmPassword" isRequired mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input variant="sign" type="password" name="confirmPassword" />
        </FormControl>

        <FormControl id="email" isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input variant="sign" type="email" name="email" />
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
