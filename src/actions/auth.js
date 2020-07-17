import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_PASSWORD,
  REQUEST_RESTORE,
  RESTORE_PASSWORD,
  ACTION_PENDING,
  MANAGE_ACCOUNT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/v1/auth/me");
    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register = ({ name, email, password, role }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password, role });

  try {
    const res = await axios.post("/api/v1/auth/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Nowy użytkownik został zarejestrowany", "success"));
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.error.split(",");
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login User
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/v1/auth/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.error.split(",");
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Update password of logged-in user
export const updatePassword = ({ currentPassword, newPassword }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ currentPassword, newPassword });

  try {
    const res = await axios.put("/api/v1/auth/updatepassword", body, config);

    dispatch({
      type: UPDATE_PASSWORD,
      payload: res.data,
    });
    dispatch(setAlert("Hasło zostało pomyślnie zaktualizowane", "success"));
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Request restore forgotten password of user
export const requestRestore = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = { email };
  try {
    await axios.post(`/api/v1/auth/forgotpassword`, body, config);
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      console.log(errors);
    }
  }
};

//Restore forgotten password of user
export const restorePassword = (newPassword, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put(
      `/api/v1/auth/resetpassword/${token}`,
      { password: newPassword },
      config
    );

    dispatch({
      type: RESTORE_PASSWORD,
      payload: res.data,
    });
    dispatch(setAlert("Hasło zostało pomyślnie zaktualizowane", "success"));
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Manage account of logged-in user
export const manageAccount = ({ name, email }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email });

  try {
    const res = await axios.put("/api/v1/auth/updatedetails", body, config);

    dispatch({
      type: MANAGE_ACCOUNT,
    });
    dispatch(setAlert("Dane zostały pomyślnie zaktualizowane", "success"));
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

//Action pending
export const actionPending = (actionName) => (dispatch) => {
  dispatch({ type: ACTION_PENDING, payload: actionName });
};
