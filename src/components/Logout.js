import React from "react";
import { Button } from "react-bootstrap";
import cookies from "react-cookies";

export default function logout() {
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      cookies.remove("token");
      cookies.remove("userId");
      cookies.remove("username");
      cookies.remove("role");
      window.location.href = "/";
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
