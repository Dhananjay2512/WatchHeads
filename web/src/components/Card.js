import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinkIcon from "@mui/icons-material/Link";
import { Box, Link } from "@mui/material";
import { useAppContext } from "../context/context";

export default function ImgMediaCard({ props, index, id }) {
  const { AddToCart } = useAppContext();
  let { name, description, current_price, link } = props;
  // console.log(props, id);

  const cartObj = {
    title: name,
    id: id,
    price: current_price,
    image: `${index}.webp`,
    quantity: 1,
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia component="img" alt="green iguana" height="140" image={`${index}.webp`} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Button size="small">${current_price}</Button>
          <Button size="small" onClick={() => AddToCart(cartObj)}>
            Add to Cart
          </Button>
        </Box>

        <Link href={link}>
          <LinkIcon />
        </Link>
      </CardActions>
    </Card>
  );
}
