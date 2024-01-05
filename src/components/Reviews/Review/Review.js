import React from "react";
import "./Review.css";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

function Review({ review }) {
  let reviewCreatedAt = new Date(review?.createdAt).toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });
  return (
    <div className="review">
      {/* Review Header */}
      <div className="review__header">
        <div className="header__left">
          <img src={review.feedbackByPic} />
          <div className="reviewed__info">
            <p className="fullname">{review.feedbackByUsername}</p>
            <div className="stars">
              {Array.from({ length: 5 }, (_, index) => {
                let number = index + 0.5;
                return (
                  <p>
                    {review.rating >= index + 1 ? (
                      <StarIcon />
                    ) : review.rating >= number ? (
                      <StarHalfIcon />
                    ) : (
                      <StarOutlineIcon />
                    )}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <p className="review__createdAt">{reviewCreatedAt}</p>
      </div>
      {/* Review Body */}
      <p className="review__desc">{review.description}</p>
    </div>
  );
}

export default Review;
