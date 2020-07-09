import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { takeCities } from "../../actions/museum";
import { setAlert } from "../../actions/alert";
import Suggestion from "./inputSuggestion";
import removeDuplicatesBy from "../../utils/removeDuplicates";

const Landing = () => {
  const dispatch = useDispatch();
  const geoLocation = useSelector((state) => state.museum.visitorLocation);
  const fullList = useSelector((state) => state.museum.cities);
  const citySelected = useSelector((state) => state.museum.citySelected);

  const [formData, setFormData] = useState({
    place: "Zbieram dane...",
    km: "",
    longitude: "",
    latitude: "",
  });

  useEffect(() => {
    if (geoLocation.country_name !== undefined) {
      setFormData({
        place: `${geoLocation.country_name}-${geoLocation.region_name}-${geoLocation.city}`,
        km: "",
        longitude: geoLocation.longitude,
        latitude: geoLocation.latitude,
      });
    }
  }, [geoLocation]);

  useEffect(() => {
    if (fullList.length === 0) {
      dispatch(takeCities());
    }
  }, []);

  const { place, km, longitude, latitude } = formData;

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
    console.log(params);
    //dispatch(manageAccount({ name, email }));
  };

  return (
    <section className="showcase">
      <div className="dark-overlay">
        <div className="showcase-inner container">
          <h1 className="display-4">Muzea - wyszukiwarka </h1>
          <p className="lead">
            Tu znajdziesz informacje o muzeach, wystawach i opiniach
            zwiedzających
          </p>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    name="km"
                    value={km}
                    onChange={(e) => onChange(e)}
                    placeholder="Obręb wyszukiwania w km"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Suggestion place={place} fullList={fullList} />
                </div>
              </div>
            </div>
            <input
              type="submit"
              value="Znajdź Muzeum"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Landing;
