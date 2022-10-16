import axios from "axios";
import React, { useState, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostContext";
import { fetchPosts } from "../../../actions/PostActions";

export default function Editpost(props) {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState(props.post.content);
  const [title, setTitle] = useState(props.post.title);
  const { userState } = useContext(AuthContext);
  const { dispatch } = useContext(PostContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      return;
    } else {
      await axios.put(
        `https://whiteboard-backend-3000.herokuapp.com/post/${props.post.id}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${userState.token}`,
          },
        }
      );

      fetchPosts(dispatch);
      e.target.reset();
      setShow(false);
    }
  };

  return (
    <div>
      <Button
        className="bg-transparent border-0 float-end"
        onClick={handleShow}
      >
        <BsPencil />
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header
          closeButton
          style={{ border: "none", backgroundColor: "#242526" }}
        >
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#242526" }}>
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                className="border-0 rounded-5 mt-3"
                defaultValue={props.post.title}
                onChange={changeTitle}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Content"
                name="content"
                className="border-0 rounded-3 mt-3"
                as="textarea"
                rows={4}
                style={{ resize: "none" }}
                defaultValue={props.post.content}
                onChange={changeContent}
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
        </Modal.Body>
      </Modal>
    </div>
  );
}
