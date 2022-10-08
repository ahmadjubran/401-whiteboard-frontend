import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContext";

import "../../Style.css";

export default function Signup(props) {
  const { toggleSign } = props;
  const { handleSignup } = useContext(AuthContext);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form
        onSubmit={handleSignup}
        className="d-flex flex-column gap-3 p-3 border-0 rounded-3 signup-form"
      >
        <h1 className="text-center">Sign Up</h1>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            className="border-0 rounded-5"
            autoComplete="on"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            className="border-0 rounded-5"
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="border-0 rounded-5"
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            className="border-0 rounded-5"
            autoComplete="on"
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
            <span className="text-primary" onClick={toggleSign} role="button">
              Sign In
            </span>
          </p>
        </div>
      </Form>
    </div>
  );
}
