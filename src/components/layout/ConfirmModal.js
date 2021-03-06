import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createMuseum, updateMuseum } from "../../actions/loadMuseums";
import MapBox from "./MapBox";
import { countMuseums } from "../../actions/museum";

const ConfirmModal = ({
  name,
  address,
  phone,
  email,
  website,
  description,
  toggleModal,
  lat,
  lng,
  owner,
}) => {
  const dispatch = useDispatch();
  const comboAddress = `${address}--${lat}--${lng}`;
  const isEdited = useSelector((state) => state.loadMuseums.owned.length);
  const loadedMuseum = useSelector((state) => state.loadMuseums.owned);
  let id = isEdited ? loadedMuseum[0]._id : null;

  const handleClick = () => {
    console.log(comboAddress);
    if (isEdited) {
      dispatch(
        updateMuseum(
          name,
          description,
          website,
          phone,
          email,
          comboAddress,
          id,
          owner
        )
      );
    } else {
      dispatch(
        createMuseum(name, description, website, phone, email, comboAddress, id)
      );
      dispatch(countMuseums());
    }
  };

  return (
    <div className="confirm-modal">
      <h1 className="mb-2">Potwierdź dane Muzeum</h1>
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Lokalizacja i dane kontaktowe</h3>
                <div className="form-group">
                  {" "}
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="form-control"
                    readOnly
                  />{" "}
                </div>
                <div className="form-group">
                  {" "}
                  <input
                    type="text"
                    name="address"
                    value={address}
                    className="form-control"
                    readOnly
                  />{" "}
                </div>
                <div className="form-group">
                  {" "}
                  <input
                    type="number"
                    min="100000000"
                    max="999999999"
                    name="phone"
                    value={phone}
                    className="form-control"
                    readOnly
                  />{" "}
                  <small className="form-text text-muted">
                    Tylko cyfry np: 223334455 lub 500600700
                  </small>
                </div>
                <div className="form-group">
                  {" "}
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className="form-control"
                    readOnly
                  />{" "}
                </div>
                <div className="form-group">
                  {" "}
                  <input
                    type="url"
                    name="website"
                    value={website}
                    className="form-control"
                    readOnly
                  />{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Opis muzeum</h3>
                <div className="form-group">
                  <textarea
                    name="description"
                    value={description}
                    className="form-control"
                    readOnly
                  ></textarea>
                </div>
                <p className="text-muted my-4">
                  *Po dodaniu Muzeum będzie można utworzyć związane z nim
                  wystawy
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <Link
            to="/managemuseums"
            className="btn btn-success btn-block my-4"
            onClick={handleClick}
          >
            {isEdited
              ? "Kliknij aby poprawić dane muzeum w katalogu"
              : "Kliknij aby wprowadzić muzeum do katalogu"}
          </Link>
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              toggleModal();
            }}
          >
            Kliknij tu jeżeli dane wymagają korekty...
          </button>
          <MapBox lng={lng} lat={lat} title={name} zoom={16} />
        </div>
      </form>
    </div>
  );
};

export default ConfirmModal;
