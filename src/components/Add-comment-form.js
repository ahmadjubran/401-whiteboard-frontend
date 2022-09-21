import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import cookies from "react-cookies";

export default function Addcommentform(props) {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment === "") {
      return;
    } else {
      await axios.post(
        `https://whiteboard-backend-3000.herokuapp.com/comment/${cookies.load(
          "userId"
        )}/${props.postId}`,
        {
          content: comment,
        }
      );
      props.posts();
      e.target.reset();
      setComment("");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter comment"
            name="comment"
            className="border-0 rounded-5 mt-3"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mt-3 bg-white text-dark border-0"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
