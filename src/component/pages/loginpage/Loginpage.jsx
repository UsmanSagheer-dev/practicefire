import React, { useState } from "react";
import { Box } from "@mui/material";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

function Loginpage() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm); // Toggle between login and signup form
  };

  return (
    <Box>
      {isLoginForm ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <SignupForm toggleForm={toggleForm} />
      )}
    </Box>
  );
}

export default Loginpage;
