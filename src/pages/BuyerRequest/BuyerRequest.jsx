import React from "react";
import Navbar from "../../components/Navbar/Navbar2";
import PublicBuyerRequest from "../../components/BuyerRequestProducts/PublicBuyerRequest";

export default function BuyerRequest() {
  return (
    <>
      {/* <Navbar /> <BuyerRequest /> */}
      <Navbar />
      <PublicBuyerRequest mode="buyerRequest" />
    </>
  );
}
