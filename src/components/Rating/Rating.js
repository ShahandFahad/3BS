import React, { useEffect, useState } from "react";
import "./Rating.css";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
function Rating() {
  const user = useSelector((state) => state.user);

  const [feedbacks, setFeedbacks] = useState([]);
  const [total, setTotal] = useState(0);

  // get all feedback of the specific user
  useEffect(() => {
    const getFeedbacks = async () => {
      const res = await userRequest.get(`/feedback/all/${user._id}`);
      setFeedbacks(res.data);
    };
    getFeedbacks();
  }, [feedbacks]);
  let all = 0;
  for (let i = 0; i < feedbacks.length; i++) {
    all = (all + feedbacks[i].rating) / feedbacks.length;
  }

  return (
    <div className="rating">
      <div className="rating__left">
        <p className="rating__value">{all.toFixed(1)}</p>
        <div className="rating__stars" style={{ display: "flex" }}>
          {Array.from({ length: 5 }, (_, index) => {
            let number = index + 0.5;
            return (
              <p>
                {all >= index + 1 ? (
                  <StarIcon />
                ) : all >= number ? (
                  <StarHalfIcon />
                ) : (
                  <StarOutlineIcon />
                )}
              </p>
            );
          })}
        </div>
        <p className="rated__by">({feedbacks.length})</p>
      </div>
      <div className="rating__right">
        <div className="right__progress">
          <p>5</p>
          <div className="progress__bar">
            <div className="percent" style={{ width: "70%" }}></div>
          </div>
        </div>
        <div className="right__progress">
          <p>4</p>
          <div className="progress__bar">
            <div className="percent" style={{ width: "10%" }}></div>
          </div>
        </div>
        <div className="right__progress">
          <p>3</p>
          <div className="progress__bar">
            <div className="percent" style={{ width: "4%" }}></div>
          </div>
        </div>
        <div className="right__progress">
          <p>2</p>
          <div className="progress__bar">
            <div className="percent" style={{ width: "7%" }}></div>
          </div>
        </div>
        <div className="right__progress">
          <p>1</p>
          <div className="progress__bar">
            <div className="percent" style={{ width: "9%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
