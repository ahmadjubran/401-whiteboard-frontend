import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Logout(props) {
  const { handleLogout } = useContext(AuthContext);
  const { Button } = props;

  return (
    <div>
      <Button onClick={handleLogout} colorScheme="blue">
        Logout
      </Button>
    </div>
  );
}
