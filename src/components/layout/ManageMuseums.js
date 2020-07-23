import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  createMuseum,
  updateMuseum,
  deleteMuseum,
  loadOwned,
} from "../../actions/loadMuseums";
import Spinner from "./Spinner";

const ManageMuseums = () => {
  const dispatch = useDispatch();

  useEffect(() => {});
  const museumsLoaded = useSelector((state) => state.loadMuseums);

  const [isOwner, setIsOwner] = useState(false);
  const [pageContent, setPageContent] = useState({
    name: "",
    photo: "",
    slug: "",
    formattedAddress: "",
    averageRating: "*",
    id: "",
  });

  useEffect(() => {
    if (museumsLoaded.owned === undefined || museumsLoaded.owned.length === 0) {
      setIsOwner(false);
    } else {
      setIsOwner(true);
      setPageContent({
        name: museumsLoaded.owned[0].name,
        photo: museumsLoaded.owned[0].photo,
        slug: museumsLoaded.owned[0].slug,
        formattedAddress: museumsLoaded.owned[0].location.formattedAddress,
        averageRating:
          museumsLoaded.owned[0].averageRating > 0
            ? museumsLoaded.owned[0].averageRating
            : "*",
        id: museumsLoaded.owned[0]._id,
      });
    }
  }, [museumsLoaded.owned]);

  //Redirect if page reloaded
  if (museumsLoaded.museumsNo === null) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {!isOwner && (
        <Fragment>
          <section className="container" style={{ marginTop: "10vh" }}>
            <div className="row">
              <div className="col-md-8 m-auto">
                <div className="card bg-white py-2 px-4">
                  <div className="card-body">
                    <h1 className="mb-2">Zarządzanie Muzeum</h1>
                    <p className="lead">
                      Nie masz jeszcze Muzeum - kliknij link poniżej aby
                      utworzyć
                    </p>
                    <Link to="/addmuseum" className="btn btn-primary btn-block">
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
      )}
      {isOwner && (
        <Fragment>
          {museumsLoaded.loading ? (
            <Fragment>
              <Spinner />
            </Fragment>
          ) : (
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
                              src={`http://localhost:5000/uploads/${pageContent.photo}`}
                              className="card-img"
                              alt="..."
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className="card-title">
                                <Link to={`/museums/${pageContent.slug}`}>
                                  {pageContent.name}
                                  <span className="float-right badge badge-success">
                                    {pageContent.averageRating}
                                  </span>
                                </Link>
                              </h5>
                              <span className="badge badge-dark mb-2">
                                {pageContent.formattedAddress}
                              </span>
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
                        Edytuj dane Muzeum{" "}
                      </Link>

                      <Link
                        to="/managecourses"
                        className="btn btn-secondary btn-block"
                      >
                        Zarządzaj wystawami
                      </Link>
                      <Link
                        className="btn btn-danger btn-block"
                        onClick={() => {
                          if (window.confirm("Usunąć trwale Muzeum?")) {
                            dispatch(deleteMuseum(pageContent.id));
                          }
                        }}
                        to="/managemuseums"
                      >
                        Usuń muzeum z Katalogu
                      </Link>
                      <p className="text-muted mt-5">
                        * Konto Muzealnika umożliwia utworzenie jednego Muzeum
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ManageMuseums;
