import React from "react";
import { useSelector } from "react-redux";

function Details() {
  const user = useSelector((state) => state.user);
  //   since join
  let sinceJoin = new Date(user?.createdAt).toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });

  return (
    <>
      <img src={user.profileImage} />
      {/* Details */}
      <div className="profile__details">
        {/* Single Details */}
        <div className="single__details">
          <label>Full Name: </label>
          <p>{user.fullName}</p>
        </div>
        <div className="single__details">
          <label>Email: </label>
          <p>{user.email}</p>
        </div>
        <div className="single__details">
          <label>Gender: </label>
          <p>{user.gender}</p>
        </div>
        <div className="single__details">
          <label>DOB: </label>
          <p>{user.dob}</p>
        </div>
        <div className="single__details">
          <label>Member Since: </label>
          <p>{sinceJoin}</p>
        </div>
        <div className="single__details">
          <label>About: </label>
          <p>Lorem some things details about yourself</p>
        </div>
      </div>
    </>
  );
}

export default Details;
