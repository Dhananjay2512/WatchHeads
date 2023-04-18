import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { deepOrange } from "@mui/material/colors";
import { ProfileContainer } from "../styles/components/ProfileSection";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const ProfileSection = ({ username, logout, handleClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
          {username ? username[0] : "r"}
        </Avatar>
      </Box>

      <ProfileContainer>
        <Typography variant="h6" sx={{ color: "white" }}>
          {username}
        </Typography>
      </ProfileContainer>

      <ShoppingCartOutlinedIcon
        onClick={handleClick}
        sx={{
          color: "white",
          fontSize: "2rem",
          cursor: "pointer",
        }}
      />

      <Button
        href="#"
        variant="outlined"
        sx={{ my: 1, mx: 1.5, color: "#fff", borderColor: "#fff" }}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default ProfileSection;
