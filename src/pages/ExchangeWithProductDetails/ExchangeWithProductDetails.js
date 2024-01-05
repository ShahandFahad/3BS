import React from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import "./ExchangeWithProductDetails.css";
import ExchangeGallary from "../../components/Gallary/ExchangeGallary";
import ExchangeDetails from "../../components/ProductDetails/ExchangeDetails";
function ExchangeWithProductDetails() {
  const { productId } = useParams();
  return (
    <>
      <Navbar />
      <div className="exchangewithproductdetails">
        <ExchangeGallary id={productId} />
        <ExchangeDetails id={productId} mode="exchange" chatBtn={true} />
      </div>
    </>
  );
}

export default ExchangeWithProductDetails;
