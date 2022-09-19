import React from "react";
import Logout from "./Logout";

export default function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center py-3 px-5">
      <h1>Whiteboard</h1>
      {localStorage.getItem("token") ? <Logout /> : null}
    </div>
  );
}
