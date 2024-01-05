import React from "react";
import { useState } from "react";
import "./RightNavbar.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TurnSlightRightIcon from "@mui/icons-material/TurnSlightRight";
import TurnSlightLeftIcon from "@mui/icons-material/TurnSlightLeft";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../../../redux/User/userTypes";
import { publicRequest } from "../../../requestMethods";
import { useEffect } from "react";
function RightNavbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);

  // handle logout
  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: LOG_OUT });
  };

  // fetch unread notifications
  useEffect(() => {
    const getNotifications = async () => {
      const gotNotifications = await publicRequest.get(
        `/notifications/unread/${user._id}`
      );
      setNotifications(gotNotifications.data);
    };
    getNotifications();
  }, [notifications]);

  return (
    <div className="right__navbar">
      <NavLink to="/">
        <TurnSlightLeftIcon className="buy" />
        <p>Buy</p>
      </NavLink>
      <NavLink to="/currentuserprofile">
        <TurnSlightRightIcon />
        <p>Sell</p>
      </NavLink>
      <NavLink to="/exchangeproducts">
        <SwapHorizIcon />
        <p>Exchange</p>
      </NavLink>
      <NavLink to="/analytics">
        <EqualizerIcon />
        <p>Analytics</p>
      </NavLink>
      <NavLink to="/notifications" className="notifi__icon">
        <NotificationsNoneIcon />
        <p>Notifications</p>
        {notifications.length > 0 && <div></div>}
      </NavLink>

      <NavLink to="/chatbox">
        <ChatBubbleOutlineIcon />
        <p>Chats</p>
      </NavLink>

      <div className="label" onClick={handleLogout}>
        <p>LogOut </p>
        <ExitToAppIcon />
      </div>
    </div>
  );
}

export default RightNavbar;
