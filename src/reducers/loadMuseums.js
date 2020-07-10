import {
  LOAD_2_SHOW,
  LOAD_NEAR_2_SHOW,
  LOADING_TRUE,
  LOADING_FALSE,
  FILTER_REDUX,
  FILTER_MONGO,
} from "../actions/types";

const initialState = {
  loading: true,
  loaded: [],
  museumsNo: null,
  returnedNo: null,
  preFilter: null,
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
        loaded: payload.data,
        museumsNo: payload.museumsNo * 1,
        returnedNo: payload.count * 1,
      };

    default:
      return state;
  }
}
