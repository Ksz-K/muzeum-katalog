import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Exposition from "./Exposition";
import MapBox from "./MapBox";
import {
  loadingTrue,
  loadingFalse,
  load2show,
  setupLoaded,
} from "../../actions/loadMuseums";

import { cleanReviews, loadReviews } from "../../actions/loadReviews";

import Spinner from "./Spinner";

const MuseumProfile = ({ match, history }) => {
  const dispatch = useDispatch();

  const loadMuseums = useSelector((state) => state.loadMuseums);
  const auth = useSelector((state) => state.auth);

  const [profileData, setProfileData] = useState({
    photo: "",
    name: "",
    description: "",
    expositions: [],
    averageRating: "",
    website: "",
    lng: "",
    lat: "",
    zoom: 7,
    ifError: 0,
  });

  useEffect(() => {
    dispatch(cleanReviews());
  });
  useEffect(() => {
    dispatch(loadingTrue());
    if (
      loadMuseums.loaded.filter((museum) => museum.slug === match.params.name)
        .length
    ) {
      const museumLoaded = loadMuseums.loaded.filter(
        (museum) => museum.slug === match.params.name
      )[0];

      setProfileData({
        ...profileData,
        photo: museumLoaded.photo,
        name: museumLoaded.name,
        description: museumLoaded.description,
        expositions: museumLoaded.expositions || [],
        averageRating: museumLoaded.averageRating || "*",
        website: museumLoaded.website,
        lng: museumLoaded.location.coordinates[0],
        lat: museumLoaded.location.coordinates[1],
      });

      dispatch(setupLoaded(museumLoaded));
      dispatch(loadingFalse());
    } else {
      loadBySlug();
    }
  }, [loadMuseums.loaded]);

  const loadBySlug = async () => {
    setProfileData({ ...profileData, ifError: profileData.ifError + 1 });
    if (profileData.ifError > 7) {
      history.push("/pageNotFound");
    }
    dispatch(load2show(`?slug=${match.params.name}`));
  };

  return (
    <Fragment>
      {loadMuseums.loading === true ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : (
        <section className="bootcamp" style={{ marginTop: "10vh" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <h1>{profileData.name}</h1>

                <p>{profileData.description}</p>

                {/* Expositions   */}
                {loadMuseums.loading === true ? (
                  <Fragment>
                    <Spinner />
                  </Fragment>
                ) : (
                  profileData.expositions.map((exposition, index) => (
                    <Exposition
                      key={index}
                      title={exposition.title}
                      description={exposition.description}
                    />
                  ))
                )}
              </div>
              {/* Sidebar   */}
              <div className="col-md-4">
                <img
                  src={`http://localhost:5000/uploads/${profileData.photo}`}
                  className="img-thumbnail"
                  alt=""
                />
                {/* Rating */}
                <h1 className="text-center my-4">
                  <span className="badge badge-secondary badge-success rounded-circle p-3">
                    {profileData.averageRating}
                  </span>{" "}
                  Średnia ocen
                </h1>
                {/* Buttons */}
                <Link to="/reviews" className="btn btn-dark btn-block my-3">
                  <i className="fas fa-comments"></i> Opinie o muzeum
                </Link>
                <Link
                  onClick={() => {
                    dispatch(
                      loadReviews(loadMuseums.showed._id, 0, auth.user._id)
                    );
                  }}
                  to="/addreview"
                  className="btn btn-light btn-block my-3"
                  style={{
                    pointerEvents: auth.user.role === "user" ? "auto" : "none",
                  }}
                >
                  <i className="fas fa-pencil-alt"></i>{" "}
                  {auth.user.role === "user"
                    ? "Napisz opinię"
                    : "Aby napisać opinie zaloguj się jako Zwiedzający "}
                </Link>
                <a
                  href={profileData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-block my-3"
                >
                  <i className="fas fa-globe"></i> Strona www
                </a>
                <h2 className="text-center">
                  <a
                    href={`https://www.google.com/maps/dir//${profileData.lat},${profileData.lng}/@${profileData.lat},${profileData.lng},16z?hl=pl`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="badge badge-success"
                  >
                    {" "}
                    Jak dojechać ?{" "}
                    <span>
                      <i className="fas fa-route"></i>
                    </span>
                  </a>
                </h2>
                {/* Map */}
                <div style={{ width: "100%", height: "300px" }}>
                  {profileData.lng && (
                    <MapBox
                      lng={profileData.lng}
                      lat={profileData.lat}
                      title={profileData.name}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default MuseumProfile;
