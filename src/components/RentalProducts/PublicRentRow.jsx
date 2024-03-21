import React, { useEffect, useState } from "react";
import currencyFormatter from "currency-formatter";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { publicRequest } from "../../requestMethods";
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";

function PublicRentRow({ product, mode }) {
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
          <div
            class={`h-2.5 w-2.5 rounded-full me-2
              ${product.status === "rented" ? "bg-red-500" : "bg-green-500"}`}
          ></div>

          <>{product.status.toUpperCase()}</>
        </div>
      </td>

      <td class="relative px-6 py-4">
        <a
          href="##"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {/* Show More Icon */}
          {/* <MoreVertIcon onClick={() => setModal(!modal)} /> */}
          <Link to={`/rentproductdetails/${product._id}`}>
            <button
              type="button"
              class={`text-white  hover:bg-blue-800 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none
            ${
              product.status === "rented"
                ? "bg-red-500 cursor-not-allowed hover:bg-red-800"
                : "bg-blue-600"
            }
            `}
              disabled={product.status === "rented" ? true : false}
            >
              Rent
            </button>
          </Link>
        </a>
      </td>
    </tr>
  );
}

export default PublicRentRow;
