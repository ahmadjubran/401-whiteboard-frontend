import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";

export default function Deletepost(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.delete(
      `https://whiteboard-backend-3000.herokuapp.com/post/${props.id}`
    );
    props.posts();
    e.target.reset();
  };

  return (
    <div className="float-end">
      <Form onSubmit={handleSubmit}>
        <Button
          variant="variant"
          type="submit"
          className="bg-white text-dark border-0"
        >
          Delete
        </Button>
      </Form>
    </div>
  );
}
