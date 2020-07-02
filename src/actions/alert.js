import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType, showTime = 3456) => (dispatch) => {
  const id = Date.now().toString(36);

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, showTime);
};
