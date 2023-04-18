import { styled } from "@mui/material/styles";

const ProfileContainer = styled("section")({
  display: "flex",

  "& > h6": {
    margin: "0px",
    fontSize: "2rem",
    fontWeight: "500",
    letterSpacing: "0px",
    lineHeight: "1.75",
    fontFamily: "Inter, sans-serif",
    color: "rgb(255, 255, 255)",
  },
});

export { ProfileContainer };
