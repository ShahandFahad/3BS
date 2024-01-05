import React, { useState } from "react";
import "./Navbar.css";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RightNavbar from "./RightNavbar/RightNavbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar() {
  const [searchProduct, setSearchProduct] = useState("");
  const user = useSelector((state) => state.user);
  return (
    <div className="navbar">
      {/* Navbar Left */}

      <div className="navbar__left">
        <Link to="/">
          <h2 style={{ color: "#fff" }}>3BS</h2>
        </Link>

        {/*  Search for porduct */}

        <div className="main__searchbox">
          {/* Place for search */}

          <div className="searchbox">
            <input
              type="text"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              placeholder="Search here..."
            />
            <Link to={`/search?product=${searchProduct}`}>
              <SearchIcon />
            </Link>
          </div>
        </div>

        {/* Register Section */}

        {!user ? (
          <div className="register__section">
            <p>Sign In</p>
            <p>/</p>
            <p>Sign Up</p>
          </div>
        ) : (
          <Link to="/currentuserprofile" className="register__section">
            <p style={{ color: "#fff" }}>{user.fullName}</p>
            <img src={user.profileImage} />
          </Link>
        )}
      </div>

      {/* Navbar Right */}

      <div className="navbar__right">
        <RightNavbar />
      </div>
    </div>
  );
}

export default Navbar;
