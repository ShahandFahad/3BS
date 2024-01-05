import React from "react";
import "./Sales.css";
import SaleProducts from "./SaleProducts/SaleProducts";
import SaleStats from "./SaleStats";
function Sales() {
  return (
    <div className="sales">
      <SaleProducts />
      <SaleStats />
    </div>
  );
}

export default Sales;
