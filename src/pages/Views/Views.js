import React from "react";
import "./Views.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProfileViews from "../../components/Views/ProfileViews";
function Views() {
  return (
    <>
      <Navbar />
      <div className="views">
        {/* Sidebar */}
        <Sidebar />
        <ProfileViews />
      </div>
    </>
  );
}

export default Views;
