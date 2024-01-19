import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Navbar2 from "../../components/Navbar/Navbar2";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Rating from "../../components/Rating/Rating";
import Reviews from "../../components/Reviews/Reviews";
import SoldProducts from "../../components/SoldProducts/SoldProducts";
import "./Profile.css";
import Footer from "../../components/Footer/Footer";
import { userRequest } from "../../requestMethods";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
function Profile() {
  const { userId } = useParams();
  const user = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetched = await userRequest.get(`/user/profile/${userId}`);
        setUserDetails(fetched.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <>
      {/* <Navbar /> */}
      <Navbar2 />
      <div className="profile">
        <div className="profile__left">
          {/* Profile Header */}
          <ProfileHeader userDetails={userDetails} />
          {/* Description About Profile */}
          <div className="left__about">
            <p className="about__about">About</p>
            {userDetails?.description?.length > 1 ? (
              <p className="about__desc">{userDetails?.description}</p>
            ) : (
              <p>No Description Yet</p>
            )}
          </div>
          {/* Rating */}
          <p className="rating__title">Rating and reviews</p>
          <Rating />
          {/* Reviews */}
          <Reviews />
        </div>
        <div className="profile__right">
          <SoldProducts userDetails={userDetails} />
        </div>
        {/* Footer */}
      </div>
      <Footer />
    </>
  );
}

export default Profile;
