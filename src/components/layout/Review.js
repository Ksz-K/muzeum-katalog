import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import Moment from "react-moment";
import { useSelector } from "react-redux";

const Review = ({ title, text, rating, when, userName, userID }) => {
  const auth = useSelector((state) => state.auth);
  const museumsNo = useSelector((state) => state.loadMuseums.museumsNo);

  //Redirect if page reloaded
  if (museumsNo === null) {
    return <Redirect to="/" />;
  }

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
        {auth.isAuthenticated && auth.user._id === userID && (
          <Fragment>
            {" "}
            <Link
              to="/addreview"
              className="btn btn-primary btn-block my-3"
              style={{
                display: auth.user.role === "user" ? "auto" : "none",
              }}
            >
              <i className="fas fa-pencil-alt"></i> Edytuj swoją opinię
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Review;
