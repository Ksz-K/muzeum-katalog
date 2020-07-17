import axios from "axios";
import { setAlert } from "./alert";
import { LOAD_REVIEWS, CLEAN_REVIEWS } from "./types";

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
