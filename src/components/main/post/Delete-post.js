import axios from "axios";
import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import cookies from "react-cookies";
import { BsTrash } from "react-icons/bs";

export default function Deletepost(props) {
  const [show, setShow] = useState(false);
  const showAlert = () => {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>
          Are you sure you want to delete this post?
        </Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button
            onClick={handleDelete}
            variant="outline-danger"
            className="me-2"
          >
            Delete
          </Button>
        </div>
      </Alert>
    );
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    await axios.delete(
      `https://whiteboard-backend-3000.herokuapp.com/post/${props.post.id}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      }
    );

    setShow(false);
    props.posts();
  };

  return (
    <div>
      <Button
        className="bg-transparent border-0 float-end"
        onClick={() => setShow(true)}
      >
        <BsTrash />
      </Button>
      {show && showAlert()}
    </div>
  );
}
