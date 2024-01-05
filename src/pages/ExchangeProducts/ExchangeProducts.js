import React from "react";
import AllCurrentUserProducts from "../../components/AllCurrentUserProducts/AllCurrentUserProducts";
import Navbar from "../../components/Navbar/Navbar";
import "./ExchangeProducts.css";
import { Link } from "react-router-dom";

function ExchangeProducts() {
  return (
    <>
      <Navbar />
      <div className="exchange__product">
        <div className="exchange__header">
          <h1>All Products for Exchange</h1>
          <Link to="/addexchangeproduct">Add New Product</Link>
        </div>
        <AllCurrentUserProducts mode="exchange" />
      </div>
    </>
  );
}

export default ExchangeProducts;
