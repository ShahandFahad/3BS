import React, { useEffect, useState } from "react";
import "./SingleCurrentUserProduct.css";
import currencyFormatter from "currency-formatter";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { publicRequest, userRequest } from "../../../requestMethods";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";

function SingleCurrentUserProduct({ product, mode }) {
  const [modal, setModal] = useState(false);
  const [productViews, setProductViews] = useState([]);
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
  // since added product
  let productDate = new Date(product?.createdAt).toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });

  // handleremove
  const removeProduct = async (behave) => {
    const confirmation = window.confirm(
      "This product will be deleted parmanently."
    );
    if (confirmation && behave === "sell") {
      try {
        const products = await userRequest.delete(
          `/product/sell/delete/${product._id}`
        );
        setModal(false);
      } catch (err) {
        console.log(err.response.data);
      }
    } else if (confirmation && behave === "exchange") {
      const products = await userRequest.delete(
        `/exchangeproduct/exchange/delete/${product._id}`
      );
      setModal(false);
    } else {
      setModal(false);
    }
  };

  // handle Status for exchange product
  const handleExchangeStatus = async (status) => {
    try {
      status === "exchange"
        ? (await userRequest.put(
            `/exchangeproduct/exchange/edit/status/${product._id}`,
            {
              status,
            }
          )) && setModal(false)
        : (await userRequest.put(
            `/exchangeproduct/exchange/edit/status/${product._id}`,
            {
              status,
            }
          )) && setModal(false);
      /**
       * When The status for product exchange is changed. Refreset the page
       * This not an efficient way to do it. Just for Temprory purpose.
       * In, Future Implement a state refresh. The react way. of doing it.
       */
      window.location.reload();
    } catch (err) {
      console.log(err.response.data);
    }
  };

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
          <div class="font-normal text-gray-500">{productDate}</div>
        </div>
      </th>
      <td class="px-6 py-4">👁 {productViews?.length}</td>
      <td class="px-6 py-4">
        {currencyFormatter.format(product.price, { code: "" })}
      </td>
      <td class="px-6 py-4">
        {product.condition && <span>{product.condition}</span>}
      </td>

      <td class="px-6 py-4">
        <div class="flex items-center">
          {/* <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                    Online */}
          <Link
            to={
              product.status === "exchange" &&
              `/exchangeproductdetails/${product._id}`
            }
          >
            <span class="flex items-center text-gray-500">
              <div
                class={`h-2.5 w-2.5 rounded-full me-2
              ${
                product.status === "Sold" ||
                product.status === "exchanged" ||
                product.status === "sold"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
              ></div>

              {/* style=
               */}
              {product.status === "exchange" ? (
                <>Exchange</>
              ) : (
                <>{product.status.toUpperCase()}</>
              )}
            </span>
          </Link>
        </div>
      </td>

      {/* Model for More Details */}
      <div class="relative">
        <div class="absolute top-0 right-10 mt-[-10px] w-full z-10 overflow-y-auto max-h-screen">
          {modal && (
            <div class="bg-white border border-gray-200 rounded-lg py-2">
              {mode === "sell" ? (
                <>
                  <p
                    onClick={() => removeProduct("sell")}
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    Delete
                  </p>
                  <Link
                    to={`/editproduct/${product._id}`}
                    class="px-4 py-2 block cursor-pointer hover:bg-gray-100"
                  >
                    Edit
                  </Link>
                  <p
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </p>
                </>
              ) : (
                <>
                  <p
                    onClick={() => removeProduct("exchange")}
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    Delete
                  </p>
                  <Link
                    to={`/editexchangeproduct/${product._id}`}
                    class="px-4 py-2 block cursor-pointer hover:bg-gray-100"
                  >
                    Edit
                  </Link>
                  {product.status === "exchange" ? (
                    <p
                      onClick={() => handleExchangeStatus("exchanged")}
                      class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      Mark as Exchanged
                    </p>
                  ) : (
                    <p
                      onClick={() => handleExchangeStatus("exchange")}
                      class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      Mark as Exchange
                    </p>
                  )}
                  <Link
                    to={`/exchangeproductdetails/${product._id}`}
                    class="px-4 py-2 block cursor-pointer hover:bg-gray-100"
                  >
                    Exchange NOW
                  </Link>
                  <p
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        <td class="relative px-6 py-4">
          <a
            href="##"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {/* Show More Icon */}
            <MoreVertIcon onClick={() => setModal(!modal)} />
          </a>
        </td>
      </div>
    </tr>
  );
}

export default SingleCurrentUserProduct;
