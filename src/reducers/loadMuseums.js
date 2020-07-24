import {
  LOAD_2_SHOW,
  LOAD_NEAR_2_SHOW,
  LOAD_OWNED,
  LOADING_TRUE,
  LOADING_FALSE,
  FILTER_REDUX,
  FILTER_MONGO,
  SETUP_LOADED,
  CREATE_MUSEUM,
  UPDATE_MUSEUM,
  DELETE_MUSEUM,
} from "../actions/types";

const initialState = {
  loading: true,
  loaded: [],
  museumsNo: null,
  returnedNo: null,
  preFilter: null,
  showed: null,
  owned: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    case FILTER_REDUX:
      return {
        ...state,
        preFilter: state.preFilter === null ? state.loaded : state.preFilter,
        loaded:
          state.preFilter === null
            ? state.loaded.filter((museum) => museum.averageRating > payload)
            : state.preFilter.filter(
                (museum) => museum.averageRating > payload
              ),
        returnedNo:
          state.preFilter === null
            ? state.loaded.filter((museum) => museum.averageRating > payload)
                .length
            : state.preFilter.filter((museum) => museum.averageRating > payload)
                .length,
        museumsNo:
          state.preFilter === null
            ? state.loaded.filter((museum) => museum.averageRating > payload)
                .length
            : state.preFilter.filter((museum) => museum.averageRating > payload)
                .length,
        loading: false,
      };
    case FILTER_MONGO:
    case LOAD_2_SHOW:
    case LOAD_NEAR_2_SHOW:
      return {
        ...state,
        loading: false,
        showed: payload.single ? payload.data : null,
        loaded: payload.single ? [payload.data] : payload.data,
        museumsNo: payload.museumsNo * 1,
        returnedNo: payload.count * 1,
      };
    case SETUP_LOADED:
      return {
        ...state,
        showed: payload,
      };
    case LOAD_OWNED:
      return {
        ...state,
        showed: payload.data,
        owned: payload.data,
        loading: false,
      };
    case CREATE_MUSEUM:
    case UPDATE_MUSEUM:
      return {
        ...state,
        loaded: [...state.loaded, payload.data],
        owned: [payload.data],
        loading: false,
      };
    case DELETE_MUSEUM:
      return {
        ...state,
        loading: false,
        owned: [],
      };

    default:
      return state;
  }
}
