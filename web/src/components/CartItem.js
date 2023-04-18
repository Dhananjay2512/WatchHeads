import { Button } from "@mui/material";
import { useAppContext } from "../context/context";
import { Root } from "../styles/components/CartItem";
// Types

// Styles

// display: flex;
//   justify-content: space-between;
//   font-family: Arial, Helvetica, sans-serif;
//   border-bottom: 1px solid lightblue;
//   padding-bottom: 20px;

//   div {
//     flex: 1;
//   }

//   .information,
//   .buttons {
//     display: flex;
//     justify-content: space-between;
//   }

//   img {
//     max-width: 80px;
//     object-fit: cover;
//     margin-left: 40px;
//   }
// `;

const CartItem = (item) => {
  console.log(item);
  const value = useAppContext();

  return (
    <Root>
      <div>
        <h3>{item.title}</h3>
        <div>
          <p>Price: ${item.price.toFixed(2)}</p>
          <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
        </div>
        <div>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => value?.Decrease(item.id)}
          >
            -
          </Button>
          <p>{item.quantity}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => value?.Increase(item.id)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.image} alt={item.title} />
    </Root>
  );
};

export default CartItem;
