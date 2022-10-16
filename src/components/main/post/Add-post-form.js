import axios from "axios";
import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import "../../Style.css";
import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostContext";
import { fetchPosts } from "../../../actions/PostActions";

export default function Addpostform(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userState } = useContext(AuthContext);
  const { dispatch } = useContext(PostContext);

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    if (e.target.name === "content") {
      setContent(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      return;
    } else {
      await axios.post(
        `https://whiteboard-backend-3000.herokuapp.com/post/${userState.user.id}`,
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

      setTitle("");
      setContent("");
      fetchPosts(dispatch);
      e.target.reset();
    }
  };

  return (
    <div className="mt-5 mx-auto d-flex flex-column gap-3 py-4 px-3 rounded-4 align-items-start add-post-card">
      <h2>Add Post</h2>
      <Form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="w-100 d-flex flex-column gap-3"
      >
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            className="border-0 rounded-5"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Content"
            name="content"
            className="border-0 rounded-3"
            as="textarea"
            rows={4}
            style={{ resize: "none" }}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="bg-white border-0 text-dark w-25 align-self-start"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
