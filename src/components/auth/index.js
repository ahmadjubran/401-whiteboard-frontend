import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

export default function Sign() {
  const [sign, setSign] = useState("signin");

  const toggleSign = () => {
    if (sign === "signin") {
      setSign("signup");
    } else {
      setSign("signin");
    }
  };

  return sign === "signin" ? <Signin toggleSign={toggleSign} /> : <Signup toggleSign={toggleSign} />;
}
