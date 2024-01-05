import React from "react";
import "./Awards.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Awards from "../../components/Awards/Awards";
function AwardsPage() {
  return (
    <>
      <Navbar />
      <div className="awards">
        {/* Sidebar */}
        <Sidebar />
        {/* Sales */}
        <Awards />
      </div>
    </>
  );
}

export default AwardsPage;
