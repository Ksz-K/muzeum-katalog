import {
  COUNT_MUSEUMS,
  WHERE_IS,
  TAKE_CITIES,
  UPDATE_SELECTED,
} from "../actions/types";

const initialState = {
  counter: 0,
  visitorLocation: {},
  cities: [],
  citySelected: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COUNT_MUSEUMS:
      return {
        ...state,
        counter: payload,
      };

    case WHERE_IS:
      return {
        ...state,
        visitorLocation: payload.data,
      };
    case TAKE_CITIES:
      return {
        ...state,
        cities: payload,
      };
    case UPDATE_SELECTED:
      return {
        ...state,
        citySelected: payload.data,
      };

    default:
      return state;
  }
}
