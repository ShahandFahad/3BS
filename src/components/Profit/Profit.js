import React from "react";
import "./Sales.css";
import ProfitStats from "./ProfitStats";
import Orders from "../../pages/Orders/Orders";
function Profit() {
  return (
    <div className="sales">
      <ProfitStats />
      {/* orders */}
      {/* <h1>Orders</h1> */}
      <Orders />
    </div>
  );
}

export default Profit;
