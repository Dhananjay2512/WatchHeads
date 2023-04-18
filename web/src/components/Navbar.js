import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginModal from "./LoginModal";
import ProfileSection from "./ProfileSection";
import { useAppContext } from "../context/context";
import CartPopper from "./CartPopper";

const navItems = ["Home", "Product", "Contact"];
const navLinks = {
  Home: "/",
  Product: "/product",
  Contact: "/contact",
};

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => setOpenModal(false);

  const { isUserAuthenticated, state, logout } = useAppContext();

  return (
    <Box>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "#0B0B0B",
          position: "relative",
        }}
      >
        <Toolbar
          sx={{
            padding: "2rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            flexGrow: 1,
            flexShrink: 1,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexBasis: "40%",
              display: { xs: "none", sm: "block" },
              fontFamily: "Great Vibes",
              fontSize: "2rem",
            }}
          >
            WH
          </Typography>

          <Box
            sx={{
              flexBasis: "60%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                flexBasis: "70%",
                display: "flex",
                justifyContent: "space-between",
                alignItem: "center",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              {navItems.map((item) => {
                const link = `${process.env.REACT_APP_WEB_ENDPOINT}${navLinks[item]}`;
                return (
                  <Button
                    key={item}
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      fontSize: "1.2rem",
                      "& > a": {
                        color: "inherit",
                        textDecoration: "none",
                      },
                    }}
                  >
                    <a href={link}>{item}</a>
                    {/* {item} */}
                  </Button>
                );
              })}
            </Box>
            <Box>
              {!isUserAuthenticated() ? (
                <Button
                  href="#"
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5, color: "#fff", borderColor: "#fff" }}
                  onClick={() => setOpenModal(true)}
                >
                  Login
                </Button>
              ) : (
                <ProfileSection
                  username={state.username}
                  logout={logout}
                  handleClick={handleClick}
                />
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <LoginModal open={openModal} handleClose={handleCloseModal} />
      <CartPopper anchorEl={anchorEl} handleClose={handleClose} />
    </Box>
  );
};

export default Navbar;
