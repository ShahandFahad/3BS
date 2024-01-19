import React from "react";
import "./Views.css";
// import Navbar from "../../components/Navbar/Navbar";
import Navbar2 from "../../components/Navbar/Navbar2";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProfileViews from "../../components/Views/ProfileViews";
function Views() {
  return (
    <>
      {/* <Navbar /> */}
      <Navbar2 />
      <div className="views">
        {/* Sidebar */}
        <Sidebar />
        <ProfileViews />
      </div>
    </>
  );
}

export default Views;
