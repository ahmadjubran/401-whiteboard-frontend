import React from "react";
import { Button } from "react-bootstrap";
import cookies from "react-cookies";

export default function Logout(props) {
  const { setIsAuth } = props;

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setIsAuth(false);
      cookies.remove("token");
      cookies.remove("userId");
      cookies.remove("username");
      cookies.remove("role");
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
