import React, { useState } from "react";
import "./Notifications.css";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { publicRequest } from "../../requestMethods";
import { loader } from "../../loader";
import { Link } from "react-router-dom";
function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.user);
  const [isActive, setIsActive] = useState(true);
  const [singleNotification, setSingleNotification] = useState("");
  const [loading, setLoading] = useState(true);
  const [unread, setUnread] = useState([]);
  // fetch notifications
  useEffect(() => {
    const getNotifications = async () => {
      const gotNotifications = await publicRequest.get(
        `/notifications/${user._id}`
      );

      setNotifications(gotNotifications.data);
    };
    getNotifications();
  }, [notifications]);

  // fetch unread notifications
  useEffect(() => {
    const unreadNot = async () => {
      const unreadNotifications = await publicRequest.get(
        `/notifications/unread/${user._id}`
      );
      setUnread(unreadNotifications.data);
    };
    unreadNot();
  }, [unread]);

  const handleClick = async (id) => {
    setLoading(true);
    const gotNotification = await publicRequest.get(
      `/notifications/notification/${id}`
    );
    setSingleNotification(gotNotification.data);
    setIsActive(false);
    setLoading(false);
    // update
    gotNotification &&
      (await publicRequest.put(`/notifications/notification/${id}`));
  };
  return (
    <>
      <Navbar />
      <div className="notifications">
        <div className="notifi__left">
          <div className="notifi__left__header">
            <h2>
              Notifications <span>{unread?.length}</span>
            </h2>
          </div>
          <div
            className="line"
            style={{ width: "100%", height: "1px", backgroundColor: "#fff" }}
          ></div>
          {/* notifications */}
          <div className="notifications__list">
            {notifications.map((single) => (
              <div
                className="single__notification"
                onClick={() => handleClick(single._id)}
              >
                <p
                  key={single._id}
                  style={{
                    fontWeight: single.status === "unread" ? "bold" : "normal",
                  }}
                >
                  {single?.text.length > 25
                    ? single?.text.slice(0, 25) + "..."
                    : single?.text}
                </p>
                {single.status === "unread" && (
                  <p className="notifi__status">New</p>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* right notification */}

        <div className="notifi__right">
          {isActive ? (
            <div className="notifi__content">
              <img src="https://th.bing.com/th/id/R.7aabd381c7f4d88a13abeac20ca25e56?rik=YG4UHj9%2fgH0ZqA&pid=ImgRaw&r=0" />
              <h1>Notifications</h1>
            </div>
          ) : !loading ? (
            <div
              style={{
                fontSize: "20px",
                padding: "10px",
                alignSelf: "flex-start",
                marginRight: "auto",
              }}
            >
              <h1 style={{ fontWeight: "400", marginBottom: "20px" }}>
                SERB Notifications
              </h1>
              <p>{singleNotification.text}</p>
              <Link
                to="/transactions"
                style={{
                  color: "dodgerblue",
                  fontSize: "16px",
                  textDecoration: "underline",
                }}
              >
                Check Transaction
              </Link>
            </div>
          ) : (
            <img src={loader} width={40} />
          )}
        </div>
      </div>
    </>
  );
}

export default Notifications;
