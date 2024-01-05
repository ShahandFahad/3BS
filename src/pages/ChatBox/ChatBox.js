import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./ChatBox.css";
import SearchIcon from "@mui/icons-material/Search";
import Chats from "../../components/Chats/Chats";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { loader } from "../../loader";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import { storage } from "../../firebase";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloseIcon from "@mui/icons-material/Close";
import Picker from "emoji-picker-react";

import * as timeago from "timeago.js";

function ChatBox() {
  const selected = useSelector((state) => state.selected);
  const currentChat = useSelector((state) => state.currentChat);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  // modal
  const [modal, setModal] = useState(false);
  // message details
  const [msgDetails, setMsgDetails] = useState("");
  //
  const [messages, setMessages] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(false);
  const [image, setImage] = useState(null);
  const [showImg, setShowImg] = useState(null);
  // Handle Emoji
  const handleEmoji = () => {
    setChosenEmoji(!chosenEmoji);
  };
  // Pick Emoji
  const pickEmoji = (e, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };
  //   scroll
  const scrollRef = useRef(null);
  // Get messages
  // handle change
  const handleChange = (image) => {
    setImage(image);
    setShowImg(URL.createObjectURL(image));
  };
  //
  useEffect(() => {
    const msgs = async () => {
      const getMsgs = await userRequest.get(`/message/${currentChat}`);
      setMessages(getMsgs.data);
    };
    msgs();
  }, [messages.length, currentChat]);

  //   scrolling
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, currentChat]);
  //
  // send message
  const handleClick = async () => {
    setLoading(true);
    //
    if (image) {
      const uploadTask = storage.ref(`/profilePhotos/${image.name}`).put(image);
      uploadTask.on(
        "state_changes",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
          const send = await userRequest.post(`/message`, {
            conversationId: currentChat,
            sender: user._id,
            text: msg,
            image: imageUrl,
          });
          send && setMessages([...messages, send.data]);
          setMsg("");
          setImage(null);
          setShowImg(null);
          setChosenEmoji(false);
          setLoading(false);
          // setLoading(false);
        }
      );
    } else {
      try {
        const send = await userRequest.post(`/message`, {
          conversationId: currentChat,
          sender: user._id,
          text: msg,
        });
        send && setMessages([...messages, send.data]);
        setMsg("");
        setChosenEmoji(false);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    //
  };
  // handle delete message
  const handleDelete = async (id) => {
    let text = "This Message will be deleted permanantly!";
    if (window.confirm(text) == true) {
      try {
        const deleted = await userRequest.delete(`/message/delete/${id}`);
        deleted && console.log("deleted");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log("ERROR");
    }
    //
  };
  // handle modal
  const handleModal = async (id) => {
    setModal(true);
    setLoading(true);
    try {
      const gotDetails = await userRequest.get(`/message/details/${id}`);
      setMsgDetails(gotDetails.data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="chatbox">
        {modal && (
          <div className="chat__modal">
            <CloseIcon onClick={() => setModal(false)} />
            {!loading ? (
              <img src={msgDetails.image} className="showImg" />
            ) : (
              <img src={loader} width={40} height={40} />
            )}
          </div>
        )}
        {/* Left Chatbox */}
        <div className="chatbox__left">
          <div className="left__header">
            <h3>Inbox</h3>
          </div>
          {/* Searchbox */}
          {/* <div className="search__chat">
            <input type="text" placeholder="Search here..." />
            <SearchIcon />
          </div> */}
          <h2>All Chats</h2>

          {/* Chats*/}

          <Chats />
        </div>

        {/* Right Chatbox */}
        {!selected ? (
          <div
            className="chatbox__right"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderLeft: "1px solid #ccc",
            }}
          >
            <img
              src="https://www.heartlandintergroup.org/wp-content/uploads/chat-bubble-bouncing_clear-background.gif"
              width={200}
              height={200}
            />
            <h1 style={{ fontWeight: "500" }}>{user.fullName}</h1>
            <h2 style={{ fontWeight: "450" }}>Welcome to Chats</h2>
            <p>Click on a Conversation to Chat with.</p>
          </div>
        ) : (
          <div className="chatbox__right">
            <div className="right__header">
              {/* Right header profile Side */}
              <div className="header__profile">
                <img src={selected.profileImage} />
                <div className="profile__info">
                  <p>{selected.fullName}</p>
                  <span>Last seen 2 hrs ago</span>
                </div>
              </div>
              {/* Right header contact info */}
              <div className="header__contact">
                <MoreVertIcon />
              </div>
            </div>

            {/* Chat Messages */}
            {/* <Messages /> */}
            <div className="chat__messages">
              {messages.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h2
                    style={{
                      fontWeight: "300",
                      color: "#fff",
                    }}
                  >
                    Leave a Message to Start Chating
                  </h2>
                  <h2
                    style={{
                      fontWeight: "300",
                      color: "#fff",
                    }}
                  >
                    with
                  </h2>
                  <h1
                    style={{
                      fontWeight: "300",
                      color: "#fff",
                    }}
                  >
                    {selected.fullName}
                  </h1>
                </div>
              ) : (
                messages.map((msg) =>
                  user._id !== msg.sender ? (
                    <div className="message__sender" ref={scrollRef}>
                      {msg.image && (
                        <img
                          src={msg.image}
                          onClick={() => handleModal(msg._id)}
                        />
                      )}
                      <p>{msg.text}</p>
                      <span>{timeago.format(msg.createdAt)}</span>
                    </div>
                  ) : (
                    <div className="message__reciever" ref={scrollRef}>
                      <HighlightOffIcon onClick={() => handleDelete(msg._id)} />

                      {msg.image && (
                        <img
                          src={msg.image}
                          onClick={() => handleModal(msg._id)}
                        />
                      )}
                      <p>{msg.text}</p>
                      <span>{timeago.format(msg.createdAt)}</span>
                    </div>
                  )
                )
              )}
            </div>

            {/* Write New Message */}
            <div className="new__message">
              <label htmlFor="file1">
                {showImg !== null ? (
                  <img src={showImg} />
                ) : (
                  <PhotoCameraOutlinedIcon
                    style={{ marginRight: "10px", marginTop: "4px" }}
                  />
                )}
                <input
                  type="file"
                  id="file1"
                  onChange={(e) => handleChange(e.target.files[0])}
                />
              </label>

              <SentimentSatisfiedAltIcon
                onClick={handleEmoji}
                className={!chosenEmoji ? "emojiBtn" : "emojiBtn active"}
              />
              {chosenEmoji && (
                <div className="picker">
                  <Picker onEmojiClick={pickEmoji} />
                </div>
              )}
              <input
                type="text"
                placeholder="Write here..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                autoFocus
              />
              {!loading ? (
                <SendIcon onClick={handleClick} />
              ) : (
                <img src={loader} width={20} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatBox;
