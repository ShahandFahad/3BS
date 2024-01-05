import React from "react";
import "./Product.css";
import currencyFormatter from "currency-formatter";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { publicRequest } from "../../../requestMethods";

function SoldProduct({ product }) {
  const user = useSelector((state) => state.user);
  //   // handle click views
  const handleViewsClick = async (id, userid) => {
    try {
      const addView = await publicRequest.post(`/productviews/add`, {
        userId: userid,
        productId: id,
        viewer: user._id,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="sold__product"
      onClick={() => handleViewsClick(product._id, product.userId)}
    >
      <img src={product.photos[0]} />
      <div>
        <p className="product__title">
          {product.title.length < 16
            ? product.title
            : product.title.slice(0, 15) + "..."}
        </p>
        <p className="product__price">
          {currencyFormatter.format(product.price, { code: "" })}
          <span>(PKR)</span>
        </p>
      </div>
    </Link>
  );
}

export default SoldProduct;
