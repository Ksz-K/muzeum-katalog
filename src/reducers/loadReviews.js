import { LOAD_REVIEWS, CLEAN_REVIEWS, CREATE_REVIEW } from "../actions/types";

const initialState = {
  loading: true,
  loaded: [],
  reviewsNo: null,
  returnedNo: null,
  preFilter: null,
  userTotalReviews: 0,
  isReviewer: [],
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
        userTotalReviews: payload.countUserReview
          ? payload.countUserReview
          : state.userTotalReviews,
        isReviewer: payload.isReviewer ? payload.isReviewer : state.isReviewer,
      };

    case CLEAN_REVIEWS:
      return {
        ...state,
        loaded: [],
      };
    case CREATE_REVIEW:
      return {
        ...state,
      };

    default:
      return state;
  }
}
