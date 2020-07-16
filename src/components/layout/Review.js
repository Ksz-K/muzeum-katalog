import React from "react";

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
          Zamieszczono {when} przez {userName}
        </p>
      </div>
    </div>
  );
};

export default Review;
