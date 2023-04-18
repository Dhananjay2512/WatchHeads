import { lightBlue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

// root: {
//   display: "flex",
//   justifyContent: "space-between",
//   BorderBottom: 1,
//   BorderBottomColor: lightBlue,
//   paddingBottom: 20,
// },
// container: {
//   flex: 1,
// },
// information: {
//   display: "flex",
//   justifyContent: "space-between",
//   paddingTop: 20,
//   paddingBottom: 20,
// },
// img: {
//   maxWidth: 80,
//   objectFit: "cover",
//   marginLeft: 40,
// },

const Root = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  BorderBottom: 1,
  BorderBottomColor: lightBlue,
  paddingBottom: 20,

  "& > div": {
    flex: 1,

    "& > div": {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 20,
      paddingBottom: 20,
    },
  },

  "& > img": {
    maxWidth: 80,
    objectFit: "cover",
    marginLeft: 40,
  },
});

export { Root };
