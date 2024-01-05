import React, { useEffect, useState } from "react";
import "./AllCurrentUserProducts.css";
import SingleCurrentUserProduct from "./SingleCurrentUserProduct/SingleCurrentUserProduct";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { loader } from "../../loader";

function AllCurrentUserProducts({ mode }) {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [exchangeProducts, setExchangeProducts] = useState([]);
  // loading
  const [loading, setLoading] = useState(false);
  // fetch all product of current user
  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const fechedProducts = await publicRequest.get(
          `/product/sell/all/${user._id}`
        );
        setProducts(fechedProducts.data.allProducts);
        setLoading(false);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getProducts();
  }, []);

  // fetch all Exchange product of current user
  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const fechedProducts = await publicRequest.get(
          `/exchangeproduct/exchange/all/${user._id}`
        );
        setExchangeProducts(fechedProducts.data.allProducts);
        setLoading(false);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="all__current__user__products">
      {!loading ? (
        mode === "sell" ? (
          products.map((product) => (
            <SingleCurrentUserProduct product={product} mode={mode} />
          ))
        ) : (
          exchangeProducts.map((product) => (
            <SingleCurrentUserProduct product={product} mode={mode} />
          ))
        )
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <img src={loader} width={30} />
        </div>
      )}
    </div>
  );
}

export default AllCurrentUserProducts;
