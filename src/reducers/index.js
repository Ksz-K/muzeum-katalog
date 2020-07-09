import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import museum from "./museum";
import loadMuseums from "./loadMuseums";

export default combineReducers({
  alert,
  auth,
  museum,
  loadMuseums,
});
