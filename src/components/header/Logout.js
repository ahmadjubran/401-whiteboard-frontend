import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

export default function Logout() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div>
      <Button
        className="bg-white text-dark border-0"
        onClick={handleLogout}
        data-testid="logout"
      >
        Logout
      </Button>
    </div>
  );
}
