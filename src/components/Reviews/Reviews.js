import React, { useEffect, useState } from "react";
import Review from "./Review/Review";
import { reviewsData } from "./reviewsData";
import "./Reviews.css";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
function Reviews() {
  const user = useSelector((state) => state.user);

  const [feedbacks, setFeedbacks] = useState([]);

  // get all feedback of the specific user
  useEffect(() => {
    const getFeedbacks = async () => {
      const res = await userRequest.get(`/feedback/all/${user._id}`);
      setFeedbacks(res.data);
    };
    getFeedbacks();
  }, [feedbacks]);
  return (
    <div className="reviews">
      {feedbacks.map((review) => (
        <Review review={review} key={review._id} />
      ))}
    </div>
  );
}

export default Reviews;
