import React from "react";
import ExchangeProduct from "../../components/ExchangeProduct/ExchangeProduct";
import Gallary from "../../components/Gallary/Gallary";
import Navbar from "../../components/Navbar/Navbar";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import "./ExchangeWithProduct.css";
function ExchangeWithProduct() {
  return (
    <>
      <Navbar />
      <div className="exchange__product__with">
        <Gallary />
        <ProductDetails mode="exchange" chatBtn={true} />
      </div>
    </>
  );
}

export default ExchangeWithProduct;
