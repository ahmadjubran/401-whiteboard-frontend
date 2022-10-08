import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContext";

import "../../Style.css";

export default function Signin(props) {
  const { toggleSign } = props;
  const { handleSignin } = useContext(AuthContext);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form
        onSubmit={handleSignin}
        className="d-flex flex-column gap-3 p-3 border-0 rounded-3 signin-form"
      >
        <h1 className="text-center">Sign In</h1>
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
        <Button
          type="submit"
          className="btn btn-primary border-0 rounded-5 bg-white text-dark mt-3 w-50 align-self-center"
          data-testid="signin-submit"
        >
          Sign In
        </Button>
        <div className="signup">
          <p>
            Don't have an account{" "}
            <span className="text-primary" onClick={toggleSign} role="button">
              Sign Up
            </span>
          </p>
        </div>
      </Form>
    </div>
  );
}
