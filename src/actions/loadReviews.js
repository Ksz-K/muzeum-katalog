import axios from "axios";
import { setAlert } from "./alert";
import { LOAD_REVIEWS } from "./types";

//Load reviews 2 show
export const loadReviews = (id, query = "") => async (dispatch) => {
  try {
    const res = await axios.get(`api/v1/museums/${id}/reviews/${query}`);
    dispatch({
      type: LOAD_REVIEWS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};
