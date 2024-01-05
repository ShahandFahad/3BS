import React from "react";
import { Link } from "react-router-dom";
import "./SuggestCategories.css";
function SuggestCategories() {
  const categories = [
    "furniture",
    "vehicles",
    "photos",
    "mobile phones",
    "computers",
    "toys",
    "birds",
    "houses",
    "motercycles",
    "accessoris",
    "bikes",
  ];
  return (
    <div className="suggest__categories">
      <h1>Categories</h1>
      <div className="btns">
        {categories.map((cat) => (
          <Link to={`/search?product=${cat}`} key={cat}>
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SuggestCategories;
