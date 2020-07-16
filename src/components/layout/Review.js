import React from "react";
import Moment from "react-moment";

const Review = ({ title, text, rating, when, userName }) => {
  return (
    <div className="card mb-3">
      <h5 className="card-header bg-dark text-white">{title}</h5>
      <div className="card-body">
        <h5 className="card-title">
          Ocena: <span className="text-success">{rating}</span>
        </h5>
        <p className="card-text">{text}</p>
        <p className="text-muted">
          Zamieszczono <Moment format="DD/MMM/YYYY HH:MM:SS">{when}</Moment>{" "}
          przez {userName}
        </p>
      </div>
    </div>
  );
};

export default Review;
