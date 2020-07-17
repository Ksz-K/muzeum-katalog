import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createReview } from "../../actions/loadReviews";

const AddReview = ({ history }) => {
  const dispatch = useDispatch();

  const showed = useSelector((state) => state.loadMuseums.showed);
  const reviews = useSelector((state) => state.loadReviews);

  if (!showed) {
    history.push("/museums");
  }

  const [formData, setFormData] = useState({
    rating: 7,
    title: "",
    text: "",
  });

  const { rating, title, text } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (reviews.isReviewer) {
      dispatch(createReview(title, text, rating, showed._id));
    } else {
    }
    history.push("/reviews");
  };

  return (
    <section className="container" style={{ marginTop: "10vh" }}>
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                to={`/museums/${showed.slug}`}
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Muzeum szczegóły
              </Link>
              <h1 className="mb-2">{showed.name}</h1>
              <h3 className="text-primary mb-4">Napisz opinię:</h3>

              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  {" "}
                  <label className="mt-2">
                    Ocena: <span className="text-primary">{rating}</span>
                  </label>
                  <input
                    type="range"
                    className="custom-range"
                    min="1"
                    max="10"
                    step="1"
                    name="rating"
                    value={rating}
                    onChange={(e) => onChange(e)}
                  />{" "}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => onChange(e)}
                  />{" "}
                  <label style={title ? { display: "none" } : {}}>Tytuł</label>
                </div>
                <div className="form-group">
                  <textarea
                    name="text"
                    rows="10"
                    className="form-control"
                    placeholder="Your review"
                    value={text}
                    onChange={(e) => onChange(e)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Zapisz opinię"
                    className="btn btn-dark btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddReview;
