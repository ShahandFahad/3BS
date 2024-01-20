import React, { useEffect, useState } from "react";
import "./SingleCurrentUserProduct.css";
import currencyFormatter from "currency-formatter";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { publicRequest, userRequest } from "../../../requestMethods";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

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
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="single__current__user__product">
      <img src={product.photos[0]} />
      <p className="title">{product.title}</p>
      <div className="flex gap-2 bg-gray-700 p-2 text-sm text-white rounded">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fill-rule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </span>{" "}
        <span>{productViews?.length}</span>
      </div>
      {product.condition && <p className="title">{product.condition}</p>}
      <p className="price">
        {currencyFormatter.format(product.price, { code: "" })}
        <span>(Pkr)</span>
      </p>
      <Link
        to={
          product.status === "exchange" &&
          `/exchangeproductdetails/${product._id}`
        }
        className="status"
        style={
          product.status === "Sold" ||
          product.status === "exchanged" ||
          product.status === "sold"
            ? { backgroundColor: "#111827" }
            : { backgroundColor: "#22c55e" }
        }
      >
        {product.status === "exchange" ? (
          "EXCHANGE NOW"
        ) : (
          <span className="font-bold">{product.status.toUpperCase()}</span>
        )}
      </Link>

      <p className="createdAt">{productDate}</p>
      {/* more icon */}
      <MoreVertIcon onClick={() => setModal(!modal)} />
      {modal &&
        (mode === "sell" ? (
          <div className="modal">
            <>
              <p onClick={() => removeProduct("sell")}>Delete</p>
              <Link to={`/editproduct/${product._id}`}>
                <p>Edit</p>
              </Link>
            </>
            <CloseIcon onClick={() => setModal(false)} />
          </div>
        ) : (
          <div className="modal">
            <>
              <p onClick={() => removeProduct("exchange")}>Delete</p>
              <Link to={`/editexchangeproduct/${product._id}`}>
                <p>Edit</p>
              </Link>
              {product.status === "exchange" ? (
                <p onClick={() => handleExchangeStatus("exchanged")}>
                  Mark as Exchanged
                </p>
              ) : (
                <p onClick={() => handleExchangeStatus("exchange")}>
                  Mark as Exchange
                </p>
              )}
              <Link to={`/exchangeproductdetails/${product._id}`}>
                <p>Exchange NOW</p>
              </Link>
            </>
            <CloseIcon onClick={() => setModal(false)} />
          </div>
        ))}
    </div>
  );
}

export default SingleCurrentUserProduct;
