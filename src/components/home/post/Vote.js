import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../actions/postActions/getPostsActions";
import { tokenState, userState } from "../../../features/authSlicer";

export default function Vote(props) {
  const user = useSelector(userState);
  const token = useSelector(tokenState);
  const dispatch = useDispatch();
  const [voteCount, setVoteCount] = useState(props.vote);

  const votes = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/postvote/${props.post.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setVoteCount(res.data.totalVotes);
  };

  useEffect(() => {
    votes();
  }, []);

  const handleVote = async (voteType) => {
    const vote = props.post.Votes.find((vote) => vote.userId === user.id);
    if (!vote) {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/vote/${user.id}/${props.post.id}`,
        { voteType: voteType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else if (vote && vote.voteType === voteType) {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/vote/${vote.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else if (vote && vote.voteType !== voteType) {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/vote/${vote.id}`,
        { voteType: voteType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    getPosts(dispatch);
    votes();
  };

  const upvote = (e) => {
    e.preventDefault();
    handleVote("up");
  };

  const downvote = (e) => {
    e.preventDefault();
    handleVote("down");
  };

  const voteButton = (voteType) => {
    const vote = props.post.Votes.find((vote) => vote.userId === user.id);
    return (
      <Button
        colorScheme={vote && vote.voteType === voteType ? (voteType === "up" ? "blue" : "red") : "gray"}
        variant={vote && vote.voteType === voteType ? "solid" : "outline"}
        size="xs"
        onClick={voteType === "up" ? upvote : downvote}
        p={0}
        borderRadius="50%"
        borderColor="gray.500"
      >
        {voteType === "up" ? <BsArrowUp /> : <BsArrowDown />}
      </Button>
    );
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      {voteButton("up")}
      <Text fontSize="sm" fontWeight="bold" color="gray.500" my={1}>
        {props.post.Votes.length ? voteCount : 0}
      </Text>
      {voteButton("down")}
    </Box>
  );
}
