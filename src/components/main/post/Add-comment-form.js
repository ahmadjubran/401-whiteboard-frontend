import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import cookies from "react-cookies";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

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
        <Form.Group className="d-flex justify-content-center align-items-center gap-2 mt-3">
          <img
            src="https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png"
            alt="profile"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
            }}
          />
          <Form.Control
            type="text"
            placeholder="Add a comment ..."
            name="comment"
            className="border-0 rounded-5"
          />
          <Button type="submit" className="bg-transparent border-0 p-0">
            <BsFillArrowRightCircleFill className="fs-2" />
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
