import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllCurrentUserProducts from "../../components/AllCurrentUserProducts/AllCurrentUserProducts";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Rating from "../../components/Rating/Rating";
import Reviews from "../../components/Reviews/Reviews";
import SoldProducts from "../../components/SoldProducts/SoldProducts";
import "./CurrentUserProfile.css";
import Favorite from "../../components/Favorite/Favorite";
import { userRequest } from "../../requestMethods";

import Navbar2 from "../../components/Navbar/Navbar2";

import styled from "styled-components";

const Profile = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 25%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const About = styled.div`
  font-size: 1rem;
  border-bottom: 1px solid #aaa;
  padding-bottom: 7px;
`;

const SellProduct = styled.div`
  width: 100%;
`;

function CurrentUserProfile() {
  const user = useSelector((state) => state.user);
  const [active, setActive] = useState(true);

  return (
    <>
      <Navbar2 />
      {/* New profile */}
      <Profile className="flex flex-wrap container mx-auto py-3 md:py-4 px-4 md:px-6">
        <UserInfo className="p-4 border">
          <ProfileHeader userDetails={user} />
          {/* Description About Profile */}
          <About>
            {user?.description.length > 1 ? (
              <p>{user?.description}</p>
            ) : (
              <p>No Description Yet</p>
            )}
          </About>
          <p className="text-lg font-bold uppercase">Rating and reviews</p>
          <Rating />
          <Reviews />
        </UserInfo>

        {/*  */}
        <div className="border flex-1">
          {/* Selle Product Box */}
          <SellProduct className="profile__right">
            <div className="right__header">
              <div className="header__left">
                <p className={active && "all"} onClick={() => setActive(true)}>
                  All
                </p>
                <p
                  className={!active && "all"}
                  onClick={() => setActive(false)}
                >
                  Favorite
                </p>
              </div>
              <div className="header__right">
                <Link to="/addsellproduct" className="new__btn bg-blue-500">
                  Add New Product
                </Link>
              </div>
            </div>
            {/* All Products of Current User */}
            {active ? <AllCurrentUserProducts mode="sell" /> : <Favorite />}
          </SellProduct>
        </div>
      </Profile>
      <Footer />
    </>
  );
}

export default CurrentUserProfile;

// {
//   /* Default Profile */
// }

//  <>
//    {/* <Navbar2 /> */}
//    {/* <Navbar /> */}
//    <div className="profile">
//      <div className="profile__left">
//        {/* Profile Header */}
//        <ProfileHeader userDetails={user} />
//        {/* Description About Profile */}
//        <div className="left__about">
//          <p className="about__about">About</p>
//          {user?.description.length > 1 ? (
//            <p className="about__desc">{user?.description}</p>
//          ) : (
//            <p>No Description Yet</p>
//          )}
//        </div>
//        {/* Rating */}
//        <p className="rating__title">Rating and reviews</p>
//        <Rating />
//        {/* Reviews */}
//        <Reviews />
//      </div>
//      <div className="profile__right">
//        <div className="right__header">
//          <div className="header__left">
//            <p className={active && "all"} onClick={() => setActive(true)}>
//              All
//            </p>
//            <p className={!active && "all"} onClick={() => setActive(false)}>
//              Favorite
//            </p>
//          </div>
//          <div className="header__right">
//            <Link to="/addsellproduct" className="new__btn">
//              Add New
//            </Link>
//          </div>
//        </div>
//        {/* All Products of Current User */}
//        {active ? <AllCurrentUserProducts mode="sell" /> : <Favorite />}
//      </div>
//      {/* Footer */}
//    </div>
//    <Footer />
//  </>;
