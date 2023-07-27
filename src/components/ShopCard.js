import React, { useContext } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
// Components
import Card from "./Card";

// Context
import { CardContext } from "../contexts/CardContextProvider";

const ShopCard = () => {
  const { state, dispatch } = useContext(CardContext); // Accessing the state and dispatch function from the CardContext

  return (
    <Box component="div" className="shopCard-container">
      <Box component="div" className="checkout-container">
        {state.itemsCounter > 0 && (
          <Box component="div" className="total-container">
            <Box component="div">
              <Typography
                variant="body1"
                color="primary"
                fontWeight={700}
                display="flex"
                alignItems="center"
              >
                Total Items:
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight={400}
                >
                  {state.itemsCounter}
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                color="primary"
                fontWeight={700}
                display="flex"
                alignItems="center"
              >
                Total Payments:
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight={400}
                >
                  ${state.total}
                </Typography>
              </Typography>
            </Box>

            <Box component="div" className="btn-container">
              <Button
                variant="contained"
                color="success"
                onClick={() => dispatch({ type: "CHECKOUT" })} // Dispatching a 'CHECKOUT' action when the checkout button is clicked
              >
                Check Out
              </Button>
              <Button
                variant="text"
                onClick={() => dispatch({ type: "CLEAR" })} // Dispatching a 'CLEAR' action when the clear button is clicked
                color="error"
              >
                Clear
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {state.checkout &&
        (swal({
          text: "Checked Out Successfully!",
          icon: "success",
        }),
          (
            <Box component="div" className="checkout-card">
              <Typography variant="h3" color="primary" fontWeight={700}>
                Checked Out Successfully!
              </Typography>
              <Link to="/products">Back to shop</Link>
            </Box>
          ))}

      {!state.checkout && state.itemsCounter === 0 && (
        <Box component="div" className="empty-card">
          <Typography variant="h3" color="primary">
            Your card is empty!
          </Typography>
          <Link to="/products">Back to Shop</Link>
        </Box>
      )}
      <Box component="div">
        {state.selectedItems.map((item) => (
          <Card key={item.id} data={item} /> // Rendering the Card component for each selected item
        ))}
      </Box>
    </Box>
  );
};

export default ShopCard;
