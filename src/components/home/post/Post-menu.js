import { Button, Menu, MenuButton, MenuItem, MenuList, useColorMode } from "@chakra-ui/react";
import React from "react";
import { BiMenu } from "react-icons/bi";
import { canDo } from "../../../actions/generalActions";
import Deletepost from "./Delete-post";
import Editpost from "./Edit-post";

export default function PostMenu({ post }) {
  const { colorMode } = useColorMode();

  const editPost = React.forwardRef((props, ref) => <Editpost innerRef={ref} {...props} />);
  const deletePost = React.forwardRef((props, ref) => <Deletepost innerRef={ref} {...props} />);

  return (
    canDo("update", post.User.id) &&
    canDo("delete", post.User.id) && (
      <Menu>
        <MenuButton aria-label="Options" as={Button} variant="ghost">
          <BiMenu size="1.5rem" />
        </MenuButton>
        <MenuList
          bg={colorMode === "light" ? "gray.100" : "gray.800"}
          color={colorMode === "light" ? "gray.800" : "gray.100"}
          borderRadius="2xl"
          border="1px solid"
          borderColor="gray.500"
          display="flex"
          flexDirection="column"
        >
          <MenuItem as={editPost} post={post} />
          <MenuItem as={deletePost} postId={post.id} />
        </MenuList>
      </Menu>
    )
  );
}
