import React from "react";
import "./Award.css";
import { Link } from "react-router-dom";
function Award() {
  return (
    <div className="sale__products">
      <Link
        className="single__sale__product"
        style={{ backgroundColor: "#3A6562" }}
        to="/awards/details"
      >
        <p>Level </p>
        <h1>01</h1>
        <div className="award__progress">
          <div className="progressbar"></div>
        </div>
      </Link>
    </div>
  );
}

export default Award;
