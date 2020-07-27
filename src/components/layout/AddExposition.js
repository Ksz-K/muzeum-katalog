import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { createExposition, updateExposition } from "../../actions/loadMuseums";
import Spinner from "./Spinner";

const AddExposition = ({ history }) => {
  const dispatch = useDispatch();

  const museumsLoaded = useSelector((state) => state.loadMuseums);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    id: "",
  });

  useEffect(() => {
    checkIfEdit();
  }, [museumsLoaded.owned]);

  const { title, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (museumsLoaded.expo2edit.length) {
      dispatch(
        updateExposition(
          title,
          description,
          museumsLoaded.expo2edit,
          museum.owner
        )
      );
    } else {
      dispatch(
        createExposition(title, description, museum.museumID, museum.owner)
      );
    }
    history.push("/manageexpositions");
  };

  const checkIfEdit = () => {
    museumsLoaded.owned[0].expositions.forEach((expo) => {
      if (expo._id === museumsLoaded.expo2edit) {
        console.log(expo);
        setFormData({
          title: expo.title,
          description: expo.description,
        });
      }
    });
  };
  //Redirect if page reloaded
  if (museumsLoaded.museumsNo === null) {
    return <Redirect to="/" />;
  }

  const museum = {
    name: museumsLoaded.owned[0].name,
    museumID: museumsLoaded.owned[0]._id,
    owner: museumsLoaded.owned[0].user,
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                to="/manageexpositions"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Zarządzaj wystawami
              </Link>
              <h1 className="mb-2">{museum.name}</h1>
              <h3 className="text-primary mb-4">
                {museumsLoaded.expo2edit.length
                  ? "Zaktualizuj opis wystawy"
                  : "Dodaj wystawę"}{" "}
              </h3>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                    required
                  />{" "}
                  <label style={title ? { display: "none" } : {}}>
                    Tytuł wystawy
                  </label>
                </div>

                <div className="form-group">
                  <textarea
                    name="description"
                    rows="5"
                    className="form-control"
                    placeholder="Opisz wystawę..."
                    maxLength="1500"
                    required
                    value={description}
                    onChange={(e) => onChange(e)}
                  ></textarea>
                  <small className="form-text text-muted">
                    Opis może zawierać do 1500 znaków
                  </small>
                </div>

                <div className="form-group mt-4">
                  <button type="submit" className="btn  btn-primary">
                    {museumsLoaded.expo2edit.length
                      ? "Zaktualizuj opis wystawy"
                      : "Dodaj wystawę"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AddExposition;
