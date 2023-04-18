import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeroContainer = styled("section")({
  flexGrow: 1,
  display: "flex",
});

const ImgContainer = styled("div")({
  height: "100%",
  width: "100%",

  "& > img": {
    height: "100%",
    width: "100%",
    display: "block",
  },
});

const ContentContainer = styled("main")({
  textAlign: "center",
  "& > h3": {
    fontFamily: "'Cormorant Upright' ,serif",
    color: "#fff",
    fontSize: "10rem",
    lineHeight: "250px",
    margin: "1rem 0rem",
  },

  "& > h6": {
    color: "#AE946A",
    fontSize: "3rem",
    margin: "1rem 0rem",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "400",
  },

  "& > p": {
    color: "rgba(229, 229, 229, 0.5)",
    fontSize: "2rem",
    width: "60%",
    margin: "0rem auto 1rem",
    fontFamily: "'Poppins', sans-serif",
  },

  "& > button": {
    background: "linear-gradient(347.02deg, #646464 -37.61%, rgba(98, 98, 98, 0.34) 227.5%);",
    color: "white !important",
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: "1rem",
    fontFamily: "'Poppins', sans-serif",

    "& a": {
      color: "white",
    },
  },
});

const NavFix = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

export { HeroContainer, ImgContainer, NavFix, ContentContainer };
