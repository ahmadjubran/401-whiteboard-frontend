import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Logout from "./Logout";

export default function Header() {
  const { userState } = useContext(AuthContext);

  return (
    <div className="d-flex justify-content-between align-items-center py-3 px-5">
      {userState.isAuth && userState.token ? (
        <>
          <h1>Welcome {userState.user.userName}</h1>
          <Logout />
        </>
      ) : (
        <h1>Whiteboard</h1>
      )}
    </div>
  );
}
