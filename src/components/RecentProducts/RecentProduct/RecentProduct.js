import React, { useEffect, useState } from "react";
import "./RecentProduct.css";
import currencyFormatter from "currency-formatter";
import { Link } from "react-router-dom";
import * as timeago from "timeago.js";
import { publicRequest } from "../../../requestMethods";
import { useSelector } from "react-redux";
import { MapPinIcon } from "@heroicons/react/24/outline";
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
      {/* <div className="recent__product">
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
      </div> */}
      <div class="h-auto max-w-full rounded-lg bg-white rounded-lg overflow-hidden shadow-lg ring-1 ring-gray-300 ring-opacity-40 max-w-sm">
        <div class="relative flex justify-center border">
          <img
            class="h-48 max-w-full rounded-lg"
            src={product.photos[0]}
            alt=""
          />
          <div class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
            Views {productViews.length}
          </div>
        </div>
        <div class="p-4 bg-stone-100">
          <h3 class="text-lg font-medium mb-2 border-b-2 border-gray-900">
            {product.title.length > 12
              ? product.title.slice(0, 12) + "..."
              : product.title}
          </h3>
          <p class="text-gray-600 text-sm mb-4">
            {product.location.length > 20
              ? product.location.slice(0, 20) + "..."
              : product.location}
          </p>
          <p>{timeago.format(product.createdAt)}</p>
          <div class="flex items-center justify-between">
            <span class="text font-bold">
              <span className="text-lg">Rs</span>
              {currencyFormatter.format(product.price, { code: "" })}
            </span>
            <button class="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecentProduct;
