import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Spinner from "./Spinner";
import ConfirmModal from "./ConfirmModal";
import SearchAddress from "./SearchAddress";
import { setAlert } from "../../actions/alert";

const AddMuseum = () => {
  const dispatch = useDispatch();

  const museumsLoaded = useSelector((state) => state.loadMuseums);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (museumsLoaded.owned.length > 0) {
      setFormData({
        name: museumsLoaded.owned[0].name,
        description: museumsLoaded.owned[0].description,
        website: museumsLoaded.owned[0].website,
        phone: museumsLoaded.owned[0].phone,
        email: museumsLoaded.owned[0].email,
        address: museumsLoaded.owned[0].location.formattedAddress,
      });
    }
  }, []);

  const [modalSeen, setModalSeen] = useState(false);
  const [geoCoords, setGeocoords] = useState({
    lat: 52,
    lng: 21,
  });
  const toggleModal = () => {
    setModalSeen(!modalSeen);
  };

  const takeData = (lat, lng, address) => {
    setGeocoords({
      lat,
      lng,
    });
    setFormData({ ...formData, address: address });
  };

  const { name, description, website, phone, email, address } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (address.split(",").pop().trim() !== "Polska") {
      return dispatch(setAlert("Adres musi znajdować się w Polsce", "info"));
    }
    toggleModal();
  };

  //Redirect if page reloaded
  if (museumsLoaded.museumsNo === null) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {1 > 3 ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : (
        <Fragment>
          <section className="container" style={{ marginTop: "10vh" }}>
            {modalSeen && (
              <ConfirmModal
                name={name}
                address={address}
                phone={phone}
                email={email}
                website={website}
                description={description}
                lat={geoCoords.lat}
                lng={geoCoords.lng}
                toggleModal={() => {
                  toggleModal();
                }}
              />
            )}
            {!modalSeen && (
              <Fragment>
                <h1 className="mb-2">
                  {" "}
                  {museumsLoaded.owned.length
                    ? "Edytuj dane Muzum"
                    : "Dodaj Muzeum"}
                </h1>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card bg-white py-2 px-4">
                        <div className="card-body">
                          <h3>Lokalizacja i dane kontaktowe</h3>
                          <div className="form-group">
                            <input
                              type="text"
                              name="name"
                              value={name}
                              onChange={(e) => onChange(e)}
                              className="form-control"
                              required
                            />{" "}
                            <label style={name ? { display: "none" } : {}}>
                              Nazwa
                            </label>
                          </div>
                          <div className="form-group">
                            <SearchAddress
                              takeData={takeData}
                              editedAddress={formData.address}
                            />
                          </div>
                          {/* <div className="form-group">
                            <input
                              type="text"
                              name="address"
                              value={address}
                              onChange={(e) => onChange(e)}
                              className="form-control"
                              required
                            />{" "}
                            <label style={address ? { display: "none" } : {}}>
                              Adres
                            </label>
                            <small className="form-text text-muted">
                              Prosimy podać wraz z numerem ulicy
                            </small>
                          </div> */}
                          <div className="form-group">
                            <input
                              type="number"
                              min="100000000"
                              max="999999999"
                              name="phone"
                              value={phone}
                              onChange={(e) => onChange(e)}
                              className="form-control"
                            />{" "}
                            <label style={phone ? { display: "none" } : {}}>
                              Telefon kontaktowy
                            </label>
                            <small className="form-text text-muted">
                              Tylko cyfry np: 223334455 lub 500600700
                            </small>
                          </div>
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              value={email}
                              onChange={(e) => onChange(e)}
                              className="form-control"
                            />{" "}
                            <label style={email ? { display: "none" } : {}}>
                              Adres e-mail
                            </label>
                          </div>
                          <div className="form-group">
                            <input
                              type="url"
                              name="website"
                              value={website}
                              pattern="https?://.+"
                              onChange={(e) => onChange(e)}
                              size="30"
                              className="form-control"
                            />{" "}
                            <label style={website ? { display: "none" } : {}}>
                              Adres witryny webowej
                            </label>
                            <small className="form-text text-muted">
                              Musi zaczynać się od https:// lub http://
                            </small>
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
                              onChange={(e) => onChange(e)}
                              rows="8"
                              className="form-control"
                              placeholder="Opisz Muzeum w kilku słowach"
                              maxLength="1500"
                            ></textarea>
                            <small className="form-text text-muted">
                              Treść nie może być dłuższa niż 1500 znaków
                            </small>
                          </div>
                          <p className="text-muted my-4">
                            *Po dodaniu Muzeum będzie można utworzyć związane z
                            nim wystawy
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Zapisz muzeum"
                      className="btn btn-success btn-block my-4"
                    />
                    <Link
                      to="/managemuseums"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Powrót do panelu zarządzania Muzeum
                    </Link>
                  </div>
                </form>
              </Fragment>
            )}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};
export default AddMuseum;
