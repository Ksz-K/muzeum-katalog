import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  createMuseum,
  updateMuseum,
  deleteMuseum,
} from "../../actions/loadMuseums";

import { load2show } from "../../actions/loadMuseums";
import Spinner from "./Spinner";

const ManageMuseums = ({ history }) => {
  const dispatch = useDispatch();

  const owned = useSelector((state) => state.loadMuseums.owned);

  // if (!reviews.loaded.length && !reviews.loading) {
  //   console.log(!reviews.loaded.length);
  //   console.log(!reviews.loading);
  //   history.push("/museums");
  // }

  useEffect(() => {
    // dispatch(loadReviews(0, 0, auth.user._id));
  }, []);

  return (
    <Fragment>
      {owned.length === 0 ? (
        <Fragment>
          <section className="container" style={{ marginTop: "10vh" }}>
            <div className="row">
              <div className="col-md-8 m-auto">
                <div className="card bg-white py-2 px-4">
                  <div className="card-body">
                    <h1 className="mb-2">Zarządzanie Muzeum</h1>
                    <p className="lead">
                      Nie masz jeszcze jeszcze Muzeum - kliknij link poniżej aby
                      utworzyć
                    </p>
                    <Link to="addmuseum" className="btn btn-primary btn-block">
                      Utwórz Muzeum
                    </Link>

                    <p className="text-muted mt-5">
                      * Konto Muzealnika umożliwia utworzenie jednego Muzeum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      ) : (
        <Fragment>
          {" "}
          <section className="container" style={{ marginTop: "10vh" }}>
            <div className="row">
              <div className="col-md-8 m-auto">
                <div className="card bg-white py-2 px-4">
                  <div className="card-body">
                    <h1 className="mb-4">Zarządzaj swoim Muzeum</h1>
                    <div className="card mb-3">
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <img
                            src="img/image_1.jpg"
                            className="card-img"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              <a href="bootcamp.html">
                                Devworks Bootcamp
                                <span className="float-right badge badge-success">
                                  8.8
                                </span>
                              </a>
                            </h5>
                            <span className="badge badge-dark mb-2">
                              Boston, MA
                            </span>
                            <p className="card-text">
                              Web Development, UI/UX, Mobile Development
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form className="mb-4">
                      <div className="form-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            name="photo"
                            className="custom-file-input"
                            id="photo"
                          />
                          <label className="custom-file-label">
                            Dodaj zdjęcie Muzeum
                          </label>
                        </div>
                      </div>
                      <input
                        type="submit"
                        className="btn btn-light btn-block"
                        value="Upload Image"
                      />
                    </form>
                    <Link
                      to="/addbootcamp"
                      className="btn btn-primary btn-block"
                    >
                      Edit Bootcamp Details{" "}
                    </Link>

                    <Link
                      href="manage-courses.html"
                      className="btn btn-secondary btn-block"
                    >
                      Manage Courses
                    </Link>
                    <Link to="#!" className="btn btn-danger btn-block">
                      Usuń Muzeum
                    </Link>
                    <p className="text-muted mt-5">
                      * Konto Muzealnika umożliwia utworzenie jednego Muzeum
                    </p>
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

export default ManageMuseums;
