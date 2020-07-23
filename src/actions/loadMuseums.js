import axios from "axios";
import { setAlert } from "./alert";
import {
  LOAD_2_SHOW,
  LOAD_NEAR_2_SHOW,
  LOADING_TRUE,
  LOADING_FALSE,
  FILTER_REDUX,
  FILTER_MONGO,
  SETUP_LOADED,
  CREATE_MUSEUM,
  UPDATE_MUSEUM,
  DELETE_MUSEUM,
  LOAD_OWNED,
} from "./types";

//Make loading TRUE
export const loadingTrue = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};

//Make loading FALSE
export const loadingFalse = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};

//SETUP loaded
export const setupLoaded = (loaded) => async (dispatch) => {
  try {
    dispatch({
      type: SETUP_LOADED,
      payload: loaded,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};
//Load museum 2 show
export const load2show = (query = "", single = false) => async (dispatch) => {
  dispatch(loadingTrue());

  try {
    let res = await axios.get(`/api/v1/museums/${query}`);
    if (single === true) {
      res.data.single = true;
    } else if (single === "owner") {
      res.data.single = "owner";
    } else {
      res.data.single = false;
    }

    dispatch({
      type: LOAD_2_SHOW,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};

//Load museum owned by Muzealnik
export const loadOwned = (query) => async (dispatch) => {
  dispatch(loadingTrue());
  if (query.split("=")[1].trim() === "undefined") {
    return dispatch(setAlert("Chwilowy problem z serwerem", "danger"));
  }

  try {
    const res = await axios.get(`/api/v1/museums/${query}`);

    dispatch({
      type: LOAD_OWNED,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};

//Load museum 2 near distance show
export const loadNear2show = ({ km, longitude, latitude }) => async (
  dispatch
) => {
  dispatch(loadingTrue());
  try {
    const res = await axios.get(
      `api/v1/museums/radius/${longitude}-${latitude}/${km}`
    );
    dispatch({
      type: LOAD_NEAR_2_SHOW,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};

//Filter museum placed in Redux-Store
export const filterRedux = ({ rating }) => async (dispatch) => {
  dispatch(loadingTrue());

  try {
    dispatch({
      type: FILTER_REDUX,
      payload: rating * 1,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};

//Filter museum placed in Mongo
export const filterMongo = ({ km, longitude, latitude, rating }) => async (
  dispatch
) => {
  dispatch(loadingTrue());
  let codedKm = km === "" ? 777 : km * 1;
  codedKm = rating * 1000 + codedKm;

  try {
    const res = await axios.get(
      `api/v1/museums/radius/${longitude}-${latitude}/${codedKm}`
    );

    dispatch({
      type: FILTER_MONGO,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};

//Create museum
export const createMuseum = (
  name,
  description,
  website,
  phone,
  email,
  comboAddress
) => async (dispatch) => {
  dispatch(loadingTrue());
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    name,
    description,
    website,
    phone,
    email,
    address: comboAddress,
  });

  try {
    const res = await axios.post(`/api/v1/museums/`, body, config);

    dispatch({
      type: CREATE_MUSEUM,
      payload: res.data,
    });
    dispatch(
      setAlert("Muzeum zostało pomyślnie zapisane w katalogu", "success")
    );
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
  }
};

//Update museum
export const updateMuseum = () => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_MUSEUM,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};

//Delete museum
export const deleteMuseum = (id) => async (dispatch) => {
  dispatch(loadingTrue());
  try {
    await axios.delete(`/api/v1/museums/${id}`);

    dispatch({
      type: DELETE_MUSEUM,
    });

    dispatch(setAlert("Muzeum zostało usunięte", "primary"));
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    console.log(error);
  }
};
