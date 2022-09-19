import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";

export default function logout() {
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/signin";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button className="bg-white text-dark border-0" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
