import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Navbar2 from "../../components/Navbar/Navbar2";
import ExchangeProductForm from "../../components/ProductForm/ExchangeProductForm";
import ProductForm from "../../components/ProductForm/ProductForm";
import "./NewProduct.css";
function NewProduct({ mode }) {
  return (
    <>
      {/* Navbar */}
      <Navbar2 />

      {/* New Product */}
      {mode === "sell" ? (
        <h1 className="new__product__page__title">Add New Product To Sell</h1>
      ) : (
        <h1 className="new__product__page__title">Add Product To Exchange</h1>
      )}
      <div className="new__product">
        {/* form */}
        <div className="product__form">
          {mode === "sell" ? <ProductForm /> : <ExchangeProductForm />}
        </div>
      </div>
    </>
  );
}

export default NewProduct;
