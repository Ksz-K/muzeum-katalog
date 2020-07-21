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
  const auth = useSelector((state) => state.auth);

  if (!showed) {
    history.push("/museums");
  }

  useEffect(() => {
    dispatch(loadReviews(showed._id, 0, auth.user._id));
  }, []);

  const loadMore = () => {
    const skip = (reviews.loaded.length / 2) * 1;
    dispatch(loadReviews(showed._id, skip));
  };

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
                    userID={review.user._id}
                  />
                ))}
                {
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    onClick={loadMore}
                    disabled={!(reviews.loaded.length - reviews.reviewsNo)}
                  >
                    Załadowano {reviews.loaded.length} z {reviews.reviewsNo}{" "}
                    opinii.{" "}
                    <span
                      className="font-weight-lighter font-italic"
                      style={{
                        display:
                          reviews.loaded.length - reviews.reviewsNo
                            ? ""
                            : "none",
                      }}
                    >
                      Kliknij aby załadować kolejne
                    </span>
                  </button>
                }
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
            <Link
              className="nav-link"
              to="/login"
              style={{
                display: auth.user === "none" ? "auto" : "none",
              }}
            >
              <i className="fas fa-sign-in-alt"></i> Aby dodać opinie zaloguj
              się
            </Link>
            {reviews.isReviewer.length > 0 ? (
              <Fragment>
                <Link
                  to="/addreview"
                  className="btn btn-primary btn-block my-3"
                >
                  <i className="fas fa-pencil-alt"></i>
                  &nbsp;Edytuj swoją opinię
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link
                  to="/addreview"
                  className="btn btn-primary btn-block my-3"
                  style={{
                    display: auth.user.role === "user" ? "auto" : "none",
                  }}
                >
                  <i className="fas fa-pencil-alt"></i>
                  {auth.user === "none" ? (
                    <Fragment>
                      <span>Aby dodać opinie zaloguj się</span>
                    </Fragment>
                  ) : (
                    <Fragment>&nbsp;Napisz opinię</Fragment>
                  )}
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
