import React, { useContext } from "react";
import { Box } from "@mui/material";
// context
import { ProductContext } from "../contexts/ProductContextProvider";
// components
import Products from "./common/Products";
import Loading from "./Loading";

const Store = () => {
  const products = useContext(ProductContext); // Accessing the product data from the ProductContext

  return (
    <Box component="div" className="store-container">
      {products.length ? ( // Checking if there are products available
        products.map((product) => (
          <Products key={product.id} productData={product} /> // Rendering the Products component for each product
        ))
      ) : (
        <Box component="div" className="loading-container">
          <Loading />
          {/* Displaying the Loading component if the product data is empty (loading state) */}
        </Box>
      )}
    </Box>
  );
};

export default Store;
