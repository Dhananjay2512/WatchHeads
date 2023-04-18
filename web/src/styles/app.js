import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const AppContainer = styled("section")({
  minHeight: "100vh",
  backgroundColor: "#0B0B0B",
  display: "flex",
  flexDirection: "column",
});

const ForgotLink = styled("p")({
  margin: 0,
  fontFamily: ' "Roboto","Helvetica","Arial",sans-serif',
  fontWeight: 400,
  fontSize: "0.875rem",
  lineHeight: 1.43,
  letterSpacing: "0.01071em",
  color: "#1976d2",
  textDecoration: "underline",
  textDecorationColor: "rgba(25, 118, 210, 0.4)",
  textTransform: "none",
  cursor: "pointer",

  "&:hover": {
    textDecorationColor: "#1976d2",
  },
});

export { AppContainer, ForgotLink };
