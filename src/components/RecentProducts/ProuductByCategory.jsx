import React, { useEffect, useState } from "react";
import "./RecentProducts.css";
// import { products } from "../../products";
import RecentProduct from "./RecentProduct/RecentProduct";
import { publicRequest } from "../../requestMethods";
import { loader } from "../../loader";

export default function ProuductByCategory({ title, items, listFor, path }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch all product of current user
  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const fechedProducts = await publicRequest.get(`/product/sell/all`);
        setProducts(fechedProducts.data);
        setLoading(false);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getProducts();
  }, []);
  return !loading ? (
    <div className="recent__products">
      <h1 className="text-xl">{title}</h1>
      <div className="border p-6  rounded-md bg-gray-100 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {products.map((product, index) =>
          index < items && product.listFor === listFor ? (
            <RecentProduct key={product.id} product={product} path={path} />
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  ) : (
    <div className="loader">
      <img alt="" src={loader} style={{ margin: "50px 0" }} />
    </div>
  );
}
