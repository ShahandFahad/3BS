import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CHAT, SELECTED } from "../../../redux/User/userTypes";
import { userRequest } from "../../../requestMethods";
import "./SingleChat.css";

function SingleChat({ chat }) {
  const user = useSelector((state) => state.user);
  const memberId = chat.members.filter((u) => u !== user._id);
  const [member, setMember] = useState("");
  const selected = useSelector((state) => state.selected);
  const currentChat = useSelector((state) => state.currentChat);
  const dispatch = useDispatch();

  // fetch the details chat member
  useEffect(() => {
    const getMember = async () => {
      const gotMember = await userRequest.get(
        `/user/details/singleuser/${memberId}`
      );

      setMember(gotMember.data);
    };
    getMember();
  }, [chat]);
  // handle click
  const handleClick = async () => {
    dispatch({ type: CURRENT_CHAT, currentChat: chat._id });
    dispatch({ type: SELECTED, selected: member });
  };

  return (
    <div className="single__chat" onClick={handleClick}>
      <img src={member.profileImage} />
      <div className="chat__info">
        <p>{member.fullName}</p>
        <span>
          {/* {lastMsg.length > 35 ? lastMsg.slice(0, 35) + "..." : lastMsg} */}
          last message...
        </span>
      </div>
    </div>
  );
}

export default SingleChat;
