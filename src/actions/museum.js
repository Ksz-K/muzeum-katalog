import axios from "axios";
import { setAlert } from "./alert";
import { COUNT_MUSEUMS, WHERE_IS, TAKE_CITIES, UPDATE_SELECTED } from "./types";
import removeDuplicatesBy from "../utils/removeDuplicates";

//Count museums User
export const countMuseums = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/museums/count");
    dispatch({
      type: COUNT_MUSEUMS,
      payload: res.data.counter,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};

//Show museum search StartPoint
export const whereVisitorIs = () => async (dispatch) => {
  const options = {
    enableHighAccuracy: false,
    timeout: 3000,
    maximumAge: 0,
  };

  async function success(pos) {
    var crd = pos.coords;

    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);

    try {
      const res = await axios.get(
        `/api/v1/museums/whereIsVisitor/${crd.latitude}-${crd.longitude}`
      );
      dispatch({
        type: WHERE_IS,
        payload: res.data,
      });
    } catch (error) {
      dispatch(
        setAlert("System nie uzyskał dostępu do Twojej lokalizacji", "primary")
      );
    }
  }

  async function htmlGeoBlocked() {
    try {
      const res = await axios.get(
        `/api/v1/museums/whereIsVisitor/blocked-blocked`
      );
      dispatch({
        type: WHERE_IS,
        payload: res.data,
      });
    } catch (error) {
      dispatch(
        setAlert("System nie uzyskał dostępu do Twojej lokalizacji", "primary")
      );
    }
  }

  navigator.geolocation.getCurrentPosition(success, htmlGeoBlocked, options);
};

//Obtain list of polish cities
export const takeCities = () => async (dispatch) => {
  try {
    const resDuplicated = await axios.get(
      "https://kszk-api.herokuapp.com/api/weather/poland/cities"
    );

    const res = await removeDuplicatesBy(
      (city) => city.name,
      resDuplicated.data
    );

    dispatch({
      type: TAKE_CITIES,
      payload: res,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do bazy miast", "primary"));
  }
};

//Fill details of selected city
export const updateSelected = (name, pending = false) => async (dispatch) => {
  if (name === "") {
    dispatch({
      type: UPDATE_SELECTED,
      payload: { data: null },
    });
  } else if (name && pending === true) {
    dispatch({
      type: UPDATE_SELECTED,
      payload: { data: { cityPending: name } },
    });
  } else {
    try {
      const res = await axios.get(
        `https://kszk-api.herokuapp.com/api/weather/world/cities/${name}`
      );
      dispatch({
        type: UPDATE_SELECTED,
        payload: res,
      });
    } catch (error) {
      dispatch(setAlert("System nie uzyskał dostępu do bazy miast", "primary"));
    }
  }
};
