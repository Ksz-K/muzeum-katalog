import {
  LOAD_REVIEWS,
  SELECT_REVIEW_4_EDIT,
  CLEAN_REVIEWS,
  CREATE_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
} from "../actions/types";

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
        userTotalReviews: state.userTotalReviews,
        loading: true,
        loaded: [],
        reviewsNo: null,
        returnedNo: null,
        preFilter: null,
        isReviewer: [],
      };
    case CREATE_REVIEW:
    case UPDATE_REVIEW:
      return {
        ...state,
      };
    case DELETE_REVIEW:
      return {
        ...state,
        loaded: state.loaded.filter((review) => review._id !== payload),
      };
    case SELECT_REVIEW_4_EDIT:
      return {
        ...state,
        loaded: state.loaded.filter((review) => review._id === payload),
        isReviewer: state.loaded.filter((review) => review._id === payload),
      };

    default:
      return state;
  }
}
