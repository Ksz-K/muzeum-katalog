import { LOAD_2_SHOW, LOAD_NEAR_2_SHOW } from "../actions/types";

const initialState = {
  loading: true,
  loaded: {},
  pagination: {},
  returnedNo: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_2_SHOW:
    case LOAD_NEAR_2_SHOW:
      return {
        ...state,
        loading: false,
        loaded: payload.data,
        pagination: payload.pagination ? payload.pagination : {},
        returnedNo: payload.count * 1,
      };

    default:
      return state;
  }
}
