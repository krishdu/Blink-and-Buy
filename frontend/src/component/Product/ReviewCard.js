import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePic from "../../images/profile.png";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgb(20,20,20,0.1)",
    activeColor: "coral",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="reviewCard">
      <img src={profilePic} alt="user_image" />
      <p> {review.name} </p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
