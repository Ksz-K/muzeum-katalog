import React from "react";
import MapBox from "./MapBox";

const ConfirmModal = ({
  name,
  address,
  phone,
  email,
  website,
  description,
  toggleModal,
}) => {
  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="confirm-modal">
      <h1 className="mb-2">Potwierdź dane Muzeum</h1>
      <form onSubmit={(e) => onSubmit(e)}>
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
          <button
            className="btn btn-success btn-block my-4"
            onClick={() => {
              console.log("click");
              toggleModal();
            }}
          >
            Wprowadź muzeum do katalogu
          </button>
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              console.log("click");
              toggleModal();
            }}
          >
            Dane wymagają korekty...
          </button>
          <MapBox lng={21} lat={51} title={name} />
        </div>
      </form>
    </div>
  );
};

export default ConfirmModal;
