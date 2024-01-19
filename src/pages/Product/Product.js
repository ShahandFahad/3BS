import React, { useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
import Navbar2 from "../../components/Navbar/Navbar2";
import Gallary from "../../components/Gallary/Gallary";
import "./Product.css";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import RecentProducts from "../../components/RecentProducts/RecentProducts";
import Footer from "../../components/Footer/Footer";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { useParams } from "react-router";
function Product() {
  const { productId } = useParams();

  return (
    <div className="product">
      {/* <Navbar /> */}
      <Navbar2 />
      <div className="product__container">
        <div className="container__left">
          <Gallary id={productId} />
        </div>
        <div className="container__right">
          <ProductDetails id={productId} />
        </div>
      </div>
      <RelatedProducts title="Related Products" items={4} id={productId} />
      {/* <Footer /> */}
    </div>
  );
}

export default Product;
