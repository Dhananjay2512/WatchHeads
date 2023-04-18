import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ForgotLink } from "../styles/app";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Register({ handleHaveAccount }) {
  const registerUser = async (body) => {
    try {
      console.log(process.env.REACT_APP_SERVER_ENDPOINT);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/user/register`,
        body
      );
      console.log(res);
      if (res.status === 200) {
        handleHaveAccount(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    onSubmit: () => {
      console.log("submitting", formik.values);
      // console.log(formik.errors);
      registerUser(formik.values);
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Password is Required"),
      confirmPassword: Yup.string()
        .required("Confirmation for Password is Required")
        .test(
          "must be same",
          "Password are not matching",
          (value, ctx) => value === ctx.parent.password
        ),
    }),
  });

  console.log(formik.values);

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
        Register
      </Typography>
      <Box sx={{ mt: 1 }} component="form" onSubmit={formik.handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Phone Number"
          name="phone"
          autoComplete="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
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
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={
            formik.touched.confirmPassword &&
            formik.errors.confirmPassword &&
            String(formik.errors.confirmPassword)
          }
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <ForgotLink variant="body2" onClick={handleHaveAccount}>
              {"Already have an Account ? Sign In"}
            </ForgotLink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
