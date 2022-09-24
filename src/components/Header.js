import React from "react";
import cookies from "react-cookies";
import Logout from "./Logout";

export default function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center py-3 px-5">
      {cookies.load("token") ? (
        <h1>Welcome {cookies.load("username")}</h1>
      ) : (
        <h1>Whiteboard</h1>
      )}
      {cookies.load("token") ? <Logout /> : null}
    </div>
  );
}
