import React from "react";
import { useParams } from "react-router";
// import Navbar from "../../components/Navbar/Navbar";
import Navbar2 from "../../components/Navbar/Navbar2";
import "./ExchangeWithProductDetails.css";
import ExchangeGallary from "../../components/Gallary/ExchangeGallary";
import ExchangeDetails from "../../components/ProductDetails/ExchangeDetails";
function ExchangeWithProductDetails() {
  const { productId } = useParams();
  return (
    <>
      {/* <Navbar /> */}
      <Navbar2 />
      <div className="exchangewithproductdetails">
        <ExchangeGallary id={productId} />
        <ExchangeDetails id={productId} mode="exchange" chatBtn={true} />
      </div>
    </>
  );
}

export default ExchangeWithProductDetails;
