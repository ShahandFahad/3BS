import React from "react";
import "./Item.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink } from "react-router-dom";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
function Item() {
  return (
    <div className="items">
      <NavLink className="single__item" to="/analytics">
        <ShoppingCartOutlinedIcon />
        <p>Sales</p>
      </NavLink>
      <NavLink className="single__item" to="/awards">
        <EmojiEventsOutlinedIcon />
        <p>Awards</p>
      </NavLink>
      <NavLink className="single__item" to="/views">
        <VisibilityOutlinedIcon />
        <p>Views</p>
      </NavLink>
      <NavLink className="single__item" to="/revenue">
        <AttachMoneyOutlinedIcon />
        <p>Revenue</p>
      </NavLink>
      <NavLink className="single__item" to="/transactions">
        <PaymentIcon />
        <p>Transactions</p>
      </NavLink>
    </div>
  );
}

export default Item;
