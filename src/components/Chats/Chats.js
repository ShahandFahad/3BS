import React from "react";
import "./Chats.css";
import { dummyChat } from "../../components/Chats/dummyChat";
import SingleChat from "./SingleChat/SingleChat";
import { useEffect } from "react";
import { useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

function Chats() {
  const [chats, setChats] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getChats = async () => {
      const gotChats = await userRequest.get(`/conversation/find/${user._id}`);
      setChats(gotChats.data);
    };
    getChats();
  }, [chats]);

  return (
    <>
      {chats.map((chat) => (
        <SingleChat key={chat._id} chat={chat} />
      ))}
    </>
  );
}

export default Chats;
