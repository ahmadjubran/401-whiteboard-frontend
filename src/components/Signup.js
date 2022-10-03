import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import cookies from "react-cookies";
import "./Post.css";

export default function Signup(props) {
  const { setIsAuth } = props;

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
      role: e.target.role.value,
    };
    try {
      await axios
        .post(`https://whiteboard-backend-3000.herokuapp.com/signup`, {
          userName: user.userName,
          password: user.password,
          email: user.email,
          role: user.role,
        })
        .then((res) => {
          if (res.status === 201) {
            setIsAuth(true);
            cookies.save("token", res.data.token);
            cookies.save("userId", res.data.User.id);
            cookies.save("username", res.data.User.userName);
            cookies.save("role", res.data.User.role);
            setIsAuth((state) => {
              if (state) {
                window.location.href = "/post";
              }
            });
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
        className="d-flex flex-column gap-3 p-3 border-0 rounded-3 signup-form"
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
        <div className="d-flex justify-content-around align-items-center">
          <Form.Group>
            <Form.Check
              type="radio"
              label="User"
              name="role"
              value="user"
              defaultChecked
            />
          </Form.Group>
          <Form.Group>
            <Form.Check type="radio" label="Admin" name="role" value="admin" />
          </Form.Group>
        </div>
        <Button
          variant="primary"
          type="submit"
          className="btn btn-primary border-0 rounded-5 bg-white text-dark mt-2 w-50 align-self-center"
        >
          Sign Up
        </Button>
        <div className="signin align-self-center">
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
