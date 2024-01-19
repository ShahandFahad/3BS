import React from "react";
import "./Awards.css";
// import Navbar from "../../components/Navbar/Navbar";
import Navbar2 from "../../components/Navbar/Navbar2";
import Sidebar from "../../components/Sidebar/Sidebar";
import Awards from "../../components/Awards/Awards";
function AwardsPage() {
  return (
    <>
      {/* <Navbar /> */}
      <Navbar2 />
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
