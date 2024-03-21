import React from "react";
import Navbar from "../../components/Navbar/Navbar2";
import RentalProducts from "../../components/RentalProducts/RentalProducts";
export default function Rent() {
  return (
    <>
      <Navbar />
      <RentalProducts mode="rent" />
    </>
  );
}
