import axios from "axios";
import { setAlert } from "./alert";
import { LOAD_REVIEWS, CLEAN_REVIEWS, CREATE_REVIEW } from "./types";

//Clean reviews
export const cleanReviews = () => (dispatch) => {
  dispatch({
    type: CLEAN_REVIEWS,
  });
};
//Load reviews 2 show
export const loadReviews = (id, skip = 0, user = "") => async (dispatch) => {
  if (skip === 0) {
    dispatch(cleanReviews());
  }
  try {
    const res = await axios.get(
      `api/v1/museums/${id}-${skip}-${user}/reviews/`
    );

    dispatch({
      type: LOAD_REVIEWS,
      payload: res.data,
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
