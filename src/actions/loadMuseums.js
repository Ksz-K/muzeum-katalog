import axios from "axios";
import { setAlert } from "./alert";
import { LOAD_2_SHOW, LOAD_NEAR_2_SHOW } from "./types";

//Load museum 2 show
export const load2show = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/museums/");
    dispatch({
      type: LOAD_2_SHOW,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("System nie uzyskał dostępu do Bazy Danych", "danger"));
    dispatch(setAlert("Prosimy spróbować jeszcze raz za chwilkę", "primary"));
  }
};

//Load museum 2 show
export const loadNear2show = ({ km, longitude, latitude }) => async (
  dispatch
) => {
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
