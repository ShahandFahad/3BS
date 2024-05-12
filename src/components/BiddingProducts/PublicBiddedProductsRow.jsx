import React from "react";
import currencyFormatter from "currency-formatter";
import { Link } from "react-router-dom";

export default function PublicBiddedProductsRow({ product }) {
  // since added product
  let productDate = new Date(product?.createdAt).toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });
  return (
    <tr class="bg-white border-b hover:bg-gray-50">
      <td class="w-4 p-4">
        <div class="flex items-center">
          <img
            class="w-10 h-10 rounded-full"
            src={product.photos[0]}
            alt="EX-Img"
          />
        </div>
      </td>
      <th
        scope="row"
        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
      >
        <div class="ps-3">
          <div class="text-base font-semibold">{product.title}</div>
          <div class="font-normal text-gray-500">
            Ends In {/*productDate*/} : {product.auctionDuration}
          </div>
        </div>
      </th>

      <td class="px-6 py-4">
        {currencyFormatter.format(product.auctionStartingBid, { code: "" })}
      </td>
      <td class="relative px-6 py-4">{product.bids.length}</td>
      <td class="px-6 py-4">
        {product.condition && <span>{product.condition}</span>}
      </td>

      <td class="px-6 py-4">
        <div class="flex items-center">
          {/* <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                    Online */}
          <div
            class={`h-2.5 w-2.5 rounded-full me-2
              ${
                product.status === "requested" ? "bg-red-500" : "bg-green-500"
              }`}
          ></div>

          <>{product.status.toUpperCase()}</>
        </div>
      </td>

      <td class="relative px-6 py-4">
        {/* Show More Icon */}
        {/* <MoreVertIcon onClick={() => setModal(!modal)} /> */}
        <Link to={`/listforbidding/${product._id}`}>
          <button
            type="button"
            class={`text-white bg-blue-600 hover:bg-blue-800 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none "
            `}
          >
            Place Bid on Product
          </button>
        </Link>
      </td>
    </tr>
  );
}
