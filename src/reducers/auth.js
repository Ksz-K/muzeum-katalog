import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_PASSWORD,
  ACTION_PENDING,
  MANAGE_ACCOUNT,
  RESTORE_PASSWORD,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  passwordChanged: undefined,
  accountChanged: undefined,
  user: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case RESTORE_PASSWORD:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case UPDATE_PASSWORD:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        passwordChanged: true,
      };
    case MANAGE_ACCOUNT:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        accountChanged: true,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        passwordChanged: undefined,
        accountChanged: undefined,
        user: "none",
      };

    case ACTION_PENDING:
      return {
        ...state,
        [payload]: "pending",
      };

    default:
      return state;
  }
}
