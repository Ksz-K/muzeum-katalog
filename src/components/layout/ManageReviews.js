import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loadReviews,
  deleteReview,
  selectReview,
} from "../../actions/loadReviews";

import { load2show } from "../../actions/loadMuseums";
import Spinner from "./Spinner";

const ManageReviews = ({ history }) => {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.loadReviews);
  const auth = useSelector((state) => state.auth);

  // if (!reviews.loaded.length && !reviews.loading) {
  //   console.log(!reviews.loaded.length);
  //   console.log(!reviews.loading);
  //   history.push("/museums");
  // }

  useEffect(() => {
    dispatch(loadReviews(0, 0, auth.user._id));
  }, []);

  return (
    <Fragment>
      {reviews.loading === true ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : (
        <Fragment>
          <section className="container" style={{ marginTop: "10vh" }}>
            <div className="row">
              <div className="col-md-8 m-auto">
                <div className="card bg-white py-2 px-4">
                  <div className="card-body">
                    <h1 className="mb-4">Twoje opinie</h1>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Muzeum</th>
                          <th scope="col">Ocena</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.loaded.map((review, index) => (
                          <tr key={index}>
                            <td>{review.museum.name}</td>
                            <td>{review.rating}</td>
                            <td>
                              <Link
                                onClick={() => {
                                  dispatch(load2show(review.museum._id, true));
                                  dispatch(selectReview(review._id));
                                }}
                                to="/addreview"
                                className="btn btn-secondary"
                              >
                                <i className="fas fa-pencil-alt"></i>
                              </Link>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  if (window.confirm("Usunąć opinię?")) {
                                    dispatch(deleteReview(review._id));
                                  }
                                }}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ManageReviews;
