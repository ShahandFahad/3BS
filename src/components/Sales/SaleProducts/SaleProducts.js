import React, { useEffect, useState } from "react";
import "./SaleProducts.css";
import { Link } from "react-router-dom";
import { publicRequest } from "../../../requestMethods";
import { useSelector } from "react-redux";
import { loader } from "../../../loader";
function SaleProducts() {
  const user = useSelector((state) => state.user);
  const [allProducts, setAllProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      const allProducts = await publicRequest.get(
        `/product/sell/all/${user._id}`
      );
      setAllProducts(allProducts.data.allProducts);
      setAvailableProducts(allProducts.data.availableProducts);
      setSoldProducts(allProducts.data.soldProducts);
      setPendingProducts(allProducts.data.pendingProducts);
      setLoading(false);
    };
    fetchAllProducts();
  }, []);

  return (
    <div className="sale__products">
      <Link
        className="single__sale__product"
        style={{ backgroundColor: "#3A6562" }}
        to="/analytics/totalproducts"
      >
        <p>Total Products</p>
        {!loading ? (
          <h1>{allProducts.length}</h1>
        ) : (
          <img src={loader} width={30} style={{ marginTop: "10px" }} />
        )}
      </Link>
      <Link
        className="single__sale__product"
        style={{ backgroundColor: "#20365A" }}
        to="/analytics/availableproducts"
      >
        <p>Available Products</p>
        {!loading ? (
          <h1>{availableProducts.length}</h1>
        ) : (
          <img src={loader} width={30} style={{ marginTop: "10px" }} />
        )}
      </Link>
      <Link
        className="single__sale__product"
        style={{ backgroundColor: "#7A39A2" }}
        to="/analytics/soldproducts"
      >
        <p>Sold Products</p>
        {!loading ? (
          <h1>{soldProducts.length}</h1>
        ) : (
          <img src={loader} width={30} style={{ marginTop: "10px" }} />
        )}
      </Link>
      <Link
        className="single__sale__product"
        style={{ backgroundColor: "#C23FBE" }}
        to="/analytics/pendingproducts"
      >
        <p>Pending Products</p>
        {!loading ? (
          <h1>{pendingProducts.length}</h1>
        ) : (
          <img src={loader} width={30} style={{ marginTop: "10px" }} />
        )}
      </Link>
    </div>
  );
}

export default SaleProducts;
