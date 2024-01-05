import React, { useEffect, useState } from "react";
import "./RelatedProduct.css";
import currencyFormatter from "currency-formatter";
import { Link } from "react-router-dom";
import * as timeago from "timeago.js";
import { publicRequest } from "../../../requestMethods";
import { useSelector } from "react-redux";

function RecentProduct({ product }) {
  const [productViews, setProductViews] = useState([]);
  const user = useSelector((state) => state.user);
  // fetch product views
  useEffect(() => {
    const fetchVeiws = async () => {
      const fetched = await publicRequest.get(
        `/productviews/allviews/find/${product._id}`
      );
      setProductViews(fetched.data);
    };
    fetchVeiws();
  }, []);
  // handle click views
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
      onClick={() => handleViewsClick(product._id, product.userId)}
    >
      <div className="recent__product">
        <img src={product.photos[0]} />
        <div>
          <div className="title">
            <p>
              {" "}
              {product.title.length > 12
                ? product.title.slice(0, 12) + "..."
                : product.title}
            </p>
            <div className="titleviews">Views {productViews.length}</div>
          </div>
          <p className="price">
            {currencyFormatter.format(product.price, { code: "" })}
            <span>(PKR)</span>
          </p>
        </div>
        <div className="product__from">
          <p>
            {product.location.length > 20
              ? product.location.slice(0, 20) + "..."
              : product.location}
          </p>
          <p>{timeago.format(product.createdAt)}</p>
        </div>
      </div>
    </Link>
  );
}

export default RecentProduct;
