import React from "react";
import "./Revenue.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Sales from "../../components/Sales/Sales";
import Profit from "../../components/Profit/Profit";
function Revenue() {
  return (
    <>
      <Navbar />
      <div className="revenue">
        {/* Sidebar */}
        <Sidebar />
        {/* Sales */}
        <Profit />
      </div>
    </>
  );
}

export default Revenue;
