import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Exposition from "./Exposition";
import { loadingTrue, loadingFalse } from "../../actions/loadMuseums";
import { setAlert } from "../../actions/alert";
import Spinner from "./Spinner";

const MuseumProfile = ({ match }) => {
  const dispatch = useDispatch();

  const fullList = useSelector((state) => state.museum.cities);
  const loadMuseums = useSelector((state) => state.loadMuseums);

  const [formData, setFormData] = useState({
    photo: "",
    name: "",
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
      setFormData({
        ...formData,
        photo: museumLoaded.photo,
        name: museumLoaded.name,
        description: museumLoaded.description,
        expositions: museumLoaded.expositions,
      });
      dispatch(loadingFalse());
    } else {
      console.log("NIE MAMY");
    }
  }, []);

  console.log(formData.name);
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
                <h1>{formData.name}</h1>

                <p>{formData.description}</p>

                {/* Expositions   */}
                {loadMuseums.loading === true ? (
                  <Fragment>
                    <Spinner />
                  </Fragment>
                ) : (
                  formData.expositions.map((exposition) => <Exposition />)
                )}
              </div>
              {/* Sidebar   */}
              <div className="col-md-4">
                Image
                <img src="img/image_1.jpg" className="img-thumbnail" alt="" />
                {/* Rating */}
                <h1 className="text-center my-4">
                  <span className="badge badge-secondary badge-success rounded-circle p-3">
                    8.8
                  </span>{" "}
                  Rating
                </h1>
                {/* Buttons */}
                <a href="reviews.html" className="btn btn-dark btn-block my-3">
                  <i className="fas fa-comments"></i> Read Reviews
                </a>
                <a
                  href="add-review.html"
                  className="btn btn-light btn-block my-3"
                >
                  <i className="fas fa-pencil-alt"></i> Write a Review
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="btn btn-secondary btn-block my-3"
                >
                  <i className="fas fa-globe"></i> Visit Website
                </a>
                {/* Map */}
                <div id="map" style={{ width: "100%", height: "300px" }}></div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default MuseumProfile;
