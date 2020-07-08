import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import museum from "./museum";

export default combineReducers({
  alert,
  auth,
  museum,
});
