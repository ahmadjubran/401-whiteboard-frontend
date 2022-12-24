import { Box, Button, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { showTime } from "../../../actions/generalActions";
import Addcommentform from "./Add-comment-form";

export default function Comment(props) {
  const { comments } = props;
  const [showComments, setShowComments] = useState(3);
  const [showMore, setShowMore] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (comments.length > showComments) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  }, [comments, showComments]);

  const handleShowMore = () => {
    setShowComments(showComments + 10);
    setShowLess(true);
  };

  const handleShowLess = () => {
    setShowComments(3);
    setShowLess(false);
  };

  return (
    <Box>
      {comments.length > 0 ? (
        <Heading
          as="h4"
          mx={8}
          size="sm"
          align="left"
          color="gray.500"
          py={4}
          mt={8}
          borderTop="1px solid"
          borderColor="gray.500"
        >
          Comments
        </Heading>
      ) : null}
      {comments.slice(0, showComments).map((comment, index) => (
        <Box key={index} borderRadius="lg" mb={4} px={8}>
          <Flex alignItems="left" flexDir="column">
            <Box display="flex" alignItems="center" gridGap={3}>
              <img
                src="https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png"
                alt="avatar"
                style={{ borderRadius: "50%", width: "35px", height: "35px" }}
              />
              <Box display="flex" alignItems="start" flexDir="column">
                <Heading size="sm">{comment.User.userName}</Heading>
                <Text fontSize="xs" color="gray.500">
                  {showTime(comment.createdAt)}
                </Text>
              </Box>
            </Box>
            <Text align="left" ml={12}>
              {comment.content}
            </Text>
          </Flex>
        </Box>
      ))}
      <Box display="flex" justifyContent="center" gridGap={3}>
        {showMore && (
          <Button
            color="blue.500"
            variant="link"
            onClick={handleShowMore}
            _hover={{ textDecoration: "none", color: colorMode === "light" ? "blue.700" : "blue.300" }}
          >
            Show more
          </Button>
        )}
        {showLess && (
          <Button
            color="blue.500"
            variant="link"
            onClick={handleShowLess}
            _hover={{ textDecoration: "none", color: colorMode === "light" ? "blue.700" : "blue.300" }}
          >
            Show less
          </Button>
        )}
      </Box>
      <Addcommentform postId={props.postId} />
    </Box>
  );
}
