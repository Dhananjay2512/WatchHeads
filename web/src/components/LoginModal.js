import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import SignIn from "./Signin";
import Register from "./Register";
import { LoginContainer } from "../styles/loginmodal";

const LoginModal = ({ open, handleClose }) => {
  const [haveAccount, setHaveAccount] = useState(true);

  const handleHaveAccount = () => setHaveAccount(true);

  const handleNoAccount = () => setHaveAccount(false);
  return (
    <Dialog open={open} onClose={handleClose}>
      <LoginContainer>
        {haveAccount ? (
          <SignIn handleNoAccount={handleNoAccount} handleClose={handleClose} />
        ) : (
          <Register handleHaveAccount={handleHaveAccount} handleClose={handleClose} />
        )}
      </LoginContainer>
    </Dialog>
  );
};

export default LoginModal;
