import React from "react";
import "./../Views.css";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ProfileStats from "./ProfileStats";
import ProfileVieww from "../../../components/Views/ProfileView/ProfileView";

function TotalProductView() {
  return (
    <>
      <Navbar />
      <div className="views">
        {/* Sidebar */}
        <Sidebar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "80%",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <ProfileVieww />
          <ProfileStats />
        </div>
      </div>
    </>
  );
}

export default TotalProductView;
