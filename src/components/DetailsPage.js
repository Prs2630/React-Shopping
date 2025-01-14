import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
// functions
import { isSelected, quantityCount } from "../helper/functions";
// icons
import { BsFillTrashFill } from "react-icons/bs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Avatar, IconButton, Typography } from "@mui/material";
// context
import { CardContext } from "../contexts/CardContextProvider";
// components
import Loading from "./Loading";
import Banner from "./Banner";

const DetailsPage = () => {
  const { state, dispatch } = useContext(CardContext); // Accessing the state and dispatch function from the CardContext
  const [currentProduct, setCurrentProduct] = useState([]); // Setting up the state for the current product

  const GetCurrentProduct = async () => {
    const BASE_URL = "https://fakestoreapi.com/products";
    const result = await axios.get(`${BASE_URL}/${id}`); // Fetching the current product based on the ID
    return result.data;
  };
  useEffect(() => {
    const fetchAPI = async () => {
      setCurrentProduct(await GetCurrentProduct()); // Setting the current product data in the state
    };
    fetchAPI();
  }, []);

  const params = useParams();
  const id = params.id;

  return (
    <Box component="div" className="details-container">
      {currentProduct.id ? (
        <Box component="div" className="container">
          <Box component="div" className="img-container">
            <img src={currentProduct.image} alt={`product/${id}`} />
          </Box>
          <Box component="div" className="information">
            <Box component="div" className="text-container">
              <Typography
                variant="body1"
                color="initial"
                sx={{ lineHeight: 3 }}
              >
                {currentProduct.title}
              </Typography>

              <Typography
                component="p"
                variant="body1"
                color="primary"
                fontWeight={700}
                display="flex"
              >
                Info:
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight={400}
                >
                  {currentProduct.description}
                </Typography>
              </Typography>

              <Typography
                variant="body1"
                color="primary"
                fontWeight={700}
                sx={{ lineHeight: 3 }}
                display="flex"
                alignItems="center"
              >
                Category:
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight={400}
                >
                  {currentProduct.category}
                </Typography>
              </Typography>

              <Typography
                variant="body1"
                color="primary"
                fontWeight={700}
                sx={{ lineHeight: 3 }}
                display="flex"
                alignItems="center"
              >
                Price:
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight={400}
                >
                  ${currentProduct.price}
                </Typography>
              </Typography>

              <Box component="div">
                <Typography
                  variant="body1"
                  color="primary"
                  fontWeight={700}
                  display="flex"
                  alignItems="center"
                  sx={{ lineHeight: 3 }}
                >
                  Rate:
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={400}
                  >
                    {currentProduct.rating.rate}
                  </Typography>
                  <Rating
                    sx={{ marginLeft: 1 }}
                    name="half-rating-read"
                    defaultValue={currentProduct.rating.rate}
                    precision={0.1}
                    readOnly
                  />
                </Typography>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={400}
                sx={{ lineHeight: 1 }}
              >
                {currentProduct.rating.count} items of this product left!
              </Typography>
            </Box>

            <CardActions>
              {quantityCount(state, currentProduct.id) > 1 && (
                <IconButton
                  onClick={() =>
                    dispatch({ type: "DECREASE", payload: currentProduct }) // Dispatching a 'DECREASE' action with the payload as the current product
                  }
                  aria-label="RemoveCircleIcon"
                  size="large"
                >
                  <RemoveCircleIcon fontSize="inherit" />
                </IconButton>
              )}
              {quantityCount(state, currentProduct.id) === 1 && (
                <IconButton
                  onClick={() =>
                    dispatch({ type: "REMOVE_ITEM", payload: currentProduct }) // Dispatching a 'REMOVE_ITEM' action with the payload as the current product
                  }
                  color="error"
                  aria-label="delete"
                  size="large"
                >
                  <BsFillTrashFill fontSize="inherit" />
                </IconButton>
              )}
              {quantityCount(state, currentProduct.id) > 0 && (
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: "#608f57",
                    marginLeft: "7px",
                  }}
                  alt="Remy Sharp"
                >
                  {quantityCount(state, currentProduct.id) > 0 && (
                    <span>{quantityCount(state, currentProduct.id)}</span>
                  )}
                </Avatar>
              )}
              {isSelected(state, currentProduct.id) ? (
                <IconButton
                  aria-label="AddCircleIcon"
                  size="large"
                  onClick={() =>
                    dispatch({ type: "INCREASE", payload: currentProduct }) // Dispatching an 'INCREASE' action with the payload as the current product
                  }
                >
                  <AddCircleIcon fontSize="inherit" />
                </IconButton>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  onClick={() =>
                    dispatch({ type: "ADD_ITEM", payload: currentProduct }) // Dispatching an 'ADD_ITEM' action with the payload as the current product
                  }
                >
                  Add to card
                </Button>
              )}
            </CardActions>
            <Link to="/products">Back to store</Link>
          </Box>
        </Box>
      ) : (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      <Banner />
    </Box>
  );
};

export default DetailsPage;
