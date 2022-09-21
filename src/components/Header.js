import React from "react";
import Logout from "./Logout";
import cookies from "react-cookies";

export default function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center py-3 px-5">
      <h1>Whiteboard</h1>
      {cookies.load("token") ? <Logout /> : null}
    </div>
  );
}
