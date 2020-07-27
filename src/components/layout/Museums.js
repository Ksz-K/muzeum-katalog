import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { takeCities } from "../../actions/museum";
import {
  load2show,
  loadNear2show,
  filterRedux,
  filterMongo,
} from "../../actions/loadMuseums";
import { setAlert } from "../../actions/alert";
import Museum from "./Museum";
import Suggestion from "./inputSuggestion";
import Spinner from "./Spinner";

const Museums = () => {
  const dispatch = useDispatch();

  const fullList = useSelector((state) => state.museum.cities);
  const geoLocation = useSelector((state) => state.museum.visitorLocation);
  const citySelected = useSelector((state) => state.museum.citySelected);
  const loadMuseums = useSelector((state) => state.loadMuseums);
  const museumsNo = useSelector((state) => state.loadMuseums.museumsNo);

  useEffect(() => {
    if (fullList.length === 0) {
      dispatch(takeCities());
    }
  }, [fullList]);

  useEffect(() => {
    if (loadMuseums.museumsNo === null) {
      dispatch(load2show());
    }
  }, []);

  const [formData, setFormData] = useState({
    place: "Zbieram dane...",
    km: "",
    longitude: "",
    latitude: "",
    rating: "",
  });

  const { place, km, longitude, latitude, rating } = formData;

  useEffect(() => {
    if (geoLocation.country_name !== undefined && citySelected === null) {
      setFormData({
        ...formData,
        place: `${geoLocation.country_name}-${geoLocation.region_name}-${geoLocation.city}`,
        km: "",
        longitude: geoLocation.longitude,
        latitude: geoLocation.latitude,
      });
    }
  }, [geoLocation]);

  useEffect(() => {
    if (citySelected) {
      setFormData({
        ...formData,
        place: citySelected.name,
        km: "",
        longitude: citySelected.coord.lon,
        latitude: citySelected.coord.lat,
      });
    }
  }, []);

  useEffect(() => {
    if (
      loadMuseums.museumsNo > loadMuseums.returnedNo &&
      !loadMuseums.loading
    ) {
      !loadMuseums.preFilter &&
        dispatch(
          setAlert(
            `Wyszukiwanie zwróciło ${loadMuseums.museumsNo} wyników. Prezentujemy ${loadMuseums.returnedNo} z nich. Spróbuj zawęzić kryteria`,
            "primary"
          )
        );
    }
  }, [loadMuseums.museumsNo]);

  const onChange = (e) => {
    if (e.target.value < 0) {
      e.target.value = Math.abs(e.target.value);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let params = {};
    if (km === 0 || km === "") {
      dispatch(
        setAlert("Obręb wyszukiwania musi być większy niż 0 km", "primary")
      );
    }
    if (citySelected !== null && citySelected.cityPending) {
      dispatch(
        setAlert(
          `W bazie nie mamy miejscowości ${citySelected.cityPending}`,
          "primary"
        )
      );
    } else if (citySelected !== null) {
      params = {
        km,
        longitude: citySelected.coord.lon,
        latitude: citySelected.coord.lat,
      };
    } else {
      params = {
        km,
        longitude,
        latitude,
      };
    }

    km && dispatch(loadNear2show(params));
    setFormData({
      ...formData,
      rating: "",
    });
  };

  const filterThem = async (e) => {
    e.preventDefault();

    if (loadMuseums.museumsNo === loadMuseums.returnedNo) {
      rating && dispatch(filterRedux({ rating }));
    } else {
      let params = {};

      if (citySelected !== null) {
        params = {
          km,
          longitude: citySelected.coord.lon,
          latitude: citySelected.coord.lat,
        };
      } else {
        params = {
          km,
          longitude,
          latitude,
        };
      }
      console.log();
      rating && dispatch(filterMongo({ ...params, rating }));
    }
  };

  //Create logic for pagination
  const [paginationLogic, setPaginationLogic] = useState({
    currentStart: 0,
  });
  const pages = loadMuseums.loading
    ? "calculating"
    : Array(Math.ceil(loadMuseums.returnedNo / 4)).fill(1);

  const { currentStart } = paginationLogic;
  const highlighted = {
    borderTop: "2px solid #00f",
    borderBottom: "2px solid #00f",
  };

  //Redirect if page reloaded
  if (museumsNo === null) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {loadMuseums.loading === true ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : (
        <Fragment>
          <section className="browse mb-5" style={{ marginTop: "10vh" }}>
            <div className="container  ">
              <div className="row">
                {/* Sidebar   */}
                <div className="col-md-4">
                  <div className="card card-body mb-4">
                    <h4 className="mb-3">Szukaj muzeum w okolicy...</h4>
                    <form onSubmit={(e) => onSubmit(e)}>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              name="km"
                              min="1"
                              max="777"
                              value={km}
                              onChange={(e) => onChange(e)}
                              placeholder="km"
                            />
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <Suggestion fullList={fullList} place={place} />
                          </div>
                        </div>
                      </div>
                      <input
                        type="submit"
                        value="Wyszukaj muzeum"
                        className="btn btn-primary btn-block"
                      />
                    </form>
                    {!loadMuseums.returnedNo && (
                      <button
                        type="button"
                        className="btn btn-dark btn-block mt-2"
                        onClick={() => {
                          dispatch(load2show());
                        }}
                      >
                        Resetuj wyszukiwanie
                      </button>
                    )}
                  </div>
                  <div className="card card-body mb-4">
                    <h4 className="mb-3">Aktywny filtr wyszukiwania</h4>
                    <span className="badge badge-primary">
                      Miejscowość:{" "}
                      {citySelected !== null
                        ? citySelected.name
                        : geoLocation.city}
                    </span>
                    <span className="badge my-1  badge-secondary">
                      Obszar: {km || "niezdefiniowano"} {km && <span>km</span>}
                    </span>
                    <span className="badge my-1  badge-success">
                      Załadowono obiektów: {loadMuseums.museumsNo}
                    </span>
                    <span className="badge my-1  badge-danger">
                      Obiekty prezentowane: {loadMuseums.returnedNo}
                    </span>
                    <span className="badge my-1  badge-info">
                      Ocena: {rating || "niezdefiniowano"}{" "}
                    </span>

                    {1 && (
                      <button
                        type="button"
                        className="btn btn-dark btn-block mt-2"
                        onClick={() => {
                          dispatch(load2show());
                        }}
                      >
                        Resetuj wyszukiwanie
                      </button>
                    )}
                  </div>

                  <h4>Filtr</h4>
                  <form>
                    <div className="form-group">
                      <label style={rating ? { display: "none" } : {}}>
                        {" "}
                        Ocena
                      </label>
                      <select
                        className="custom-select mb-2"
                        name="rating"
                        value={rating}
                        onChange={(e) => onChange(e)}
                      >
                        <option value=""></option>
                        <option value="9">9+</option>
                        <option value="8">8+</option>
                        <option value="7">7+</option>
                        <option value="6">6+</option>
                        <option value="5">5+</option>
                        <option value="4">4+</option>
                        <option value="3">3+</option>
                        <option value="2">2+</option>
                      </select>
                    </div>
                    <input
                      type="submit"
                      value="Filtruj wyniki"
                      className="btn btn-primary btn-block"
                      onClick={(e) => {
                        filterThem(e);
                      }}
                    />
                  </form>
                </div>
                {/* Main col   */}
                <div className="col-md-8">
                  {/* Museums   */}

                  {loadMuseums.loading === true ? (
                    <Fragment>
                      <Spinner />
                    </Fragment>
                  ) : (
                    <Fragment>
                      {!loadMuseums.returnedNo && (
                        <button
                          type="button"
                          className="btn btn-info btn-block mt-2"
                          onClick={() => {
                            dispatch(load2show());
                          }}
                        >
                          System zwrócił zero wyników wyszukiwania
                        </button>
                      )}
                      {loadMuseums.loaded.map((museum, index) => (
                        <Museum
                          key={museum._id}
                          name={museum.name}
                          address={museum.location.formattedAddress}
                          description={museum.description}
                          photo={museum.photo}
                          www_url={museum.slug}
                          museumID={museum._id}
                          averageRating={museum.averageRating || "*"}
                          paginationViewStatus={
                            index < currentStart
                              ? "d-none"
                              : index < currentStart + 4
                              ? ""
                              : "d-none"
                          }
                        />
                      ))}
                    </Fragment>
                  )}

                  {/* Pagination   */}

                  {loadMuseums.returnedNo > 4 && (
                    <Fragment>
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          {currentStart > 1 && (
                            <li className="page-item">
                              <a
                                className="page-link"
                                href="#!"
                                onClick={() => {
                                  setPaginationLogic({
                                    ...paginationLogic,
                                    currentStart:
                                      currentStart - 4 < 0
                                        ? 0
                                        : currentStart - 4,
                                  });
                                }}
                              >
                                Poprzednia
                              </a>
                            </li>
                          )}

                          {pages.map((page, index) => (
                            <li
                              className="page-item"
                              key={index}
                              id={index}
                              style={
                                Math.ceil((currentStart * 1) / 4) === index * 1
                                  ? highlighted
                                  : null
                              }
                            >
                              <a
                                className="page-link  "
                                href="#!"
                                onClick={() => {
                                  setPaginationLogic({
                                    ...paginationLogic,
                                    currentStart:
                                      index * 4 > loadMuseums.returnedNo - 4
                                        ? loadMuseums.returnedNo - 4
                                        : index * 4,
                                  });
                                }}
                              >
                                {index + 1}
                              </a>
                            </li>
                          ))}

                          {currentStart < loadMuseums.returnedNo - 4 && (
                            <li className="page-item">
                              <a
                                className="page-link"
                                href="#!"
                                onClick={() => {
                                  setPaginationLogic({
                                    ...paginationLogic,
                                    currentStart:
                                      currentStart + 4 >
                                      loadMuseums.returnedNo - 4
                                        ? loadMuseums.returnedNo - 4
                                        : currentStart + 4,
                                  });
                                }}
                              >
                                Następna
                              </a>
                            </li>
                          )}
                        </ul>
                      </nav>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Museums;
