import { Box } from "@chakra-ui/react";
import React from "react";
import { canDo } from "../../actions/generalActions";
import Addpostform from "./Add-post-form";
import PostList from "./Post-list";

export default function PostIndex() {
  return (
    <Box>
      {canDo("create", null) && <Addpostform />}
      {canDo("read", null) && <PostList />}
    </Box>
  );
}
