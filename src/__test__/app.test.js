import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import App from "../App";
import AuthProvider from "../context/AuthContext";

const random1 = Math.floor(Math.random() * 1000);
const random2 = Math.floor(Math.random() * 1000);

test("should render Home page", () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  expect(screen.getByText("Whiteboard")).toBeInTheDocument();
});

test("should signup", async () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  fireEvent.click(screen.getByTestId("signup-link"));

  fireEvent.change(screen.getByTestId("signup-username"), {
    target: { value: `test${random1}${random2}` },
  });
  fireEvent.change(screen.getByTestId("signup-password"), {
    target: { value: `123456` },
  });
  fireEvent.change(screen.getByTestId("signup-confirm-password"), {
    target: { value: `123456` },
  });
  fireEvent.change(screen.getByTestId("signup-email"), {
    target: { value: `test${random1}@test${random2}.com` },
  });
  fireEvent.click(screen.getByTestId("signup-submit"));

  await waitFor(() => {
    expect(
      screen.getByText(`Welcome test${random1}${random2}`)
    ).toBeInTheDocument();
  });
});

test("should logout", async () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  fireEvent.click(screen.getByTestId("logout"));

  await waitFor(() => {
    expect(screen.getByText("Whiteboard")).toBeInTheDocument();
  });
});

test("should signin", async () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  fireEvent.change(screen.getByTestId("signin-username"), {
    target: { value: `test${random1}${random2}` },
  });
  fireEvent.change(screen.getByTestId("signin-password"), {
    target: { value: `123456` },
  });
  fireEvent.click(screen.getByTestId("signin-submit"));

  await waitFor(() => {
    expect(
      screen.getByText(`Welcome test${random1}${random2}`)
    ).toBeInTheDocument();
  });
});
