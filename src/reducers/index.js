import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import museum from "./museum";
import loadMuseums from "./loadMuseums";
import loadReviews from "./loadReviews";

export default combineReducers({
  alert,
  auth,
  museum,
  loadMuseums,
  loadReviews,
});
