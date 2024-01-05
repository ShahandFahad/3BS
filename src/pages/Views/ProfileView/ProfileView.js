import React, { useState } from "react";
import "./../Views.css";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ProfileVieww from "../../../components/Views/ProfileView/ProfileView";
import ProfileStats from "../../../components/Views/ProfileStats";

function ProfileView() {
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
            alignItems: "center",
            justifyContent: "center",
            flexBasis: "80%",
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

export default ProfileView;
