import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Importing Swiper components from 'swiper/react'
import { Pagination, Navigation } from "swiper"; // Importing Pagination and Navigation modules from 'swiper'
import { ProductContext } from "../contexts/ProductContextProvider"; // Importing the ProductContext from the ProductContextProvider
import { shorten } from "../helper/functions"; // Importing the shorten function from the helper functions file
import "swiper/css/pagination"; // Importing the CSS for pagination
import "swiper/css/navigation"; // Importing the CSS for navigation
import "swiper/css"; // Importing the main Swiper CSS
import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material"; // Importing Material-UI components

const Banner = () => {
  const data = useContext(ProductContext); // Accessing the product data from the ProductContext

  return (
    <div style={{ margin: "200px 0" }}>
      <Swiper
        slidesPerView={5} // Displaying 5 slides per view
        spaceBetween={30} // Adding 30px of space between slides
        slidesPerGroup={3} // Grouping 3 slides together
        loop={true} // Enabling the infinite loop
        loopFillGroupWithBlank={true} // Filling the group with blank slides when needed
        pagination={{
          clickable: true, // Making the pagination bullets clickable
        }}
        navigation={true} // Enabling navigation buttons (previous and next)
        modules={[Pagination, Navigation]} // Adding the Pagination and Navigation modules
        className="mySwiper" // Adding a CSS class to the Swiper container
      >
        {data.map((items) => (
          <SwiperSlide key={items.id}>
            <Card sx={{ height: "250px" }}>
              <CardMedia component="div">
                {items.image ? (
                  <img
                    src={items.image}
                    alt={items.id}
                    loading="lazy"
                    style={{
                      width: "100px",
                      display: "flex",
                      margin: "0 auto",
                    }}
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width={"250px"}
                    height={"250px"}
                    sx={{ bgcolor: "grey.900" }}
                  />
                )}
              </CardMedia>
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{ position: "absolute", bottom: 8, color: "#000" }}
                  gutterBottom
                  variant="h5"
                  component="h3"
                >
                  {shorten(items.title)} {/* Using the shorten function to display a shortened version of the title */}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
