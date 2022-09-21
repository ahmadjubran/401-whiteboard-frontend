import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import cookies from "react-cookies";

export default function Signup() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirmPassword.value) {
      alert("Passwords do not match");
      return;
    }
    const user = {
      userName: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
    };
    try {
      await axios
        .post(`https://whiteboard-backend-3000.herokuapp.com/signup`, {
          userName: user.userName,
          password: user.password,
          email: user.email,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            cookies.save("token", res.data.token);
            cookies.save("userId", res.data.id);
            window.location.href = "/post";
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-3 p-3 border-0 rounded-3"
        style={{ width: "50%" }}
      >
        <h1 className="text-center">Sign Up</h1>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            className="border-0 rounded-5"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            className="border-0 rounded-5"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="border-0 rounded-5"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            className="border-0 rounded-5"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="btn btn-primary border-0 rounded-5 bg-white text-dark mt-3"
        >
          Sign Up
        </Button>
        <div className="signin">
          <p>
            Already have an account{" "}
            <a className="text-decoration-none" href="/signin">
              Sign In
            </a>
          </p>
        </div>
      </Form>
    </div>
  );
}
