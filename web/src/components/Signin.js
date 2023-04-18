import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ForgotLink } from "../styles/app";
import { useAppContext } from "../context/context";
import axios from "axios";
import { setCookie } from "../utils/Cookie";

export default function SignIn({ handleClose, handleNoAccount }) {
  const { createSession } = useAppContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/user/login`,
        body
      );
      console.log(res);
      if (res.status === 200) {
        createSession({
          id: res.data.data.user._id,
          accessToken: res.data.data.accessToken,
          username: res.data.data.user.username,
        });

        setCookie("refreshToken", res.data.data.refreshToken, 2);
        handleClose();
      }
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <ForgotLink href="#" variant="body2">
              Forgot password?
            </ForgotLink>
          </Grid>
          <Grid item>
            <ForgotLink variant="body2" onClick={handleNoAccount}>
              {"Don't have an account? Sign Up"}
            </ForgotLink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
