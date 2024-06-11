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
import { publicRequest, userRequest } from "../../requestMethods";

import Navbar2 from "../../components/Navbar/Navbar2";
import CurrentUserRentalProducts from "../../components/RentalProducts/CurrentUserRentalProducts";
import CurrentUserBuyerRequest from "../../components/BuyerRequestProducts/CurrentUserBuyerRequest";

import styled from "styled-components";
import CurrentUserProductsForBidding from "../../components/BiddingProducts/CurrentUserProductsForBidding";
import CurrentUserStore from "../../components/CureentUserStore/CurrentUserStore";

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
  const [createStore, setCreateStore] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [storeForm, setStoreForm] = useState({
    hasStore: true,
    storeName: "",
    storeDescription: "",
  });

  // Store Details
  const handleChange = (e) => {
    setStoreForm((prev) => ({ ...storeForm, [e.target.name]: e.target.value }));
  };

  // Create store
  const handleSubmit = async () => {
    try {
      if (storeForm.name === "" || storeForm.storeDescription === "") {
        alert("Please fill the store form correctly");
      } else {
        const postStore = await publicRequest.put(
          `user/edit/${JSON.parse(localStorage.getItem("user"))._id}`,
          storeForm
        );

        // console.log(postStore);
        // update user data
        localStorage.setItem("user", JSON.stringify(postStore.data));
        // reload page, a temprory soloution for updating state
        if (postStore.status === 201) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                {/* <Link to="/addsellproduct" className="new__btn bg-blue-500">
                  Add New Product
                </Link> */}
                {user.hasStore === true ? (
                  <button
                    onClick={() =>
                      showStore ? setShowStore(false) : setShowStore(true)
                    }
                    className={`new__btn ${
                      showStore ? "bg-red-500" : "bg-blue-500"
                    }`}
                  >
                    {showStore ? "Hide Store" : " Show Store"}
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      createStore ? setCreateStore(false) : setCreateStore(true)
                    }
                    className={`new__btn ${
                      createStore ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {createStore ? "Cancel" : "Create Store"}
                  </button>
                )}
              </div>
            </div>
            {createStore ? (
              <div className="flex flex-col gap-4 p-10 bg-gray-100">
                <h1 className="text-2xl font-sans font-bold">
                  Enter Store Details
                </h1>
                Store Name:{" "}
                <input
                  className="p-2"
                  placeholder="Name"
                  name="storeName"
                  onChange={handleChange}
                />
                Description:{" "}
                <textarea
                  className="p-2"
                  rows={3}
                  placeholder="Description"
                  name="storeDescription"
                  onChange={handleChange}
                ></textarea>
                <div>
                  <button
                    onClick={handleSubmit}
                    className="new__btn bg-blue-500 p-2 rounded-md text-white"
                  >
                    Create
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
            {/* Current User Store Products */}
            {showStore && <CurrentUserStore mode="storeproudcts" />}
            {/* All Products of Current User */}
            {active ? <AllCurrentUserProducts mode="sell" /> : <Favorite />}
            {/*  Current User product listed as for rent*/}
            <CurrentUserRentalProducts mode="rent" />

            {/*Current User Product listed as for buyer request  */}
            <CurrentUserBuyerRequest mode="Buyer Request" />

            {/* Current User Bidded Prducts */}
            <CurrentUserProductsForBidding mode="CurretUserBiddedProducts" />
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
