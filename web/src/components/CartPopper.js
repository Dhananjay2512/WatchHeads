import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { useAppContext } from "../context/context";
import CartItem from "./CartItem";

export default function CartPopper({ anchorEl, handleClose }) {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const {
    state: { cartItem, TotalAmount },
  } = useAppContext();

  console.log(cartItem);

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Container
          sx={{
            minWidth: "500px",
            textAlign: "center",
          }}
        >
          <Typography sx={{ p: 2 }} variant="h4">
            Your Cart
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {cartItem &&
              cartItem.map((item) => {
                return <CartItem {...item} />;
              })}
          </Box>

          <Typography variant="h4" sx={{ padding: "2rem" }}>
            Total: $ {TotalAmount && TotalAmount.toFixed(2)}
          </Typography>
        </Container>
      </Popover>
    </div>
  );
}
