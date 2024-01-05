import React from "react";
import "./ProfileView.css";
import ProfileStats from "./ProfileStats";
import ProfileView from "./ProfileView/ProfileView";
function ProfileViews() {
  return (
    <div className="sales">
      <ProfileView />
      <ProfileStats />
    </div>
  );
}

export default ProfileViews;
