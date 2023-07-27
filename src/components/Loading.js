import React from "react";
// loading img
import loader from "../assets/img/loader.gif";

const Loading = () => {
  return (
    <div>
      <img src={loader} alt="loading" /> {/* Displaying the loader image */}
    </div>
  );
};

export default Loading;
