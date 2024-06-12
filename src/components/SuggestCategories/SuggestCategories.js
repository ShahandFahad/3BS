import React from "react";
import { Link } from "react-router-dom";
import "./SuggestCategories.css";

function SuggestCategories() {
  const categories = [
    { name: "furniture", icon: "🛋️" },
    { name: "vehicles", icon: "🚗" },
    { name: "photos", icon: "📷" },
    { name: "mobile phones", icon: "📱" },
    { name: "computers", icon: "💻" },
    { name: "toys", icon: "🧸" },
    { name: "birds", icon: "🐦" },
    { name: "houses", icon: "🏠" },
    { name: "motorcycles", icon: "🏍️" },
    { name: "accessories", icon: "💍" },
    { name: "bikes", icon: "🚲" },
  ];

  return (
    <div className="suggest__categories">
      <fieldset class="border-t border-gray-300">
        <legend class="mx-auto px-4 text text-gray-400 text-xl">
          Top Categories
        </legend>

        <div className="btns">
          {categories.map((cat) => (
            <Link to={`/search?product=${cat.name}`} key={cat.name}>
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default SuggestCategories;
