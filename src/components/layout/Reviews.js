import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Review from "./Review";
import Spinner from "./Spinner";
import { loadReviews } from "../../actions/loadReviews";

const Reviews = ({ history }) => {
  const dispatch = useDispatch();

  const showed = useSelector((state) => state.loadMuseums.showed);
  const reviews = useSelector((state) => state.loadReviews);

  if (!showed) {
    history.push("/museums");
  }

  useEffect(() => {
    dispatch(loadReviews(showed._id));
  }, []);

  return (
    <section className="bootcamp" style={{ marginTop: "10vh" }}>
      <div className="container">
        <div className="row">
          {/* Main col   */}
          <div className="col-md-8">
            <Link
              to={`/museums/${showed.slug}`}
              className="btn btn-secondary my-3"
            >
              <i className="fas fa-chevron-left"></i> Informacje o muzeum
            </Link>
            <h1 className="mb-4">{showed.name}</h1>
            {/* Reviews   */}
            {reviews.loading === true ? (
              <Fragment>
                <Spinner />
              </Fragment>
            ) : (
              <Fragment>
                {reviews.loaded.map((review) => (
                  <Review
                    key={review._id}
                    title={review.title}
                    text={review.text}
                    rating={review.rating}
                    when={review.createdAt}
                    userName={review.user.name}
                  />
                ))}
              </Fragment>
            )}
          </div>
          {/* Sidebar   */}
          <div className="col-md-4">
            {/* Rating   */}
            <h1 className="text-center my-4">
              <span className="badge badge-secondary badge-success rounded-circle p-3">
                {showed.averageRating}
              </span>
              Średnia ocen
            </h1>

            <Link to="/addreview" className="btn btn-primary btn-block my-3">
              <i className="fas fa-pencil-alt"></i> Zamieść swoją ocenę
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
