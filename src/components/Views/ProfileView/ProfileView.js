import React, { useEffect, useState } from "react";
import "./ProfileView.css";
import { Link } from "react-router-dom";
import { publicRequest } from "../../../requestMethods";
import { useSelector } from "react-redux";
function ProfileView() {
  const [profileViews, setProfileViews] = useState([]);
  const [productsViews, setProductsViews] = useState([]);
  const user = useSelector((state) => state.user);
  // fetch total profile views

  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await publicRequest.get(
        `/profileviews/allviews/${user._id}`
      );
      setProfileViews(fetched.data);
    };
    fetchProducts();
  }, []);
  // fetch total products views

  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await publicRequest.get(
        `/productviews/allviews/${user._id}`
      );
      setProductsViews(fetched.data);
    };
    fetchProducts();
  }, []);
  return (
    <div className="sale__products">
      <Link
        className="single__sale__product"
        style={{ backgroundColor: "#3A6562" }}
        to="/views/profileviews"
      >
        <p>Profile Views</p>
        <h1>{profileViews.length}</h1>
      </Link>
      <Link
        className="single__sale__product"
        style={{ backgroundColor: "#20365A" }}
        to="/views/totalproductviews"
      >
        <p>Total Products Views</p>
        <h1>{productsViews.length}</h1>
      </Link>
    </div>
  );
}

export default ProfileView;
