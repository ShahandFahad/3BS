import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import StarIcon from "@mui/icons-material/Star";
import currencyFormatter from "currency-formatter";
import { publicRequest } from "../../requestMethods";
import * as timeago from "timeago.js";
import { SignalCellularAltSharp } from "@mui/icons-material";
import { loader } from "../../loader";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_TO_FAV, REMOVE_FROM_FAV } from "../../redux/User/userTypes";
import PaymentCard from "../../components/PaymentCard/PaymentCard";
// Create formatter (English).
function ProductDetails({ mode, chatBtn, id }) {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [productViews, setProductViews] = useState([]);
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const fav = useSelector((state) => state.fav);
  const [btnMsg, setBtnMsg] = useState("Add To Favorite");
  const [show, setShow] = useState(false);
  // fetch product Details
  useEffect(() => {
    setShow(false);
    setLoading(true);
    const fetchData = async () => {
      const fetched = await publicRequest.get(`/product/sell/details/` + id);
      setDetails(fetched.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // fetch product views in details page

  useEffect(() => {
    const fetchData = async () => {
      const fetched = await publicRequest.get(
        `/productviews/allviews/find/${id}`
      );
      setProductViews(fetched.data);
    };
    fetchData();
  }, [id]);

  // time format
  let sinceJoin = new Date(details?.By.createdAt).toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });
  // handle click
  const handleClick = async () => {
    try {
      const postView = await publicRequest.post(`/profileviews/add`, {
        userId: details?.By._id,
        viewer: user._id,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    setBtnMsg("Add To Favorite");
  }, [id]);
  // handle favortie
  const handleFav = () => {
    const check = fav.find((item) => item.details._id === details.details._id);

    // check if already exist in favortie

    if (!check) {
      dispatch({
        type: ADD_TO_FAV,
        payload: { details: details.details, productViews },
      });
      setBtnMsg("Added To Your Favorite");
    } else {
      setBtnMsg("Already Exists in Favorite");
    }
  };

  return !loading ? (
    <div className="product__details">
      {show && (
        <div className="payment__wrapper">
          <PaymentCard setShow={setShow} product={details.details} />
        </div>
      )}
      {/* Header */}
      <div className="details__header">
        <Link
          to={`/profile/${details?.By._id}`}
          className="header_left"
          onClick={handleClick}
        >
          <p className="left__by">By - </p>
          <img className="profile__img" src={details?.By.profileImage} />
          <div className="by__info">
            <p className="info__name">{details?.By.fullName}</p>
            <p className="info__from">Since {sinceJoin}</p>
          </div>
          <img
            className="level__img"
            src="https://static.vecteezy.com/system/resources/previews/004/946/876/non_2x/winner-badge-concepts-vector.jpg"
          />
        </Link>
        <div className="header__right">
          <p>3.5</p>
          <StarIcon />
        </div>
      </div>
      {/* Body */}
      <div className="details__body">
        <div className="product__title">
          <p>{details?.details.title}</p>
          <div className="titleviews">Views {productViews.length}</div>
        </div>
        <p className="product__desc">{details?.details.description}</p>
        {mode === "exchange" ? (
          <p className="product__price">{details?.details.condition}</p>
        ) : (
          <p className="product__price">Price</p>
        )}
        {mode === "exchange" ? (
          <p className="price__value">{details?.details.condition}</p>
        ) : (
          <p className="price__value">
            {currencyFormatter.format(details?.details.price, { code: "" })}
            <span>(PKR)</span>
          </p>
        )}

        <div className="body__footer">
          <p>{timeago.format(details?.details.createdAt)}</p>
          <p>{details?.details.location}</p>
        </div>
      </div>
      {/* Actions */}'
      {details?.By?._id !== user?._id ? (
        mode === "exchange" ? (
          chatBtn && <button className="chat__btn">Chat Now</button>
        ) : (
          <div className="actions">
            <button className="buy__btn" onClick={() => setShow(true)}>
              Buy Now
            </button>

            <button className="favorite__btn" onClick={handleFav}>
              {btnMsg}
            </button>
          </div>
        )
      ) : (
        <div style={{ color: "gray", textAlign: "center" }}>
          This is your own product and you cannot buy it.
        </div>
      )}
    </div>
  ) : (
    <div className="loader">
      <img src={loader} />
    </div>
  );
}

export default ProductDetails;
