import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import StarIcon from "@mui/icons-material/Star";
import currencyFormatter from "currency-formatter";
import { publicRequest, userRequest } from "../../requestMethods";
import * as timeago from "timeago.js";
import { SignalCellularAltSharp } from "@mui/icons-material";
import { loader } from "../../loader";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CURRENT_CHAT, SELECTED } from "../../redux/User/userTypes";
// Create formatter (English).
function ExchangeDetails({ mode, chatBtn, id, load }) {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  // current conversations
  const [currentConversations, setCurrentConversations] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // fetch product Details
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const fetched = await publicRequest.get(
        `/exchangeproduct/exchange/details/` + id
      );
      setDetails(fetched.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);
  let sinceJoin = new Date(details?.By.createdAt).toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });

  // fetch current conversations
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const chats = await userRequest.get(`/conversation/find/${user._id}`);
      setCurrentConversations(chats.data);
    };
    fetchData();
  }, [id]);
  // console.log(currentConversations);
  // handle chat
  const handleChat = async () => {
    // console.log(details.By._id);
    // console.log(currentConversations);
    const found = currentConversations?.map((m) =>
      m.members.find((f) => {
        return f === details.By._id;
      })
    );

    try {
      const final = found.filter((f) => f === details.By._id);
      if (final.length > 0) {
        dispatch({ type: SELECTED, selected: null }) &&
          dispatch({ type: CURRENT_CHAT, currentChat: null });
        navigate("/chatbox");
      } else {
        const newChat = await userRequest.post(`/conversation`, {
          senderId: user._id,
          recieverId: details.By._id,
        });
        newChat &&
          dispatch({ type: SELECTED, selected: details.By }) &&
          dispatch({ type: CURRENT_CHAT, currentChat: newChat._id }) &&
          navigate("/chatbox");
      }
    } catch (err) {
      console.log(err.message);
    }
    // try {
    //   // const check = chats.data.map((chat) => {
    //     // const found = chat.members.filter((f) => f === details.By._id);
    //     // // console.log(found, details.By._id);
    //     // if (found[0] === details.By._id) {
    //     //   // dispatch({ type: SELECTED, selected: found });
    //     //   // navigate("/chatbox");
    //     //   console.log("found");
    //     // } else {
    //     //   // const newChat = userRequest.post(`/conversation`, {
    //     //   //   senderId: user._id,
    //     //   //   recieverId: details.By._id,
    //     //   // });
    //     //   // newChat && navigate("/chatbox");
    //     //   console.log("not found");
    //     // }
    //     return found;
    //   });
    //   const final = check.filter((f) => f !== details.By._id);
    //   console.log(final);
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  return !loading ? (
    <div className="product__details">
      {/* Header */}
      <div className="details__header">
        <Link to={`/profile/${details?.By._id}`} className="header_left">
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
        <p className="product__title">{details?.details.title}</p>
        <p className="product__desc">{details?.details.description}</p>
        {mode === "exchange" ? (
          <p className="product__price">Condition</p>
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
      {mode === "exchange" ? (
        chatBtn && (
          <button className="chat__btn" onClick={handleChat}>
            Chat Now
          </button>
        )
      ) : (
        <div className="actions">
          <button className="buy__btn">Buy Now</button>
          <button className="favorite__btn">Add to favorite</button>
        </div>
      )}
    </div>
  ) : (
    load && (
      <div className="loader">
        <p>Loading...</p>
      </div>
    )
  );
}

export default ExchangeDetails;
