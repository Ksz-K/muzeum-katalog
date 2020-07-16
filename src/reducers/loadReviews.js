import { LOAD_REVIEWS, CLEAN_REVIEWS } from "../actions/types";

const initialState = {
  loading: true,
  loaded: [],
  reviewsNo: null,
  returnedNo: null,
  preFilter: null,
  showed: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_REVIEWS:
      return {
        ...state,
        loading: false,
        showed: null,
        loaded: [...state.loaded, ...payload.data],
        reviewsNo: payload.total * 1,
        returnedNo: payload.count * 1,
      };
    case CLEAN_REVIEWS:
      return {
        ...state,
        loaded: [],
      };

    default:
      return state;
  }
}
