import React from "react";
import "./SalesItems.css";
import SingleItem from "./SingleItem";
function SalesItems({ title, products }) {
  return (
    <div className="sales__items">
      <h1>{title}</h1>
      {/* single item */}
      <div className="items">
        {products.map((product) => (
          <SingleItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default SalesItems;
