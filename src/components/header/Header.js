import React, { useContext } from "react";
import cookies from "react-cookies";
import { AuthContext } from "../../context/AuthContext";
import Logout from "./Logout";

export default function Header() {
  const { isAuth } = useContext(AuthContext);

  return (
    <div className="d-flex justify-content-between align-items-center py-3 px-5">
      {isAuth && cookies.load("token") ? (
        <>
          <h1>Welcome {cookies.load("username")}</h1>
          <Logout />
        </>
      ) : (
        <h1>Whiteboard</h1>
      )}
    </div>
  );
}
