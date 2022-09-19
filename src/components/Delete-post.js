import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

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
        <Button type="submit" className=" bg-transparent border-0">
          <BsTrash />
        </Button>
      </Form>
    </div>
  );
}
