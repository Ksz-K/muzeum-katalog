import axios from "axios";
import { setAlert } from "./alert";
import {
  LOAD_REVIEWS,
  SELECT_REVIEW_4_EDIT,
  CLEAN_REVIEWS,
  CREATE_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
} from "./types";

//Clean reviews
export const cleanReviews = () => (dispatch) => {
  dispatch({
    type: CLEAN_REVIEWS,
  });
};
//Load reviews 2 show
export const loadReviews = (id, skip = 0, user = 0) => async (dispatch) => {
  if (skip === 0) {
    dispatch(cleanReviews());
  }
  let res;
  try {
    if (id !== 0 && user !== 0) {
      res = await axios.get(`api/v1/museums/${id}-${skip}-${user}/reviews/`);
    } else if (id !== 0) {
      res = await axios.get(`api/v1/museums/${id}-${skip}-/reviews/`);
    } else if (user !== 0) {
      res = await axios.get(`api/v1/reviews/?user=${user}`);
    }

    dispatch({
      type: LOAD_REVIEWS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};

//Load single review 4 editing
export const selectReview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECT_REVIEW_4_EDIT,
      payload: id,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};

//Create review
export const createReview = (title, text, rating, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ title, text, rating });

  try {
    await axios.post(`/api/v1/museums/${id}/reviews`, body, config);

    dispatch({
      type: CREATE_REVIEW,
    });
    dispatch(setAlert("Opinia została pomyślnie zapisana", "success"));
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
  }
};

//Update review
export const updateReview = (title, text, rating, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ title, text, rating });

  try {
    await axios.put(`/api/v1/reviews/${id}`, body, config);

    dispatch({
      type: UPDATE_REVIEW,
    });
    dispatch(setAlert("Opinia została pomyślnie zaktualizowana", "success"));
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
  }
};

//Delete review
export const deleteReview = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/reviews/${id}`);

    dispatch({
      type: DELETE_REVIEW,
      payload: id,
    });
    console.log("jestem");
    dispatch(setAlert("Opinia została usunięta", "primary"));
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    console.log(error);
  }
};
