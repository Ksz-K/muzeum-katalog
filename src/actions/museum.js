import axios from "axios";
import { setAlert } from "./alert";
import { COUNT_MUSEUMS, WHERE_IS, TAKE_CITIES, UPDATE_SELECTED } from "./types";

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
  try {
    const res = await axios.get("/api/v1/museums/whereIsVisitor");
    dispatch({
      type: WHERE_IS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(
      setAlert("System nie uzyskał dostępu do Twojej lokalizacji", "primary")
    );
  }
};

//Obtain list of polish cities
export const takeCities = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://kszk-api.herokuapp.com/api/weather/poland/cities"
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
