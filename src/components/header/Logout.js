import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authActions/logoutActions";

export default function Logout() {
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <div>
      <Button onClick={() => logout(dispatch, toast)} colorScheme="blue" borderRadius="full">
        Logout
      </Button>
    </div>
  );
}
