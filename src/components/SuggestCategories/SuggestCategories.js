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
      <fieldset class="border-t border-gray-300">
        <legend class="mx-auto px-4 text text-gray-400 text-xl">
          Top Categories
        </legend>

        <div className="btns">
          {categories.map((cat) => (
            <Link to={`/search?product=${cat}`} key={cat}>
              {cat}
            </Link>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default SuggestCategories;
