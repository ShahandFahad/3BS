import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Analytics.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Sales from "../../components/Sales/Sales";
function Analytics() {
  return (
    <>
      <Navbar />
      <div className="analytyics">
        <Sidebar />
        {/* Sales */}
        <Sales />
      </div>
    </>
  );
}

export default Analytics;
